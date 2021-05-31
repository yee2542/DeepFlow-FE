import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { OAuthEnum } from 'Models/oauth/enum';
import FormCenterLayout from 'Modules/user/components/Layouts/FormCenter';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { P } from 'Styles/global';
import { BreakLineWithCaption } from 'Components/BreakLineWithCaption/index';
import { layout } from 'Modules/user/models/constants';
import { Props } from './interfaces';
import { FormErrorValue, FormFinishValue, FormLogin } from './types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  useLoginMutation,
  UserLoginInputDto,
} from '../../../../common/generated/generated-types';
import { Loading } from 'Components/Loader/styled';
import { userActions } from 'Modules/user/reducers/userReducer';

const HeaderLogo: React.FC = () => (
  <Row justify="center" align="middle">
    <Col span={8}>
      <Image src={'assets/images/03-logo.svg'} width={200} height={120} />
    </Col>
  </Row>
);

const LoginButton: React.FC = () => (
  <Form.Item>
    <Button id="login-btn" type="primary" htmlType="submit" block>
      Log in
    </Button>
  </Form.Item>
);

const LoginWithFacebookButton: React.FC<{ onSubmit: Props['onSubmitOAuth'] }> = (
  props,
) => (
  <Form.Item>
    <Button
      onClick={() => props.onSubmit && props.onSubmit(OAuthEnum.Facebook)}
      id="fb-btn"
      style={{ backgroundColor: '#3b5998', color: '#ffffff' }}
      block>
      Login with Facebook
    </Button>
  </Form.Item>
);

const LoginPage: React.FC<Props> = (props) => {
  const [form] = useForm<FormLogin>();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginMutation, { data, loading, error }] = useLoginMutation({
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (!error && data) {
      const duplicated = localStorage.getItem('user');
      if (duplicated) localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data.Login));
      dispatch(
        userActions.setUser({
          name: data.Login.name,
          id: data.Login._id,
          mainEmail: data.Login.mainEmail,
          package: data.Login.package,
          zone: data.Login.zone,
          role: data.Login.role,
        }),
      );
      router.push('/dashboard');
    }
  }, [data, error, router, dispatch]);

  const onFinish: FormFinishValue = (values: UserLoginInputDto) => {
    props.onSubmit && props.onSubmit(values);
    loginMutation({
      variables: {
        UserLoginInputDTO: {
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  const onError: FormErrorValue = (formValue) => {
    props.onError &&
      props.onError({
        errorFields: formValue.errorFields,
        values: (formValue as unknown) as FormLogin,
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <FormCenterLayout>
      <HeaderLogo />
      <Row justify="center">
        <Col span={16} xl={14}>
          <Form
            {...layout}
            id="login-form"
            form={form}
            name="login"
            onFinish={onFinish}
            onFinishFailed={onError}
            size="large"
            layout="vertical">
            <Form.Item
              name={'email'}
              rules={[
                { type: 'email', required: true, message: 'Please input your Email' },
              ]}>
              <Input id="email" prefix={<MailOutlined />} placeholder="email" />
            </Form.Item>
            <Form.Item
              name={'password'}
              rules={[{ required: true, message: 'Please input your Password' }]}>
              <Input
                id="password"
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <LoginButton />
            <BreakLineWithCaption>or</BreakLineWithCaption>
            <LoginWithFacebookButton onSubmit={props.onSubmitOAuth} />
            <Form.Item>
              <P>
                Haven&apos;t an account?
                <Link href="/register">
                  <a> Register</a>
                </Link>
              </P>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </FormCenterLayout>
  );
};

export default LoginPage;
