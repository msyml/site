const env = () => {
    return process.env.NODE_ENV;
}

function getUrl (dev: string, pro: string): string {
    const envs = env();
    return envs === "production" ? pro : dev;
}

function baseUrl ():string {
    const dev = "http://localhost:8080/msyml/front";
    const prd = "https://api.msyml.cn/msyml/front/"
    console.log("env",getUrl(dev,prd));
    return getUrl(dev,prd);
}

export {
    baseUrl
}

