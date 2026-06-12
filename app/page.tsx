import { kv } from "@vercel/kv";

export default async function HaoBiaoPage() {
  // 读取所有小程序上传的账号数据
  const accountList = await kv.get<any[]>("publishList") || [];

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">全部上架账号（小程序同步）</h1>

      {accountList.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p>暂无上架账号，请前往小程序提交账号信息</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accountList.map((item, idx) => (
            <div key={idx} className="border rounded-xl p-5 shadow-sm">
              <p><strong>提交人：</strong>{item.submitUser}</p>
              <p><strong>登录方式：</strong>{item.loginType}</p>
              <p><strong>段位：</strong>{item.rank}</p>
              <p><strong>KD：</strong>{item.kd}</p>
              <p><strong>纯币：</strong>{item.coin} m</p>
              <p><strong>保险：</strong>{item.insurance}</p>
              <p><strong>红皮：</strong>{item.skin}</p>
              <p><strong>封号记录：</strong>{item.banRecord || "无"}</p>
              <p className="text-sm text-gray-400 mt-2">提交时间：{item.submitTime}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
