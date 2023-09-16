class Dish:
    dishid: int
    dishname: str
    price: float
    shopname: str
    floor: int

    def __init__(self,dishid, dishname, price, shopname, floor) -> None:
        self.dishid = dishid
        self.dishname = dishname
        self.price = price
        self.shopname = shopname
        self.floor = floor

