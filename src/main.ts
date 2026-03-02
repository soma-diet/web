import { mount } from 'svelte'
import './assets/css/common.css'
import './assets/css/home.css'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
