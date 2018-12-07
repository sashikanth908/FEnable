// TODO: import each component separetly from antd to avoid including entire antd into packs
// other wise use babel-plugin-import for this and remove style import in App.jsx. Check antd documentation
import React from 'react';
import {
  Alert,
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Search,
  Select,
  Table,
  Tooltip
} from 'antd';

const {
  Content,
  Header,
  Sider,
  Footer
} = Layout;

const defaultFormItemStyle = {
  marginBottom: 15,
  label: {
    fontWeight: 500,
  },
};

function FormItem(props) {
  return (
    <div style={props.style || defaultFormItemStyle}>
      <span style={defaultFormItemStyle.label}>
        { props.label }:
      </span>
      <br />
      {props.children}
    </div>
  );
}

export {
  Alert,
  Avatar,
  Button,
  Col,
  Content,
  DatePicker,
  Divider,
  Dropdown,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Row,
  Sider,
  Search,
  Select,
  Spin,
  Table,
  Tooltip
};
