import { Menu } from 'antd'
import { Breadcrumb, Layout, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderCompoent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAmin';
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
const { Header, Content, Footer } = Layout;

const AdminPage = () => {
  const user = useSelector((state) => state?.user)

  const items = [
    getItem('User', 'users', <UserOutlined />),
    getItem('Product', 'products', <AppstoreOutlined />),
    getItem('Order', 'orders', <ShoppingCartOutlined />),
    
  ];

  const [keySelected, setKeySelected] = useState('');
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return {data: res?.data, key: 'orders'}
  }

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res1', res)
    return {data: res?.data, key: 'products'}
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return {data: res?.data, key: 'users'}
  }

  const queries = useQueries({
    queries: [
      {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
      {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
      {queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60},
    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
    return result
    } catch (error) {
      return result
    }
  },[queries])
  const COLORS = {
   users: ['#e66465', '#9198e5'],
   products: ['#a8c0ff', '#3f2b96'],
   orders: ['#11998e', '#38ef7d'],
  };

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
      case 'orders':
        return (
          <OrderAdmin />
        )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  console.log('memoCount', memoCount)
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      {/* <div style={{ display: 'flex',overflowX: 'hidden' }}> */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          onClick={handleOnCLick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        </Header>
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
            {!keySelected && (
              <div>
              <img src="https://www.deco-crystal.com/wp-content/uploads/2023/06/image27.jpg" alt="" style={{height:'1000px'}} />
              </div>
            )}
          {renderPage(keySelected)}
        </div>
      {/* </div> */}
    </>
  )
}

export default AdminPage