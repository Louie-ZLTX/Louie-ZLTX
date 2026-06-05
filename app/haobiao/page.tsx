"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Home, X } from "lucide-react"
import Link from "next/link"

// 随机生成账号数据的辅助函数
const generateRandomAccount = (id: number) => {
  const loginTypes = ["Q", "V", "账密"]
  const ranks = ["黑鹰V", "黑鹰", "铂金", "黄金", "钻石", "钻石2", "白银", "青铜"]
  const onlineTimes = ["全天", "早9晚10", "早8晚12", "早10到晚上12", "下午到晚上12点前", "早8:00到晚12:00", "早11点到晚上10点", "早9晚23", "早八到晚12扫码"]
  const skins = ["", "暗星", "露娜", "红狼", "处刑者", "骇爪", "北极星", "露娜,骇爪,北极星", "暗影猎手"]
  const equipments = ["无", "红包一个", "红包1个", "咖啡豆10", "4个红甲修", "8个金头修金甲修 20个高级咖啡豆", "红甲修19个", "录像截图", "一个子弹零件", "4红甲修，1咖啡豆，4金甲修"]
  const insurances = [4, 4, 4, 4, 6, 6, 9, 9]
  
  const insurance = insurances[Math.floor(Math.random() * insurances.length)]
  const hasTag = Math.random() > 0.7
  
  return {
    id,
    code: `4b${60000 + Math.floor(Math.random() * 10000)}`,
    tag: hasTag ? "通宵号" : "",
    loginType: loginTypes[Math.floor(Math.random() * loginTypes.length)],
    onlineTime: onlineTimes[Math.floor(Math.random() * onlineTimes.length)],
    rank: ranks[Math.floor(Math.random() * ranks.length)],
    kd: Math.round(Math.random() * 50) / 10,
    coins: Math.floor(Math.random() * 500) + 50,
    triangle: Math.floor(Math.random() * 700),
    limitTriangle: Math.floor(Math.random() * 1200),
    canSplit: "不能",
    splitCount: Math.floor(Math.random() * 5),
    insurance,
    exp9: Math.floor(Math.random() * 20) + 60,
    stamina: 38,
    ratio: "",
    rentPrice: Math.round((Math.random() * 1000 + 200) * 10) / 10,
    aw: Math.floor(Math.random() * 150),
    liujia: Math.floor(Math.random() * 12),
    liutou: Math.floor(Math.random() * 12),
    hongdan: Math.floor(Math.random() * 150),
    equipment: equipments[Math.floor(Math.random() * equipments.length)],
    skin: skins[Math.floor(Math.random() * skins.length)],
    banRecord: Math.random() > 0.85 ? "1天" : "无",
  }
}

// 根据截图修正的数据，列顺序为：
// 唯一编码、标签、登录方式、在线时间、段位、绝密kd、纯币/M、三角券、限时三角券、能否分批、分几批、保险、9格体验券、体力负重、比例、纯币+物资租金、aw、六甲、六头、红弹、其他物资、皮肤、封号记录、操作
const accountsData = [
  // 第1行: 4b67358, Q, 全天, 黑鹰V, 1.2, 107, 409, 200, 不能, 4格, 3, 65, 38, 347.6, 50, 6, 4, 0, 无, 无, 无
  { id: 1, code: "4b67358", tag: "", loginType: "Q", onlineTime: "全天", rank: "黑鹰V", kd: 1.2, coins: 107, triangle: 409, limitTriangle: 200, canSplit: "不能", splitCount: 4, insurance: 3, exp9: 65, stamina: 38, ratio: "", rentPrice: 347.6, aw: 50, liujia: 6, liutou: 4, hongdan: 0, equipment: "无", skin: "", banRecord: "无" },
  // 第2行: 4b67345, Q, 早10到晚上12, 铂金, 0.2, 430, 220, 340, 不能, 4格, 6, 66, 37, 1242.2, 50, 4, 2, 120, 无, 暗星, 无
  { id: 2, code: "4b67345", tag: "", loginType: "Q", onlineTime: "早10到晚上12", rank: "铂金", kd: 0.2, coins: 430, triangle: 220, limitTriangle: 340, canSplit: "不能", splitCount: 4, insurance: 6, exp9: 66, stamina: 37, ratio: "", rentPrice: 1242.2, aw: 50, liujia: 4, liutou: 2, hongdan: 120, equipment: "无", skin: "暗星", banRecord: "无" },
  // 第3行: 4b67327, Q, 早八到晚12扫码, 铂金, 4.7, 103, 273, 0, 不能, 4格, 0, 66, 37, 299.8, 0, 3, 2, 42, 8个金头修金甲修 20个高级咖啡豆, 露娜,骇爪,北极星, 无
  { id: 3, code: "4b67327", tag: "", loginType: "Q", onlineTime: "早八到晚12扫码", rank: "铂金", kd: 4.7, coins: 103, triangle: 273, limitTriangle: 0, canSplit: "不能", splitCount: 4, insurance: 0, exp9: 66, stamina: 37, ratio: "", rentPrice: 299.8, aw: 0, liujia: 3, liutou: 2, hongdan: 42, equipment: "8个金头修金甲修 20个高级咖啡豆", skin: "露娜,骇爪,北极星", banRecord: "无" },
  // 第4行: 4b67289, 通宵号, V, 全天, 黄金, 0.7, 101, 160, 0, 不能, 4格, , 64, 38, 325.8, 40, 4, 2, 60, 咖啡豆10, 红狼, 无
  { id: 4, code: "4b67289", tag: "通宵号", loginType: "V", onlineTime: "全天", rank: "黄金", kd: 0.7, coins: 101, triangle: 160, limitTriangle: 0, canSplit: "不能", splitCount: 4, insurance: 0, exp9: 64, stamina: 38, ratio: "", rentPrice: 325.8, aw: 40, liujia: 4, liutou: 2, hongdan: 60, equipment: "咖啡豆10", skin: "红狼", banRecord: "无" },
  // 第5行: 4b67280, Q, 下午到晚上12点前, 钻石, 1.3, 151, 92, 300, 不能, 4格, 4, 66, 38, 532.4, 123, 8, 6, 3, 红包一个, , 1天
  { id: 5, code: "4b67280", tag: "", loginType: "Q", onlineTime: "下午到晚上12点前", rank: "钻石", kd: 1.3, coins: 151, triangle: 92, limitTriangle: 300, canSplit: "不能", splitCount: 4, insurance: 4, exp9: 66, stamina: 38, ratio: "", rentPrice: 532.4, aw: 123, liujia: 8, liutou: 6, hongdan: 3, equipment: "红包一个", skin: "", banRecord: "1天" },
  // 第6行: 4b67250, 通宵号, Q, 全天, 黄金, 0, 94.8, 623, 100, 不能, 4格, 0, 77, 38, 288.9, 0, 4, 2, 117, 录像截图, 处刑者, 无
  { id: 6, code: "4b67250", tag: "通宵号", loginType: "Q", onlineTime: "全天", rank: "黄金", kd: 0, coins: 94.8, triangle: 623, limitTriangle: 100, canSplit: "不能", splitCount: 4, insurance: 0, exp9: 77, stamina: 38, ratio: "", rentPrice: 288.9, aw: 0, liujia: 4, liutou: 2, hongdan: 117, equipment: "录像截图", skin: "处刑者", banRecord: "无" },
  // 第7行: 4b67244, 通宵号, 账密, 早9晚10, 钻石, 0.1, 253, 0, 400, 不能, 4格, 1, 66, 38, 724.8, 30, 5, 4, 60, 0, 露娜, 无
  { id: 7, code: "4b67244", tag: "通宵号", loginType: "账密", onlineTime: "早9晚10", rank: "钻石", kd: 0.1, coins: 253, triangle: 0, limitTriangle: 400, canSplit: "不能", splitCount: 4, insurance: 1, exp9: 66, stamina: 38, ratio: "", rentPrice: 724.8, aw: 30, liujia: 5, liutou: 4, hongdan: 60, equipment: "0", skin: "露娜", banRecord: "无" },
  // 第8行: 4b67246, V, 早9晚12, 钻石, 1, 212, 477, 0, 不能, 4格, 1, 77, 38, 636.3, 31, 8, 10, 48, 一个子弹零件, , 无
  { id: 8, code: "4b67246", tag: "", loginType: "V", onlineTime: "早9晚12", rank: "钻石", kd: 1, coins: 212, triangle: 477, limitTriangle: 0, canSplit: "不能", splitCount: 4, insurance: 1, exp9: 77, stamina: 38, ratio: "", rentPrice: 636.3, aw: 31, liujia: 8, liutou: 10, hongdan: 48, equipment: "一个子弹零件", skin: "", banRecord: "无" },
  // 第9行: 4b67230, V, 早9晚10, 黄金, 0, 483, 140, 800, 不能, 4格, 0, 66, 38, 1274.1, 0, 1, 0, 0, 红包1个, , 无
  { id: 9, code: "4b67230", tag: "", loginType: "V", onlineTime: "早9晚10", rank: "黄金", kd: 0, coins: 483, triangle: 140, limitTriangle: 800, canSplit: "不能", splitCount: 4, insurance: 0, exp9: 66, stamina: 38, ratio: "", rentPrice: 1274.1, aw: 0, liujia: 1, liutou: 0, hongdan: 0, equipment: "红包1个", skin: "", banRecord: "无" },
  // 第10行: 4b67227, Q, 早八晚12, 黑鹰, 0.6, 196, 8, 100, 不能, 4格, 0, 77, 38, 611.4, 30, 9, 10, 123, 4个红甲修, , 1天
  { id: 10, code: "4b67227", tag: "", loginType: "Q", onlineTime: "早八晚12", rank: "黑鹰", kd: 0.6, coins: 196, triangle: 8, limitTriangle: 100, canSplit: "不能", splitCount: 4, insurance: 0, exp9: 77, stamina: 38, ratio: "", rentPrice: 611.4, aw: 30, liujia: 9, liutou: 10, hongdan: 123, equipment: "4个红甲修", skin: "", banRecord: "1天" },
  // 第11行: 4b67183, 账密, 早8:00到晚12:00, 钻石2, 2.4, 101, 140, 0, 不能, 4格, 0, 66, 38, 283.4, 2, 4, 2, 0, 无, , 无
  { id: 11, code: "4b67183", tag: "", loginType: "账密", onlineTime: "早8:00到晚12:00", rank: "钻石2", kd: 2.4, coins: 101, triangle: 140, limitTriangle: 0, canSplit: "不能", splitCount: 4, insurance: 0, exp9: 66, stamina: 38, ratio: "", rentPrice: 283.4, aw: 2, liujia: 4, liutou: 2, hongdan: 0, equipment: "无", skin: "", banRecord: "无" },
  // 第12行: 4b67184, Q, 早11点到晚上10点, 白银, 0.4, 118, 121, 1100, 不能, 4格, 4, 7体6负, 38, 315.5, 0, 1, 1, 0, 4红甲修，1咖啡豆，4金甲修, , 无
  { id: 12, code: "4b67184", tag: "", loginType: "Q", onlineTime: "早11点到晚上10点", rank: "白银", kd: 0.4, coins: 118, triangle: 121, limitTriangle: 1100, canSplit: "不能", splitCount: 4, insurance: 4, exp9: "7体6负", stamina: 38, ratio: "", rentPrice: 315.5, aw: 0, liujia: 1, liutou: 1, hongdan: 0, equipment: "4红甲修，1咖啡豆，4金甲修", skin: "", banRecord: "无" },
  // 第13行: 4b67167, V, 早9晚23, 青铜, 2.4, 100, 560, 0, 不能, 4格, 3, 76, 38, 327.0, 31, 11, 3, 0, 红甲修19个, 处刑者, 无
  { id: 13, code: "4b67167", tag: "", loginType: "V", onlineTime: "早9晚23", rank: "青铜", kd: 2.4, coins: 100, triangle: 560, limitTriangle: 0, canSplit: "不能", splitCount: 4, insurance: 3, exp9: 76, stamina: 38, ratio: "", rentPrice: 327.0, aw: 31, liujia: 11, liutou: 3, hongdan: 0, equipment: "红甲修19个", skin: "处刑者", banRecord: "无" },
  // 生成更多随机数据
  ...Array.from({ length: 62 }, (_, i) => generateRandomAccount(14 + i)),
]

const getRankStyle = (rank: string) => {
  switch (rank) {
    case "黑鹰V":
    case "黑鹰":
      return "bg-gray-800 text-white"
    case "铂金":
      return "bg-blue-400 text-white"
    case "黄金":
      return "bg-yellow-400 text-gray-800"
    case "钻石":
    case "钻石2":
      return "bg-purple-400 text-white"
    case "白银":
      return "bg-gray-300 text-gray-700"
    case "青铜":
      return "bg-amber-600 text-white"
    default:
      return "bg-gray-200 text-gray-700"
  }
}

// 弹窗组件
function DetailPopup({
  title,
  content,
  onClose,
}: {
  title: string
  content: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{content || "无"}</p>
        </div>
      </div>
    </div>
  )
}

// 可点击展开的单元格
function ClickableCell({
  content,
  title,
  maxWidth = "100px",
}: {
  content: string
  title: string
  maxWidth?: string
}) {
  const [showPopup, setShowPopup] = useState(false)
  const displayContent = content || "-"

  return (
    <>
      <div
        className="truncate cursor-pointer hover:text-blue-500 hover:underline transition-colors"
        style={{ maxWidth }}
        onClick={() => setShowPopup(true)}
        title="点击查看详情"
      >
        {displayContent}
      </div>
      {showPopup && (
        <DetailPopup title={title} content={displayContent} onClose={() => setShowPopup(false)} />
      )}
    </>
  )
}

// 排序状态类型
type SortDirection = "asc" | "desc" | null
type SortField = "kd" | "coins" | "triangle" | "limitTriangle" | "insurance" | "exp9" | "rentPrice" | "aw" | null

// 可排序的表头
function SortableHeader({
  label,
  field,
  currentSortField,
  currentSortDirection,
  onSort,
}: {
  label: string
  field: SortField
  currentSortField: SortField
  currentSortDirection: SortDirection
  onSort: (field: SortField) => void
}) {
  const isActive = currentSortField === field
  
  return (
    <div
      className="flex items-center gap-1 cursor-pointer hover:text-gray-700 select-none"
      onClick={() => onSort(field)}
    >
      {label}
      <div className="flex flex-col">
        {isActive && currentSortDirection === "asc" ? (
          <ChevronUp className="w-3 h-3 text-blue-500" />
        ) : isActive && currentSortDirection === "desc" ? (
          <ChevronDown className="w-3 h-3 text-blue-500" />
        ) : (
          <ChevronDown className="w-3 h-3 text-gray-400" />
        )}
      </div>
    </div>
  )
}

const ITEMS_PER_PAGE = 10

export default function HaobiaoPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const tabs = ["4格", "6格", "9格", "全部", "通宵号", "特价"]

  // 处理排序点击
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // 同一列，切换排序方向
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection("asc")
      }
    } else {
      // 新列，默认升序
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // 根据标签和排序过滤数据
  const filteredAndSortedData = useMemo(() => {
    let result = [...accountsData]
    
    // 根据保险格数筛选 - 注意这里insurance列现在是真正的保险值
    // 但根据截图，4格/6格/9格的筛选应该是基于某个特定规则
    // 看截图第二张，保险列显示的是数字如3、6、0、4等
    // 而分几批列显示的是4格
    // 所以筛选应该基于splitCount列的值
    if (activeTab === "4格") {
      result = result.filter(item => item.splitCount === 4 || item.splitCount === "4格")
    } else if (activeTab === "6格") {
      result = result.filter(item => item.splitCount === 6 || item.splitCount === "6格")
    } else if (activeTab === "9格") {
      result = result.filter(item => item.splitCount === 9 || item.splitCount === "9格")
    } else if (activeTab === "通宵号") {
      result = result.filter(item => item.tag === "通宵号")
    }
    // "全部" 和 "特价" 暂时显示所有数据
    
    // 排序
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let aVal: number = 0
        let bVal: number = 0
        
        switch (sortField) {
          case "kd":
            aVal = a.kd
            bVal = b.kd
            break
          case "coins":
            aVal = Number(a.coins)
            bVal = Number(b.coins)
            break
          case "triangle":
            aVal = a.triangle
            bVal = b.triangle
            break
          case "limitTriangle":
            aVal = a.limitTriangle
            bVal = b.limitTriangle
            break
          case "insurance":
            aVal = typeof a.insurance === "number" ? a.insurance : 0
            bVal = typeof b.insurance === "number" ? b.insurance : 0
            break
          case "exp9":
            aVal = typeof a.exp9 === "number" ? a.exp9 : 0
            bVal = typeof b.exp9 === "number" ? b.exp9 : 0
            break
          case "rentPrice":
            aVal = a.rentPrice
            bVal = b.rentPrice
            break
          case "aw":
            aVal = a.aw
            bVal = b.aw
            break
        }
        
        if (sortDirection === "asc") {
          return aVal - bVal
        } else {
          return bVal - aVal
        }
      })
    }
    
    return result
  }, [activeTab, sortField, sortDirection])

  // 计算分页
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredAndSortedData, currentPage])

  // 切换标签时重置页码
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>返回主页</span>
            </Link>
            <div className="w-px h-6 bg-gray-200" />
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                天
              </div>
              <h1 className="text-xl font-bold text-gray-800">天下商行</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-blue-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-md">
              登录
            </Button>
          </div>
        </div>
      </header>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[2200px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-sm text-gray-500">
              <th className="px-3 py-3 text-left font-medium w-10"></th>
              <th className="px-3 py-3 text-left font-medium">唯一编码</th>
              <th className="px-3 py-3 text-left font-medium">标签</th>
              <th className="px-3 py-3 text-left font-medium">登录方式</th>
              <th className="px-3 py-3 text-left font-medium">在线时间</th>
              <th className="px-3 py-3 text-left font-medium">段位</th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="绝密kd"
                  field="kd"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="纯币/M"
                  field="coins"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="三角券"
                  field="triangle"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="限时三角券"
                  field="limitTriangle"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">能否分批</th>
              <th className="px-3 py-3 text-left font-medium">分几批</th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="保险"
                  field="insurance"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="9格体验券"
                  field="exp9"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">体力负重</th>
              <th className="px-3 py-3 text-left font-medium">比例</th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="纯币+物资租金"
                  field="rentPrice"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">
                <SortableHeader
                  label="aw"
                  field="aw"
                  currentSortField={sortField}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
              </th>
              <th className="px-3 py-3 text-left font-medium">六甲</th>
              <th className="px-3 py-3 text-left font-medium">六头</th>
              <th className="px-3 py-3 text-left font-medium">红弹</th>
              <th className="px-3 py-3 text-left font-medium min-w-[120px]">其他物资</th>
              <th className="px-3 py-3 text-left font-medium">皮肤</th>
              <th className="px-3 py-3 text-left font-medium">封号记录</th>
              <th className="px-3 py-3 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((account, index) => (
              <tr
                key={account.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-4 text-sm text-gray-500">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.code}</td>
                <td className="px-3 py-4">
                  {account.tag && (
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded">
                      {account.tag}
                    </span>
                  )}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.loginType}</td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  <ClickableCell content={account.onlineTime} title="在线时间" maxWidth="90px" />
                </td>
                <td className="px-3 py-4">
                  <span className={`px-2 py-0.5 text-xs rounded ${getRankStyle(account.rank)}`}>
                    {account.rank}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.kd}</td>
                <td className="px-3 py-4">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-sm rounded">
                    {account.coins}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.triangle}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.limitTriangle}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.canSplit}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{typeof account.splitCount === "number" ? `${account.splitCount}格` : account.splitCount}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.insurance}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.exp9}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.stamina}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.ratio || "-"}</td>
                <td className="px-3 py-4 text-sm text-orange-500 font-medium">{account.rentPrice}</td>
                <td className={`px-3 py-4 text-sm font-medium ${account.aw > 0 ? "text-red-500" : "text-gray-700"}`}>
                  {account.aw}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.liujia}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.liutou}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.hongdan}</td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  <ClickableCell content={account.equipment} title="其他物资" maxWidth="100px" />
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  <ClickableCell content={account.skin} title="皮肤" maxWidth="80px" />
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">{account.banRecord}</td>
                <td className="px-3 py-4">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4">
                    选号
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-6 border-t border-gray-200">
        <span className="text-sm text-gray-500 mr-4">10 条/页</span>
        <span className="text-sm text-gray-500 mr-4">共{filteredAndSortedData.length}条</span>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={`min-w-[32px] h-8 px-2 rounded text-sm ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-1 text-gray-400">
              {page}
            </span>
          )
        )}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  )
}
