import {createRef} from "react"
export default function Dishes() {
    let floor = createRef()
    let shop = createRef()
    let priceLeft = createRef()
    let priceRight = createRef()

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