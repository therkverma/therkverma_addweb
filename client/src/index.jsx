import React from 'react'
import { render } from 'react-dom'
import { unregister } from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'
import Root from './components/root'
import './index.scss'

const store = configureStore()
const rootEl = document.getElementById('root')
render((
   <BrowserRouter>
      <Root store={store} />
   </BrowserRouter>
), rootEl)

unregister()
