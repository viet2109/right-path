import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerNewUser } from "~/redux/request";
import InputField from "~/components/InputField";
import styles from "./SignUp.module.scss";
import AuthForm from "~/components/AuthForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import config from "~/config";

SignUp.propTypes = {};

const cx = classNames.bind(styles);
const SignupSchema = yup.object().shape({
  name: yup.string().required("Bạn cần phải nhập tên"),

  tel: yup
    .string()
    .required("Bạn cần nhập số điện thoại")
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Số điện thoại không đúng"
    ),
  email: yup
    .string()
    .required("Bạn cần nhập địa chỉ email")
    .email("Địa chỉ email không hợp lệ"),

  password: yup
    .string()
    .required("Bạn cần nhập mật khẩu")
    .min(6, "Mật khẩu cần ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .required("Bạn cần xác nhận lại mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu nhập lại không đúng"),
});
function SignUp(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error)
  const isFetching = useSelector(state => state.auth.isFetching)
  console.log(isFetching)
  return (
    <>
    <Loading text="Đang đăng kí..." isLoading={isFetching}/>
      <AuthForm>
        <Formik
          initialValues={{
            name: "",
            tel: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const userInfo = {
              name: values.name,
              email: values.email,
              password: values.password,
              phoneNumber: values.tel,
            };
            registerNewUser(userInfo, dispatch, navigate);
          }}
        >
          {({ errors, touched }) => (
            <Form className={cx("form")}>
              <h1 className={cx("title")}>Đăng kí</h1>
              <FastField
                error={errors.name && touched.name}
                name="name"
                label="Họ và tên"
                component={InputField}
              >
                {errors.name && touched.name ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.name}
                  </div>
                ) : null}
              </FastField>

              <FastField
                error={errors.email && touched.email}
                name="email"
                label="Email"
                component={InputField}
              >
                {errors.email && touched.email ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </div>
                ) : null}
              </FastField>

              <FastField
                error={errors.tel && touched.tel}
                name="tel"
                label="Số điện thoại"
                component={InputField}
              >
                {errors.tel && touched.tel ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.tel}
                  </div>
                ) : null}
              </FastField>

              
                <FastField
                  error={errors.password && touched.password}
                  name="password"
                  label="Mật khẩu"
                  component={InputField}
                  type="password"
                >
                  {errors.password && touched.password ? (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.password}
                    </div>
                  ) : null}
                </FastField>
           

              <FastField
                error={errors.confirmPassword && touched.confirmPassword}
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
                component={InputField}
              >
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </FastField>

              {error ? (
                <p className={cx("error-email")}>Địa chỉ email đã tồn tại</p>
              ) : (
                <Fragment></Fragment>
              )}

              <Button type={"submit"} className={cx("sigup-btn")} primary>
                Đăng kí
              </Button>

              <div className={cx("login-back-wrapper")}>
                Đã có tài khoản?{" "}
                <Link className={cx("login-back")} to={config.routes.signin}>
                  Đăng nhập ngay
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </AuthForm>
    </>
  );
}

export default SignUp;
