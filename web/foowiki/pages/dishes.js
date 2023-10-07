import {createRef} from "react"
import {getSortedPostsData} from 'posts'

//存放菜品的全局变量
let dishes = []
const URL = "http://localhost:5000"
export default function Dishes() {
    let floor = createRef()
    let shop = createRef()
    let priceLeft = createRef()
    let priceRight = createRef()

    fetch(`${URL}/dishesInfo`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Content-Type':"application/json"
            }
        }).then(res=>{
            return res.json()
        }).then(res=>{
            console.log(res)
            dishes = [...dishes,...res.foods]
            console.log(dishes)
        })

    return (
        <div>
            <div>
                <select name="floor" id="floor" ref={floor}>
                    <option>1楼</option>
                    <option>2楼</option>
                    <option>3楼</option>
                </select>

                <select name="shop" id="shop" ref={shop}>
                    <option>商家1</option>
                    <option>商家2</option>
                    <option>商家3</option>
                    <option>商家4</option>
                </select>
                <input type="text" name="priceLeft" id="priceLeft" placeholder="最低价格" ref={priceLeft}></input>
                <input type="text" name="priceRight" id="priceRight" placeholder="最高价格" ref={priceRight}></input>
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
                    <tbody>

                    </tbody>
                </table>
            </div>

        </div>
    )
}