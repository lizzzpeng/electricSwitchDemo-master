import {
    Select,
    Option,
    // OptionGroup,
    Input,
    // InputNumber,
    Radio,
    Tree,
    Dialog,
    Row,
    Col,
    // Checkbox,
    // CheckboxButton,
    // CheckboxGroup,
    // Cascader,
    Switch,
    Slider,
    TimeSelect,
    TimePicker,
    DatePicker,
    // Upload,
    // Rate,
    // ColorPicker,
    // Transfer,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tag,
    Button,
    // Progress,
    Pagination,
    // Badge,
    Avatar,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    MenuItemGroup,
    MenuItem,
    Submenu,
    RadioGroup,
    RadioButton,
    Collapse,
    Container,
    Tabs,
    Header,
    Aside,
    Card,
    Image,
    TabPane,
    CollapseItem,
    Popconfirm,
    DescriptionsItem,
    Descriptions,
    Footer,
    Main,
    Badge

} from 'element-ui'
const element = {
    install: function(Vue) {
        Vue.use(Select)
        Vue.use(Option)
        // Vue.use(OptionGroup)
        Vue.use(Input)
        // Vue.use(InputNumber)
        Vue.use(Radio)
        Vue.use(Tree)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        // Vue.use(Checkbox)
        // Vue.use(CheckboxButton)
        // Vue.use(CheckboxGroup)
        // Vue.use(Cascader)
        Vue.use(Switch)
        Vue.use(Slider)
        Vue.use(TimePicker)
        Vue.use(TimeSelect)
        Vue.use(DatePicker)
        // Vue.use(Upload)
        // Vue.use(Rate)
        // Vue.use(ColorPicker)
        // Vue.use(Transfer)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Tag)
        Vue.use(Button)
        // Vue.use(Progress)
        Vue.use(Pagination)
        // Vue.use(Badge)
        Vue.use(Avatar)
        Vue.use(Alert)
        Vue.use(Loading)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Submenu)
        Vue.use(RadioGroup)
        Vue.use(RadioButton)
        Vue.use(Collapse)
        Vue.use(Container)
        Vue.use(Tabs)
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(Card)
        Vue.use(Image)
        Vue.use(TabPane)
        Vue.use(CollapseItem)
        Vue.use(Popconfirm)
        Vue.use(DescriptionsItem)
        Vue.use(Descriptions)
        Vue.use(Footer)
        Vue.use(Main)
        Vue.use(Badge)




        Vue.prototype.$message = Message;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$notify = Notification;

    }
}

export default element
