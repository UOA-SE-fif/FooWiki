import {createRef} from "react"
import {createRoot} from "react-dom/client"
import Container from "@/components/container";
import Selector from "@/components/dropdown_selector";
import "./scss/dishes.css"
import Nav_bar from "@/components/nav_bar";
import {redirect} from "next/navigation";

//存放菜品的全局变量
let dishes = []
//菜品列表的html元素
let dishTable
//菜品列表的DOMroot
let root
//后端地址
const localURL = "http://127.0.0.1:5000"
const remoteURL = "http://175.178.154.171:5000"
const URL = localURL
//菜品信息
let dishesInfo = null


export async function getServerSideProps(context) {
  try {
    // 向后端请求
    const res = await fetch(URL + "/dishesInfo");
    const data = await res.json();

    // 返回数据
    return {
      props: {
        data
      }
    };
  } catch (error) {
    // 捕获错误时进行重定向
    context.res.writeHead(302, {
      Location: '/'
    });
    context.res.end();

    // 在这里添加一个 return 语句，确保函数不会继续执行下去
    return {
      props: {}
    };
  }
}

export default function Dishes({data}) {

    if(!data){
        window.location.href='/'
        return
    }
    dishes = data.dishes
    // 获取所有商家
    let shops = new Set()
    dishes.forEach((item) => {
        shops.add(item.shopname)
    })
    shops = Array.from(new Set(shops))
    // 获取所有楼层
    let floors = new Set()
    dishes.forEach((item) => {
        floors.add(item.floor)
    })
    floors = Array.from(new Set(floors))
    // 初始化菜品列表
    dishesInfo = dishes.map((item, index) => {
        return (<tr key={index}>
            <td>{item.dishname}</td>
            <td>{item.describe}</td>
            <td>{item.price}</td>
            <td>{item.shopname}</td>
            <td>{item.floor}</td>
            <td>{item.type}</td>
        </tr>)
    })


    // 等待后端返回数据再渲染
    return (
        <div>
            <Nav_bar></Nav_bar>
            <Container>
                <div className="row">
                    <Selector name="楼层" options={floors} onChange={change} id={"floor"}/>
                    <Selector name="商家" options={shops} onChange={change} id={"shop"}/>
                    <div className="col-2 flex">
                        <label htmlFor="price">价格</label>
                        <input className="form-control" type="number" name="priceLeft" id="priceLeft"
                               placeholder="最低价格"
                               onChange={change}></input>
                        <input className="form-control" type="number" name="priceRight" id="priceRight"
                               placeholder="最高价格"
                               onChange={change}></input>
                    </div>
                </div>

                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>菜品名称</th>
                            <th>描述</th>
                            <th>价格</th>
                            <th>商家</th>
                            <th>楼层</th>
                            <th>种类</th>
                        </tr>
                        </thead>
                        <tbody id="dishesInfo">
                        {dishesInfo}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export function change() {
    if (!root) root = createRoot(document.getElementById("dishesInfo"))
    dishTable = []
    // 获取所有筛选信息
    let floorValue = parseInt(document.getElementById("floor").value)
    let shopname = document.getElementById("shop").value
    let minPrice = document.getElementById("priceLeft").value
    let maxPrice = document.getElementById("priceRight").value


    console.log(floorValue, " ", shopname, " ", minPrice, " ", maxPrice)

    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i]
        //检查楼层
        if (floorValue !== 0) {
            if (dish.floor !== floorValue) continue
        }
        //检查商家
        if (shopname !== "0") {
            if (dish.shopname !== shopname) continue
        }
        //检查价格区间
        //比大的大或者比小的小
        if (minPrice && maxPrice && (dish.price < minPrice || dish.price > maxPrice)) continue
        //有大无小比大的大
        else if (!minPrice && maxPrice && dish.price > maxPrice) continue
        //有小无大比小的大
        else if (minPrice && !maxPrice && dish.price < minPrice) continue

        dishTable.push(<tr key={i}>
            <td>{dish.dishname}</td>
            <td>{dish.describe}</td>
            <td>{dish.price}</td>
            <td>{dish.shopname}</td>
            <td>{dish.floor}</td>
            <td>{dish.type}</td>
        </tr>)
    }

    //重写表
    root.render(dishTable)
}