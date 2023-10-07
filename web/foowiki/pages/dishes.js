import {createRef} from "react"
import {useState} from "react"
import ReactDOM from "react-dom"
import {createRoot} from "react-dom/client"

//存放菜品的全局变量
let dishes = []
//菜品列表的html元素
let dishTable
//菜品列表的DOMroot
let root
//后端地址
const URL = "http://localhost:5000"

//四个数据
let floor = createRef()
let shop = createRef()
let priceLeft = createRef()
let priceRight = createRef()

export default function Dishes({ data }){

    //向后端请求
     fetch(`${URL}/dishesInfo`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Content-Type':"application/json"
            }
     }).then(res=>res.json())
         .then(res=>{
             console.log(res)
             dishes = res
             //初始化菜品列表
             let dishesTable = dishes.map((item,index)=>{
                 return(<tr key={index}>
                     <td>{item.dishname}</td>
                     <td>{item.describe}</td>
                     <td>{item.price}</td>
                     <td>{item.shopname}</td>
                     <td>{item.floor}</td>
                     <td>{item.type}</td>
                 </tr>)
             })

             //初始化DOMroot
             root = createRoot(document.getElementById("dishMessage"))
             root.render(dishesTable)
         })

    return (
        <div>
            <div>
                <select name="floor" id="floor" ref={floor} onChange={change}>
                    <option value={1}>1楼</option>
                    <option value={2}>2楼</option>
                    <option value={3}>3楼</option>
                </select>

                <select name="shop" id="shop" ref={shop} onChange={change}>
                    <option>商家1</option>
                    <option>商家2</option>
                    <option>商家3</option>
                    <option>商家4</option>
                </select>
                <input type="number" name="priceLeft" id="priceLeft" placeholder="最低价格" ref={priceLeft} onChange={change}></input>
                <input type="number" name="priceRight" id="priceRight" placeholder="最高价格" ref={priceRight} onChange={change}></input>
            </div>

            <div>
                <table>
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
                    <tbody id="dishMessage">
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function change(){
    dishTable =[]
    //获取所有筛选信息
    let floorValue = floor.current.value
    let shopname = shop.current.value
    let minPrice = priceLeft.current.value
    let maxPrice = priceRight.current.value
    console.log(floorValue," ",shopname," ",!minPrice," ",!maxPrice)

    //最大值不应超过最小值
    if(maxPrice&&minPrice&&maxPrice<minPrice)return

    for(let i=0;i<dishes.length;i++){
        let dish = dishes[i]
        //检查楼层和商家
        if(dish.floor!=parseInt(floorValue)||dish.shopname!=shopname)continue
        //检查价格区间
        //比大的大或者比小的小
        if(minPrice&&maxPrice&&(dish.price<minPrice||dish.price>maxPrice))continue
        //有大无小比大的大
        else if(!minPrice&&maxPrice&&dish.price>maxPrice)continue
        //有小无大比小的大
        else if(minPrice&&!maxPrice&&dish.price<minPrice)continue

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