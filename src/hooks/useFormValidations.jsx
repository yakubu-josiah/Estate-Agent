import { useEffect, useState } from "react";

export const useFormValidation = (formData, validationRules) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    for (const field in formData) {
      const validationRule = validationRules[field];
      if (validationRule) {
        const { rule, message } = validationRule;
        if (!rule(formData[field])) {
          newErrors[field] = message;
        } else {
          delete newErrors[field];
        }
      }
    }
    setErrors(newErrors);
  }, [formData, validationRules]);

  const isValid = !Object.keys(errors).length;

  return { errors, isValid };
};

export default useFormValidation;