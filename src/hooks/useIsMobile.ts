import { useMediaQuery } from "react-responsive"; // Assuming you have a utility to check media queries
const useIsMobile = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile;
};
export default useIsMobile;
// Note: This hook can be used in any component to determine if the device is mobile.
