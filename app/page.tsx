"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, ShoppingCart, User, Settings, HelpCircle, MessageSquareWarning } from "lucide-react"

export default function HomePage() {
  const menuItems = [
    { name: "号表", href: "/haobiao", icon: FileText, description: "查看所有账号列表" },
    { name: "购物车", href: "#", icon: ShoppingCart, description: "查看已选账号" },
    { name: "个人中心", href: "#", icon: User, description: "管理个人信息" },
    { name: "设置", href: "#", icon: Settings, description: "系统设置" },
    { name: "帮助", href: "#", icon: HelpCircle, description: "使用帮助" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              天
            </div>
            <h1 className="text-2xl font-bold text-gray-800">天下商行</h1>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
            登录
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">欢迎来到天下商行</h2>
          <p className="text-gray-600 text-lg">专业的游戏账号交易平台，安全可靠</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-blue-500 mb-2">75+</div>
            <div className="text-sm text-gray-500">可用账号</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
            <div className="text-sm text-gray-500">交易安全</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-orange-500 mb-2">24h</div>
            <div className="text-sm text-gray-500">在线客服</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-purple-500 mb-2">1000+</div>
            <div className="text-sm text-gray-500">成交订单</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          &copy; 2024 天下商行 - 专业游戏账号交易平台
        </div>
      </footer>
    </div>
  )
}
