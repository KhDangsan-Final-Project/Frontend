import Card from "./Contents/Card";
import Library from "./Contents/Library";
import MenuContents from "./Contents/MenuContents";
import MyPage from "./Contents/Mypage";
import News from "./Contents/News";
import Search from "./Contents/Search";
import Menu from "./Contents/Menu";

export default function Login() {
    return (
        <div>
            <MenuContents />
            <Card/>
            <Library/>
            <Menu/>
            <MyPage/>
            <News/>
            <Search/>
        </div>
    )
}