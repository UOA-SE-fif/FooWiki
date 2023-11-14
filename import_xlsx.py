import pandas as pd
from application.orm.crud.add_dishes import add_dishes
from application.orm import schemas


def import_xlsx():
    """
    :return: 以列表形式返回关于菜品的数据
    """
    df = pd.read_excel('data/食堂菜品数据(1).xlsx', sheet_name='Sheet1')
    # 如果有NAN值，填充为字符串0
    df = df.fillna('0')
    dishes_list = []
    for index, row in df.iterrows():
        dishes_list.append(schemas.DishesBase(
            dishname=row['菜品名称'],
            describe=row['描述'],
            price=row['价格'],
            shopname=row['店铺'],
            floor=row['楼层'],
            type=row['种类'],
            satiety=row['饱腹感'],
            vegetables=row['蔬菜量'],
            meat=row['肉量']
        ))
        print(row['菜品名称'])
    add_dishes(dishes_list)
    return True


if __name__ == '__main__':
    import_xlsx()
