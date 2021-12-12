import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Spin,
} from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UsersContext from '../contexts/UsersContext';
import { updateUsersList } from '../utils/helpers/contextHelpers';
import { getAllHobbies, getUser, updateUser } from '../utils/fetches';
import { isOk } from '../utils/helpers/httpHelpers';
import {
  hobbiesNamesToObjects,
  userToDisplay,
} from '../utils/helpers/userHelpers';

const UserForm = ({ user, setUser }: any) => {
  const [showLoader, setShowLoader] = useState(true);
  const [changed, setChanged] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [form] = Form.useForm();
  const [hobbies, setHobbies] = useState([] as Array<HobbyInterface>);
  const usersContext = useContext(UsersContext);

  const { Option } = Select;
  const { id } = useParams();

  const dateFormat = 'YYYY-MM-DD';
  const requiredFields = ['name', 'lastName', 'email', 'age', 'hobbies'];

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    defaultFields();
  }, []);

  const defaultFields = async () => {
    const hobbies = await getAllHobbies();
    const parsedHobbies = await hobbies.json();
    setHobbies(parsedHobbies);

    if (id !== undefined) {
      const myUser = await getUser(id);
      const parsedMyUser = await myUser.json();
      const parsedUser = userToDisplay(parsedMyUser);
      setUser(parsedUser);
      form.setFieldsValue({
        name: parsedUser.name,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
        age: parsedUser.age,
        gender: parsedUser.gender,
        phoneNumber: parsedUser.phoneNumber,
        address: parsedUser.address,
        dateOfBirth: moment(parsedUser.dateOfBirth, dateFormat),
        hobbies: parsedUser.hobbies,
      });
      setShowLoader(false);
    } else {
      message.error('Ups! Something went wrong');
    }
  };

  const onReset = () => {
    defaultFields();
    setChanged(false);
    setEmpty(false);
  };

  const onFieldChange = (e: any) => {
    if (e[0].value !== user[e[0].name]) {
      setChanged(true);
      if (
        (e[0].value === undefined ||
          e[0].value === null ||
          e[0].value.length === 0) &&
        requiredFields.indexOf(e[0].name.toString()) > -1
      ) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    } else {
      setChanged(false);
      setEmpty(false);
    }
  };

  const onFinish = (values: any) => {
    const userHobbies = hobbiesNamesToObjects(values.hobbies, hobbies);
    const userHobbiesIds = userHobbies.map((hobby: HobbyInterface) => hobby.id);
    values['id'] = [id];
    values.dateOfBirth = values.dateOfBirth.format(moment.HTML5_FMT.DATE);
    values.hobbies = userHobbiesIds;

    (async () => {
      const data = await updateUser(values);
      let user = values;
      user.hobbies = userHobbies;
      if (isOk(data.status)) {
        updateUsersList(usersContext.listOfUsers, user);
        defaultFields();
        setChanged(false);
        setEmpty(false);
        message.success('Successfuly updated user');
      } else {
        message.error('Ups! Something went wrong');
      }
    })();
  };

  return (
    <>
      {showLoader ? (
        <Spin className='align-self-center' />
      ) : (
        <Form
          className='align-self-center'
          form={form}
          {...layout}
          name='user-details-form'
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFieldsChange={onFieldChange}
        >
          <Form.Item label='Name' name='name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='lastName'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Age'
            name='age'
            rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name='gender' label='Gender'>
            <Radio.Group>
              <Radio value='male'>male</Radio>
              <Radio value='female'>female</Radio>
              <Radio value='other'>other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Phone number' name='phoneNumber'>
            <Input />
          </Form.Item>
          <Form.Item label='Adddress' name='address'>
            <Input />
          </Form.Item>
          <Form.Item label='Date of birth' name='dateOfBirth'>
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label='Hobbies'
            name='hobbies'
            rules={[{ required: true, type: 'array' }]}
          >
            <Select mode='multiple' placeholder='select your hobby'>
              {hobbies.map((hobby: HobbyInterface, key: any) => {
                return (
                  <Option key={key} value={hobby.name}>
                    {hobby.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className='btn-mrg-r btn-brown-dark-link'
              type='link'
              htmlType='button'
              onClick={onReset}
              disabled={!changed}
            >
              Reset
            </Button>
            <Button
              className='btn-brown'
              type='primary'
              htmlType='submit'
              disabled={!changed || empty}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default UserForm;
