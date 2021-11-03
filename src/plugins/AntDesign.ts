import { Button, message, Radio, Input, Card, Row, Col, Modal, Pagination, Skeleton, Empty } from 'ant-design-vue'
import { App } from 'vue'

export default function (app: App<Element>) {
  app.use(Button)
  app.use(Radio)
  app.use(Input)
  app.use(Card)
  app.use(Row)
  app.use(Col)
  app.use(Modal)
  app.use(Pagination)
  app.use(Skeleton)
  app.use(Empty)
  app.config.globalProperties.$message = message
}
