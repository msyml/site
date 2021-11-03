import { Button, message, Radio, Input, Card, Row, Col} from 'ant-design-vue';
import { App } from 'vue'

export default function(app: App<Element>){
    app.use(Button);
    app.use(Radio);
    app.use(Input);
    app.use(Card);
    app.use(Row);
    app.use(Col);
    app.config.globalProperties.$message = message;
}