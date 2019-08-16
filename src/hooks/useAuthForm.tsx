import React, { useState, FormEvent } from 'react';
import * as yup from 'yup';

interface IAuthFormReturn {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, fn: any) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  values: { [key: string]: string };
  errors: { [key: string]: { isValid: boolean; message: string } };
  isSubmitted: boolean;
  reset: (e: React.FormEvent<HTMLInputElement>) => void;
  setOptions: React.Dispatch<
    React.SetStateAction<{
      validationSchema: yup.ObjectSchema<any>;
      initialValues: {
        [key: string]: string;
      };
    }>
  >;
}

interface IAuthFormProps {
  validationSchema: yup.ObjectSchema<yup.Shape<object, any>>;
  initialValues: { [key: string]: string };
}

type AuthForm = ({
  validationSchema,
  initialValues
}: IAuthFormProps) => IAuthFormReturn;

const useAuthForm: AuthForm = ({
  validationSchema,
  initialValues
}): IAuthFormReturn => {
  const [options, setOptions] = useState({ validationSchema, initialValues });
  const [values, setValues] = useState<any>(options.initialValues);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = (options: any = null) => {
    if (options) {
      setOptions(options);
      setValues(options.initialValues);
    }
    setErrors({});
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>, fn: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    options.validationSchema
      .validate(values, { abortEarly: false })
      .then(val => {
        fn(val);
      })
      .catch((errs: yup.ValidationError) => {
        let submittedValues: any = {};
        for (let key in errs.value) {
          submittedValues[key] = { isValid: true, message: '' };
        }
        if (errs.inner.length) {
          errs.inner.forEach((err: any) => {
            submittedValues[err.path] = {
              isValid: false,
              message: err.message
            };
          });
          setErrors(submittedValues);
        }
      });
  };

  const onChange = (e: any) => {
    let target = e.target;
    setValues({ ...values, [target.name]: target.value });
    yup
      .reach(options.validationSchema, target.name)
      .validate(target.value)
      .then(() => {
        let updatedErrs: any = {};
        if (target.name === 'password') {
          if (target.value === values.passwordConfirm) {
            updatedErrs.password = { isValid: true, message: '' };
            updatedErrs.passwordConfirm = { isValid: true, message: '' };
          } else {
            updatedErrs.password = {
              isValid: true,
              message: ''
            };
            updatedErrs.passwordConfirm = {
              isValid: false,
              message: 'Passwords must match'
            };
          }
        } else {
          if (errors[target.name]) {
            updatedErrs[target.name] = { isValid: true, message: '' };
          }
        }
        setErrors({
          ...errors,
          ...updatedErrs
        });
      })
      .catch((err: any) => {
        if (
          isSubmitted ||
          (target.name === 'passwordConfirm' || target.name === 'password')
        ) {
          if (target.name === 'passwordConfirm' || target.name === 'password') {
            let oppName =
              target.name === 'password' ? 'passwordConfirm' : 'password';
            if (
              target.value === values[oppName] &&
              target.value !== '' &&
              values[oppName] !== ''
            ) {
              setErrors({
                ...errors,
                [target.name]: { isValid: true, message: '' },
                [oppName]: { isValid: true, message: '' }
              });
            } else {
              // Password
              if (target.name === 'password') {
                if (target.value === '') {
                  setErrors({
                    ...errors,
                    [target.name]: { isValid: false, message: err.message },
                    [oppName]: {
                      isValid: false,
                      message: 'Passwords must match'
                    }
                  });
                } else {
                  setErrors({
                    ...errors,
                    [target.name]: { isValid: true, message: '' },
                    [oppName]: {
                      isValid: false,
                      message: 'Passwords must match'
                    }
                  });
                }
              } else {
                // Password Confirm
                let errorMessage = err.message;
                if (target.value === '') {
                  errorMessage = 'Password confirm is required';
                }
                setErrors({
                  ...errors,
                  [target.name]: { isValid: false, message: errorMessage }
                });
              }
            }
          } else {
            setErrors({
              ...errors,
              [target.name]: { isValid: false, message: err.message }
            });
          }
        }
      });
  };
  return { onSubmit, onChange, values, errors, isSubmitted, reset, setOptions };
};

export default useAuthForm;
