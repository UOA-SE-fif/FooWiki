class User:
    userid: int
    uername: str
    pw: int

    def __init__(self, userid: int, username: str, pw: str) -> None:
        self.userid = userid
        self.uername = username
        self.pw = pw

