Example to tasks that your api should return:
GET /api/tasks
[
    {
        "id": 2,
        "title": "Fetch from Oracle",
        "description": "fetch from oracle and put to elastic",
        "dates": [{
            "dateFrom": "",
            "dateTo": ""
        }],
        "partitions": {
            "total": 108,
            "completed": 95,
            "failed": 8,
            "inProgress": 5
        }
  
    }
]



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

