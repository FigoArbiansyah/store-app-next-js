import React from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const { useState } = React;

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const handleSubmit = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const data = {
        email: e.target.email.value,
        fullname: e.target.fullname.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
      };
      const result = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (result.status === 200) {
        e.target.reset();
        push("/auth/login");
      } else if (result.status === 400) {
        setError("Email is already registered");
      }
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.register__form__item__input}
            />
          </div>
          <button
            className={styles.register__form__button}
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? <Link href="/auth/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
