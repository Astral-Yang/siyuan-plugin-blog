/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {Menu, showMessage} from "siyuan"
import {StrUtil} from "zhi-common"
import PageUtil from "./utils/pageUtil.ts"
import {createBootStrap} from "./bootstrap.ts"
import Share from "./pages/Share.vue"
import Setting from "./pages/Setting/Index.vue"
import SiyuanBlogPlugin from "./index"

/**
 * 顶部按钮
 */
export class Topbar {
  private readonly pluginInstance: SiyuanBlogPlugin
  private rect: DOMRect
  private topBarElement: HTMLElement
  private contentMenu: Menu
  private contentMenuElement: HTMLElement

  constructor(pluginInstance: SiyuanBlogPlugin) {
    this.pluginInstance = pluginInstance
  }

  public initTopbar() {
    this.topBarElement = this.pluginInstance.addTopBar({
      icon: "iconShare",
      title: this.pluginInstance.i18n.siyuanBlog,
      position: "right",
      callback: () => {
      },
    })

    this.topBarElement.addEventListener("click", async () => {
      // 挂载内容到菜单
      const pageId = PageUtil.getPageId()
      if (StrUtil.isEmptyString(pageId)) {
        showMessage("必须先打开一篇文档才能分享")
        return
      }
      this.addMenu(Share, {
        pluginInstance: this.pluginInstance,
        id: pageId,
        origin: window.location.origin,
      }, "share-free-edition-content-menu")
    })

    // 添加右键菜单
    this.topBarElement.addEventListener("contextmenu", async () => {
      // 挂载内容到菜单
      this.addMenu(Setting, {
        pluginInstance: this.pluginInstance
      }, "share-free-edition-context-menu")
    })
  }

  private addMenu(content: any, props: any, menuID: string) {
    // 移除旧菜单
    const elements = document.querySelectorAll(".share-pro-menu-content")
    elements.forEach(element => {
      element.remove()
    })

    this.contentMenu = new Menu(menuID)
    this.contentMenuElement?.remove()
    const contentWrapper = Object.assign(document.createElement("div"), {
      id: `${menuID}-wrapper`,
      className: "share-free-edition-menu-content"
    })
    this.contentMenuElement = this.contentMenu.addItem({element: contentWrapper})

    // 取消小手图标
    document.getElementById(`${menuID}-wrapper`).parentElement.style.cursor = 'auto';
    // 取消默认边距，边框
    document.getElementById(`${menuID}-wrapper`).parentElement.style.padding = '0';
    document.getElementById(`${menuID}-wrapper`).parentElement.style.border = '0';
    document.getElementById(`${menuID}-wrapper`).parentElement.parentElement.style.padding = '0';
    document.getElementById(`${menuID}-wrapper`).parentElement.parentElement.style.border = '0';
    document.getElementById(`${menuID}-wrapper`).parentElement.style.backgroundColor = 'transparent';
    document.getElementById(`${menuID}-wrapper`).parentElement.style.color='var(--b3-theme-on-background)'
    if (!this.rect) {
      this.rect = this.topBarElement.getBoundingClientRect()
    }
    createBootStrap(content, props, this.contentMenuElement)
    // 显示菜单
    const rect = this.rect
    this.contentMenu.open({
      x: rect.left,
      y: rect.bottom,
      isLeft: true,
    })
  }
}