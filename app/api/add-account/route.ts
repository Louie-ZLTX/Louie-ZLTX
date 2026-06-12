import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// 接收小程序POST提交的表单数据
export async function POST(req: Request) {
  try {
    const formData = await req.json();
    // 读取现有账号列表
    const accountList = await kv.get<string[]>("publishList") || [];
    // 新数据插到最顶部
    accountList.unshift({
      ...formData,
      serverSaveTime: new Date().toLocaleString(),
      source: "微信小程序"
    });
    // 存入KV数据库永久保存
    await kv.set("publishList", accountList);

    return NextResponse.json({
      code: 200,
      msg: "账号已同步至网站号表"
    });
  } catch (err)
    return NextResponse.json(
      { code: 500, msg: "存储失败", error: (err as Error).message },
      { status: 500 }
    );
  }
}
