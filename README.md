# Guide

----

`OGA UI` is a frontend UI component library built on `Vue 3` and `Element Plus`.

## Dependencies
```js
"vue": "^3.5.25"
"element-plus": "^2.13.2"
"@wangeditor/editor": "^5.1.23"
"@wangeditor/editor-for-vue": "^5.1.12"
```

## Install

```bash
npm i oga-ui
npm i @wangeditor/editor
npm i @wangeditor/editor-for-vue@next
```

## How to use

in `main.ts`

```js
import "oga-ui/index.css"
import ogaUI from 'oga-ui'

app.use(ogaUI)
```

## What's new
```html
Input
InputNumber
Mention
DatePicker
TimePicker
Cascader
Select
SelectV2
TreeSelect
Tag
Table
Page
PageSection
PageLayout
RichTextEditor
IconFont
Avatar
ImageUpload(Multiple upload)
```

## Update
### Table
```html
Column Type

export enum ColumnType {
    Switch = "switch",
    Button = "button",
    Date = "date",
    Datetime = "datetime",
    Image = "image",
    Album = "album",
    Number = "number",
}

ImageState {
    title: string;
    url: string;
}

Filed value: List<ImageState>

<el-image
    :src="url"
    :preview-src-list="srcList"
/>

ColumnType.Number
{
    prop: 'chest',
    width: 100,
    type: ColumnType.Number,
    config: {
        format: "###.###"
    },
    label: i18n.global.t('organize.employee.tableHeader.chest')
},
eg: 123,456,769
    
config: {
    format: "KMBT"
},
eg: 532 / 1.2K / 12.5K / 12.2M / 2.5B / 885.3T

config: {
    format: "fixed",
    digit: 3
},
eg: 531.972
    
className: 'stop',
Stop row click event

ColumnType.Image
ColumnType.Album
config: {
radius: 25,
    fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
},

Date = "date",
Datetime = "datetime",
    format: 'yyyy年MM月dd日'
    format: "yyyy年MM月dd日 hh时mm分ss秒"
```

## IconFont
#### How to use
```html
name: icon name
<oga-icon name="package"></oga-icon>
```
#### ICON List
```js
const icons = [
    "avatar",
    "group",
    "customer",
    "user",
    "video",
    "cs",
    "brightness",
    "contrast",
    "face",
    "link",
    "flash",
    "key",
    "voice",
    "safe",
    "code",
    "info",
    "task",
    "graphics",
    "add-list",
    "save",
    "label",
    "pin",
    "cancel",
    "list",
    "wallet",
    "bill-empty",
    "bill-new",
    "bill-complete",
    "sign-in",
    "car",
    "truck",
    "pack",
    "shop",
    "logout",
    "personal",
    "print",
    "edit",
    "laptop",
    "copy",
    "lock",
    "vs",
    "bag",
    "gift",
    "en",
    "theme",
    "wand",
    "diamond",
    "cn",
    "help",
    "tiers",
    "navigate",
    "correct",
    "android",
    "incorrect",
    "table",
    "about",
    "plus",
    "equal",
    "minus",
    "switch",
    "refresh",
    "disable",
    "setting",
    "scan",
    "home",
    "delete",
    "frame",
    "more",
    "app",
    "full-screen",
    "shield",
    "currency-flow",
    "loan",
    "calculator",
    "finance",
    "dollar",
    "cny",
    "cancel-bill",
    "bank-card",
    "praise",
    "tread",
    "smile",
    "grow",
    "message",
    "sad",
    "share",
    "collect",
    "wang",
    "favorite",
    "calendar",
    "tree",
    "polyline",
    "cloud",
    "upload",
    "download",
    "pie",
    "columnar",
    "package",
    "package-collection",
    "package-move",
    "location",
    "earth",
    "sorting",
    "service",
    "cart",
    "customs",
    "msg",
    "news",
    "email",
    "notice",
    "eye",
    "eye-close",
    "search"
]
```
