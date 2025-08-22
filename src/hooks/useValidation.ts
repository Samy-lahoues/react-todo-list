import { useState, useCallback, useMemo } from "react";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface TodoValidationRules {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  trimWhitespace?: boolean;
}

const useValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  // Memoize default rules to prevent unnecessary re-renders
  const defaultRules = useMemo(
    (): TodoValidationRules => ({
      minLength: 3,
      maxLength: 100,
      required: true,
      trimWhitespace: true,
    }),
    [],
  );

  // Clear all validation errors
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== field));
  }, []);

  // Add validation error
  const addError = useCallback((field: string, message: string) => {
    setErrors((prev) => {
      const filtered = prev.filter((error) => error.field !== field);
      return [...filtered, { field, message }];
    });
  }, []);

  // Validate bilingual todo title
  const validateTodoTitle = useCallback(
    (
      title: { en: string; ar: string },
      rules: TodoValidationRules = {},
    ): ValidationResult => {
      setIsValidating(true);
      clearErrors();

      const mergedRules = { ...defaultRules, ...rules };

      if (!title || typeof title !== "object") {
        const error = { field: "title", message: "Invalid title structure" };
        setErrors([error]);
        setIsValidating(false);
        return { isValid: false, errors: [error] };
      }

      const enText = mergedRules.trimWhitespace ? title.en?.trim() : title.en;
      const arText = mergedRules.trimWhitespace ? title.ar?.trim() : title.ar;

      const enValid = enText && enText.length >= (mergedRules.minLength || 3);
      const arValid = arText && arText.length >= (mergedRules.minLength || 3);

      let isValid = true;
      const validationErrors: ValidationError[] = [];

      // At least one language should have valid content
      if (!enValid && !arValid) {
        const error = {
          field: "title",
          message:
            "At least one language (English or Arabic) must have valid content (minimum 3 characters)",
        };
        validationErrors.push(error);
        isValid = false;
      }

      setErrors(validationErrors);
      setIsValidating(false);
      return { isValid, errors: validationErrors };
    },
    [clearErrors, defaultRules],
  );

  // Get error for specific field
  const getFieldError = useCallback(
    (field: string): string | null => {
      const error = errors.find((err) => err.field === field);
      return error ? error.message : null;
    },
    [errors],
  );

  // Check if specific field has error
  const hasFieldError = useCallback(
    (field: string): boolean => {
      return errors.some((err) => err.field === field);
    },
    [errors],
  );

  return {
    // State
    errors,
    isValidating,
    hasErrors: errors.length > 0,

    // Validation methods
    validateTodoTitle,

    // Error management
    clearErrors,
    clearFieldError,
    addError,
    getFieldError,
    hasFieldError,

    // Utilities
    defaultRules,
  };
};

export default useValidation;
