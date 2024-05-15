'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('图片', '1', <UserOutlined />, [
    getItem('上传图片', '/image/upload'),
    getItem('图片处理', '/image/handle'),
  ]),
];

function Tempalte({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClcik = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        style={{ background: colorBgContainer }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical"></div>

        <Menu
          onClick={handleMenuItemClcik}
          theme="light"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ position: 'relative' }}>
          <div
            style={{
              margin: 16,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Tempalte;
