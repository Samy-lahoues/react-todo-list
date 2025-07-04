export interface toDosTypes {
    id: number;
    text: { en: string; ar: string };
    completed: boolean;
    priority: "high" | "medium" | "low";
    dueDate: string;
}
const defaultToDos: toDosTypes[] = [
    {
        id: 1,
        text: {
            en: "Complete project documentation",
            ar: "إكمال توثيق المشروع",
        },
        completed: false,
        priority: "high",
        dueDate: "2025-07-04",
    },
    {
        id: 2,
        text: { en: "Review code changes", ar: "مراجعة تغييرات الكود" },
        completed: true,
        priority: "medium",
        dueDate: "2025-07-04",
    },
    {
        id: 3,
        text: { en: "Plan team meeting", ar: "تخطيط اجتماع الفريق" },
        completed: false,
        priority: "low",
        dueDate: "2025-07-04",
    },
];
const translations = {
    language: { en: "English", ar: "العربية" },
    logo: { en: "ToDo List", ar: "قائمة المهام" },
    title: { en: "My Tasks", ar: "مهامي" },
    addTask: { en: "Add", ar: "إضافة" },
    taskInputPlaceholder: { en: "Task title", ar: "عنوان المهمة" },
    addTaskEn: { en: "Task in English", ar: "المهمة بالإنجليزية" },
    addTaskAr: { en: "Task in Arabic", ar: "المهمة بالعربية" },
    addButton: { en: "Add Task", ar: "إضافة مهمة" },
    all: { en: "All", ar: "الكل" },
    active: { en: "Active", ar: "نشط" },
    completed: { en: "Completed", ar: "مكتمل" },
    edit: { en: "Edit", ar: "تعديل" },
    delete: { en: "Delete", ar: "حذف" },
    save: { en: "Save", ar: "حفظ" },
    cancel: { en: "Cancel", ar: "إلغاء" },
    taskCompleted: { en: "Task completed!", ar: "تم إكمال المهمة!" },
    taskDeleted: { en: "Task deleted!", ar: "تم حذف المهمة!" },
    taskAdded: { en: "Task added successfully!", ar: "تم إضافة المهمة بنجاح!" },
    high: { en: "High", ar: "عالي" },
    medium: { en: "Medium", ar: "متوسط" },
    low: { en: "Low", ar: "منخفض" },
    dueDate: { en: "Due Date", ar: "تاريخ الاستحقاق" },
    priority: { en: "Priority", ar: "الأولوية" },
    deleteMessagTitle: {
        en: "Are you sure you want to delete the task?",
        ar: "هل أنت متأكد من رغبتك في حذف المهمة؟",
    },
    deleteMessagMessage: {
        en: "You can't undo the deletion if you choose to delete.",
        ar: "لا يمكنك التراجع عن الحذف في حال اختيار حذف",
    },
    close: { en: "Close", ar: "اغلاق" },
    yesDelete: { en: "Yes, delete", ar: "نعم,قم بالحذف" },
    editTask: { en: "Edit The Task", ar: "تعديل المهمة" },
    titleName: { en: "Title", ar: "" },
    details: { en: "Details", ar: "" },
    inputTitlePlaceholder: { en: "Task title", ar: "عنوان المهمة" },
    inputDetailsPlaceholder: { en: "Task Details", ar: "تفاصيل المهمة" },
};
export { defaultToDos, translations };
