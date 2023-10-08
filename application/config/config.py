import json
import os

# 打开配置文件
with open('application/config/config.json', encoding='utf-8') as f:
    config_dict = json.load(f)

# 将配置文件中的配置项转换为环境变量
for key, value in config_dict.items():
    value = str(value)
    os.environ[key] = value
