import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Header from "../component/header/index"
import "../style/index.less";

export default class Index extends Component {

    render() {
        const iconList  = ["icon-bb", "icon-bgg", "icon-bg", "icon-bd", "icon-cm", "icon-dg", "icon-dhs", "icon-kxg", "icon-mkl", "icon-rg", "icon-ms", "icon-nyg"]
        return (
            <React.Fragment>
                <Header title="雪碧图"></Header>
                <div className="index-page">
                    <div className="icon-max"></div>
                    <div className="describe">基于postcss-sprites的雪碧图后处理方案</div>
                    <div className="bkg-box">
                        {
                            iconList.map(classText => {
                                return <div key={classText} className={`${classText} icon`}></div>
                            })
                        }
                    </div>
                    <div className="info">
                        使用方案介绍：
                        <p>1. 雪碧图合成支持热更新，文件夹新增图片会立刻合成并生成css</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Index></Index>, document.querySelector("#main"))
