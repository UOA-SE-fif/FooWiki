import json
import os

# 打开配置文件
with open('application/config/config.json', encoding='utf-8') as f:
    config_dict = json.load(f)

# 将配置文件中的配置项转换为环境变量
for key, value in config_dict.items():
    value = str(value)
    os.environ[key] = value


class Settings:

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SECRET_KEY: str = "f2e1f1b1c1a1"
    ALGORITHMS: str = "HS256"
