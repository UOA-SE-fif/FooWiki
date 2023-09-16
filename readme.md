# FooWiki

本项目预计使用Flask做为后端框架，bootstrap5作为前端框架

### 项目结构
```
└── application
    ├── config           #配置文件
    ├── core             #核心算法
    ├── models           #模型（与数据库设计相对应）
    ├── routes           #路由
    ├── static           #前端静态文件夹
    │   └── bootstrap
    └── templates        #Flask模版文件夹
```

### 开发环境

- 安装依赖
```bash
conda create -n FooWiki python=3.10
conda activate FooWiki
pip install -r requirements.txt
```

- 添加依赖到requirements.txt
```bash
pip freeze > requirements.txt
```

- 安装npm依赖
```bash
npm install
```

### git使用
- 分支命名
  - 1.功能分支：feat: 功能名
  - 2.修复分支：fix: 修复名
- 提交注意事项
  - 1.提交前先拉取最新代码
  - 2.提交前先运行测试
  - 3.提交前先运行代码格式化