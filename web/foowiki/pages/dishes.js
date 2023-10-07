import {createRef} from "react"
export default function Dishes() {
    let floor = createRef()


    return (
        <div>
            <div>
                <select name="floor" id="floor" ref={floor}>
                    <option>1楼</option>
                    <option>2楼</option>
                    <option>3楼</option>
                </select>
                <input type="text" name="shop" id="shop" placeholder="商家"></input>
                <input type="text" name="priceLeft" id="priceLeft" placeholder="最低价格"></input>
                <input type="text" name="priceRight" id="priceRight" placeholder="最高价格"></input>
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