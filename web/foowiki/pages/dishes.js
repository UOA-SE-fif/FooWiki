import React, {createRef} from "react"
import {createRoot} from "react-dom/client"
import {redirect} from "next/navigation";
import "./scss/dishes.css"
import Image from "next/image";
import Container from "../components/container";
import PCSelector from "../components/dropdown_selector";
import {Selector} from "../components/Selector" ;
import Nav_bar from "../components/nav_bar";
import {Title} from "../components/Title";
import {NavBar} from "../components/NavBar";
import {DishesCard} from "../components/DishesCard";

import useScreenSize from "../Hook/useScreenSize";
import disableScroll from "../Hook/disableScroll";

//屏幕改变的阈值
const changeSize = 500
//存放菜品的全局变量
let dishes = []
//菜品列表的html元素
let dishTable
//菜品列表的DOMroot
let root
//后端地址
const localURL = "http://127.0.0.1:5000"
const remoteURL = "http://175.178.154.171:5000"
const URL = remoteURL

const v1DishesApi = `${URL}/api/v1/dishes`
const v1UserApi = `${URL}/api/v1/user/{api}`
//菜品信息
let dishesInfo = null


export async function getServerSideProps(context) {
    try {
        // 向后端请求
        const res = await fetch(v1DishesApi);
        const data = await res.json();

        const headerCookies = context.req.headers.cookie
        //拆cookies
        const Cookies = headerCookies?headerCookies.split('; ').reduce((acc,cookies)=>{
            const [name,value] = cookies.split('=')
            acc[name] = decodeURIComponent(value)
            return acc
        },{}):{}
        const fooWikiCookie = Cookies['fooWikiAuth']?Cookies['fooWikiAuth']:null

        const userRes = await fetch(v1UserApi.replace("{api}","info"),{
        method:"GET",
        credentials: 'include',
        headers:{
            'Authorization':`Bearer ${fooWikiCookie}`
        }
        })

        const userData = await userRes.json();
        // 返回数据
        return {
            props: {
                data,
                fooWikiCookie,
                userData
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

const DishesPage = ({screenWidth, screenHeight, data,userData,fooWikiCookie}) => {

    console.log(screenWidth, ' ', screenHeight)
    if (!data) {
        window.location.href = '/'
        return
    }
    dishes = data.data
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
    if (screenWidth > changeSize) {
        dishesInfo = dishes.map((item, index) => {
            return (<tr key={index}>
                <td>{item.dishname}</td>
                <td>{item.describe}</td>
                <td>{item.price}</td>
                <td>{item.shopname}</td>
                <td>{item.floor}</td>
            </tr>)
        })
    } else {
        dishesInfo = dishes.map((item, index) => {
            return (
                // eslint-disable-next-line react/jsx-key
                <div className="row mb-2">
                    <DishesCard item={item} className=""></DishesCard>
                </div>
            )
        })
    }

    // 等待后端返回数据再渲染
    if (screenWidth <= changeSize) {
        return (
            <div className="container-fluid h-100" style={{overflow: "hidden", height: "25vh"}}>
                <NavBar className="" linkAdress="/login" userData={userData}></NavBar>
                <div className="row mt-4 mx-auto h-25">
                    <div>
                        <Title text="Floor"/>
                        <Selector className="selector-2" onChange={() => {
                            change(screenHeight, screenWidth)
                        }} options={floors} name="楼层" id="floor" defaultValue="Null"/>
                        <Title className="" text="Sellers"/>
                        <Selector className="selector-instance" onChange={() => {
                            change(screenHeight, screenWidth)
                        }} options={shops} name="商家" id="shop" defaultValue="seller name"/>
                        <Title className="" text="Price"/>
                        <div className="row  justify-content-center align-items-center text-center">
                            <div className="foowikiFont col-5">
                                <input className="form-control input" type="number" name="priceLeft" id="priceLeft"
                                       placeholder="Low Price"
                                       onChange={() => {
                                           change(screenHeight, screenWidth)
                                       }}></input>
                            </div>
                            <div className="foowikiFont col-2" style={{fontSize:"40px"}}>~</div>
                            <div className="foowikiFont col-5">
                                <input className="form-control input" type="number" name="priceRight" id="priceRight"
                                       placeholder="High Price"
                                       onChange={() => {
                                           change(screenHeight, screenWidth)
                                       }}></input>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center text-center">
                            <div className="col-12">
                                <div className="more mb-0">more</div>
                                <div className="">
                                    <Image className="arrowhead" alt="Line" src="/img/line-2.svg" width={10} height={2}/>
                                    <Image className="arrowhead" alt="Line" src="/img/line-3-3.svg" width={10} height={2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-auto h-50 d-flex justify-content-center"
                     style={{overflowX: "hidden", overflowY: "auto", maxHeight: "40vh"}} id="dishesInfo">
                    {dishesInfo}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Nav_bar user={userData}></Nav_bar>
                <Container>
                    <div className="row">
                        <PCSelector name="楼层" options={floors} onChange={() => {
                            change(screenHeight, screenWidth)
                        }} id={"floor"}/>
                        <PCSelector name="商家" options={shops} onChange={() => {
                            change(screenHeight, screenWidth)
                        }} id={"shop"}/>
                        <div className="col-2 flex">
                            <label htmlFor="price">价格</label>
                            <input className="form-control" type="number" name="priceLeft" id="priceLeft"
                                   placeholder="最低价格"
                                   onChange={() => {
                                       change(screenHeight, screenWidth)
                                   }}></input>
                            <input className="form-control" type="number" name="priceRight" id="priceRight"
                                   placeholder="最高价格"
                                   onChange={() => {
                                       change(screenHeight, screenWidth)
                                   }}></input>
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
}

//电脑端菜品列表的实现
function addDishesPC(num, dish) {
    return (
        <tr key={num}>
            <td>{dish.dishname}</td>
            <td>{dish.describe}</td>
            <td>{dish.price}</td>
            <td>{dish.shopname}</td>
            <td>{dish.floor}</td>
        </tr>
    )
}

//移动端的菜品列表实现
function addDishesPhone(num, dish) {
    return (
        <div className="row mb-2">
            <DishesCard item={dish} className=""></DishesCard>
        </div>
    )
}

export function change(screenHeight, screenWidth) {
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

        if (screenWidth <= changeSize) {
            dishTable.push(addDishesPhone(i, dish))
        } else {
            dishTable.push(addDishesPC(i, dish))
        }
    }

    //重写表
    root.render(dishTable)
}

export default function Dishes({data,userData,fooWikiCookie}) {
    const screenSize = useScreenSize();
    disableScroll({screenSize,changeSize});
    return <DishesPage screenHeight={screenSize.height}
                       screenWidth={screenSize.width}
                       data={data}
                       userData={userData}
                       fooWikiCookie={fooWikiCookie}></DishesPage>
}