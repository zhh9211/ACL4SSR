// 基于 config/Full.ini 的 Mihomo 配置覆写脚本。
// 将整个文件粘贴到客户端的脚本编辑器，入口为 main(config)。

const BASE = "https://raw.githubusercontent.com/";
const OWN = BASE + "zhh9211/ACL4SSR/main/rules/";
const ACL = BASE + "ACL4SSR/ACL4SSR/master/Clash/";
const CHECK_URL = "https://i.ytimg.com/generate_204";
const BAD_NAME = /(Data Left|Traffic|Expir[ey]|剩[余餘]|[到过過效]期|[时時][间間]|重置|官.?网|官方|产品|平台|勿连|修复|恢复|更新|地址|网站|网址|售后|客服|联系|使用|购买|公告|版本|出现|没网|情况|开通|数量|分割线|注[：:])/i;
const FLAG = /[\u{1F1E6}-\u{1F1FF}]{2}/u;
const MAIN_REGIONS = "🇨🇳|🇭🇰|🇲🇴|🇹🇼|🇸🇬|🇯🇵|🇺🇸|🇺🇲|中国|香港|台湾|臺灣|澳门|澳門|新加坡|日本|美国|美國|China|Hong[ -]?Kong|Taiwan|Macao|Singapore|Japan|USA|America|United[ -]?States";

const G = {
  main: "✈️ ‍起飞", ai: "💡 ‍US-AI", ms: "Ⓜ️ 微软",
  auto: "⚡ ‍低延迟", balance: "🔀 ‍负载均衡", manual: "👆🏻 ‍指定",
  inside: "🛩️ ‍墙内", ad: "🆎 ‍广告", final: "🌐 ‍未知站点",
  hk: "🇭🇰 ‍香港", tw: "🇹🇼 ‍台湾", cn: "🇨🇳 ‍中国",
  sg: "🇸🇬 ‍新加坡", jp: "🇯🇵 ‍日本", us: "🇺🇸 ‍美国", other: "🎏 ‍其他",
  mhk: "👆🏻🇭🇰 ‍香港", mtw: "👆🏻🇹🇼 ‍台湾", mcn: "👆🏻🇨🇳 ‍中国",
  msg: "👆🏻🇸🇬 ‍新加坡", mjp: "👆🏻🇯🇵 ‍日本", mus: "👆🏻🇺🇸 ‍美国", mother: "👆🏻🎏 ‍其他"
};

// 以下规则的匹配部分来自 Full.ini 的 emoji 配置；脚本运行时统一处理已有国旗。
const EMOJI_RULES = [
  [
    "(澳[门門])",
    "🇲🇴"
  ],
  [
    "(朝[鲜鮮])",
    "🇰🇵"
  ],
  [
    "(澳大利[亚亞]|澳洲|悉尼|墨尔本)",
    "🇦🇺"
  ],
  [
    "(英[国國]|伦敦|加的夫)",
    "🇬🇧"
  ],
  [
    "(法[国國]|巴黎|马赛)",
    "🇫🇷"
  ],
  [
    "(阿联酋|迪拜|阿布扎比)",
    "🇦🇪"
  ],
  [
    "(丹麦)",
    "🇩🇰"
  ],
  [
    "(西班牙|马德里)",
    "🇪🇸"
  ],
  [
    "(冰岛)",
    "🇮🇸"
  ],
  [
    "(波兰)",
    "🇵🇱"
  ],
  [
    "(荷兰|阿姆斯特丹)",
    "🇳🇱"
  ],
  [
    "(阿尔巴尼亚)",
    "🇦🇱"
  ],
  [
    "(阿根廷)",
    "🇦🇷"
  ],
  [
    "(奥地利|维也纳)",
    "🇦🇹"
  ],
  [
    "(阿塞拜疆)",
    "🇦🇿"
  ],
  [
    "(波黑|波[士斯]尼亚|[黑赫]塞哥维[纳那])",
    "🇧🇦"
  ],
  [
    "(比利时)",
    "🇧🇪"
  ],
  [
    "(保加利亚)",
    "🇧🇬"
  ],
  [
    "(巴西|圣保罗|维涅杜)",
    "🇧🇷"
  ],
  [
    "(瑞士|苏黎世)",
    "🇨🇭"
  ],
  [
    "(智利)",
    "🇨🇱"
  ],
  [
    "(哥伦比亚)",
    "🇨🇴"
  ],
  [
    "(哥斯达黎加)",
    "🇨🇷"
  ],
  [
    "(塞浦路斯)",
    "🇨🇾"
  ],
  [
    "(捷克)",
    "🇨🇿"
  ],
  [
    "(爱沙尼亚)",
    "🇪🇪"
  ],
  [
    "(埃及)",
    "🇪🇬"
  ],
  [
    "(欧洲)",
    "🇪🇺"
  ],
  [
    "(芬兰|赫尔辛基)",
    "🇫🇮"
  ],
  [
    "(希腊)",
    "🇬🇷"
  ],
  [
    "(格鲁吉亚)",
    "🇬🇪"
  ],
  [
    "(克罗地亚)",
    "🇭🇷"
  ],
  [
    "(匈牙利)",
    "🇭🇺"
  ],
  [
    "(印尼|印度尼西亚|雅加达)",
    "🇮🇩"
  ],
  [
    "(泰国|曼谷)",
    "🇹🇭"
  ],
  [
    "(爱尔兰|都柏林)",
    "🇮🇪"
  ],
  [
    "(土耳其|伊斯坦布尔)",
    "🇹🇷"
  ],
  [
    "(以色列|耶路撒冷)",
    "🇮🇱"
  ],
  [
    "(马恩岛|曼岛)",
    "🇮🇲"
  ],
  [
    "(伊朗)",
    "🇮🇷"
  ],
  [
    "(意大利|米兰)",
    "🇮🇹"
  ],
  [
    "(约旦)",
    "🇯🇴"
  ],
  [
    "(肯尼亚)",
    "🇰🇪"
  ],
  [
    "(吉尔吉斯斯坦)",
    "🇰🇬"
  ],
  [
    "(柬埔寨)",
    "🇰🇭"
  ],
  [
    "(哈萨克斯坦)",
    "🇰🇿"
  ],
  [
    "(立陶宛)",
    "🇱🇹"
  ],
  [
    "(卢森堡)",
    "🇱🇺"
  ],
  [
    "(拉脱维亚)",
    "🇱🇻"
  ],
  [
    "(摩尔多瓦)",
    "🇲🇩"
  ],
  [
    "(前南斯拉夫|马其顿)",
    "🇲🇰"
  ],
  [
    "(蒙古)",
    "🇲🇳"
  ],
  [
    "(墨西哥|克雷塔罗)",
    "🇲🇽"
  ],
  [
    "(马来)",
    "🇲🇾"
  ],
  [
    "(尼日利亚)",
    "🇳🇬"
  ],
  [
    "(挪威)",
    "🇳🇴"
  ],
  [
    "(新西兰)",
    "🇳🇿"
  ],
  [
    "(菲律宾)",
    "🇵🇭"
  ],
  [
    "(巴基斯坦)",
    "🇵🇰"
  ],
  [
    "(巴拿马)",
    "🇵🇦"
  ],
  [
    "(秘鲁)",
    "🇵🇪"
  ],
  [
    "(葡萄牙)",
    "🇵🇹"
  ],
  [
    "(罗马[尼利]亚)",
    "🇷🇴"
  ],
  [
    "(塞尔维亚)",
    "🇷🇸"
  ],
  [
    "(沙特|吉达)",
    "🇸🇦"
  ],
  [
    "(瑞典|斯德哥尔摩)",
    "🇸🇪"
  ],
  [
    "(斯洛文尼亚)",
    "🇸🇮"
  ],
  [
    "(斯洛伐克)",
    "🇸🇰"
  ],
  [
    "(突尼斯)",
    "🇹🇳"
  ],
  [
    "(乌拉圭)",
    "🇺🇾"
  ],
  [
    "(越南)",
    "🇻🇳"
  ],
  [
    "(南非|约(翰内斯)?堡)",
    "🇿🇦"
  ],
  [
    "(乌克兰)",
    "🇺🇦"
  ],
  [
    "(波多黎各)",
    "🇵🇷"
  ],
  [
    "(厄瓜多尔)",
    "🇪🇨"
  ],
  [
    "(委内瑞拉)",
    "🇻🇪"
  ],
  [
    "(摩洛哥)",
    "🇲🇦"
  ],
  [
    "(尼泊尔)",
    "🇳🇵"
  ],
  [
    "(孟加拉)",
    "🇧🇩"
  ],
  [
    "(乌兹别克斯坦)",
    "🇺🇿"
  ],
  [
    "([文汶]莱)",
    "🇧🇳"
  ],
  [
    "(亚美尼亚)",
    "🇦🇲"
  ],
  [
    "(斯里兰卡)",
    "🇱🇰"
  ],
  [
    "(缅甸)",
    "🇲🇲"
  ],
  [
    "(伯利兹)",
    "🇧🇿"
  ],
  [
    "(不丹)",
    "🇧🇹"
  ],
  [
    "(老挝|寮国)",
    "🇱🇦"
  ],
  [
    "(格陵兰)",
    "🇬🇱"
  ],
  [
    "(巴勒斯坦)",
    "🇵🇸"
  ],
  [
    "(加拿大|[枫楓][叶葉]|多伦多|蒙特利尔|温哥华)",
    "🇨🇦"
  ],
  [
    "(印度|孟买|加尔各答|贾坎德|泰米尔纳德|海得拉巴)",
    "🇮🇳"
  ],
  [
    "([韩韓][国國]|首尔|春川)",
    "🇰🇷"
  ],
  [
    "(德[国國]|法兰克福)",
    "🇩🇪"
  ],
  [
    "(俄[国國]|俄[罗羅]斯|莫斯科|圣彼得堡|西伯利亚|伯力|哈巴罗夫斯克)",
    "🇷🇺"
  ],
  [
    "(美[国國]|华盛顿|波特兰|达拉斯|俄勒冈|凤凰城|菲尼克斯|费利蒙|弗里蒙特|硅谷|旧金山|拉斯维加斯|洛杉|圣何塞|圣荷西|圣塔?克拉拉|西雅图|芝加哥|哥伦布|纽约|阿什本)",
    "🇺🇸"
  ],
  [
    "(日本|东京|大阪|名古屋|埼玉)",
    "🇯🇵"
  ],
  [
    "(新加坡|[狮獅]城)",
    "🇸🇬"
  ],
  [
    "([台臺][湾灣]|新[北竹]|彰化)",
    "🇹🇼"
  ],
  [
    "(香港)",
    "🇭🇰"
  ],
  [
    "(印)",
    "🇮🇳"
  ],
  [
    "([韩韓])",
    "🇰🇷"
  ],
  [
    "(德)",
    "🇩🇪"
  ],
  [
    "(俄)",
    "🇷🇺"
  ],
  [
    "(美)",
    "🇺🇸"
  ],
  [
    "([台臺])",
    "🇹🇼"
  ],
  [
    "(港)",
    "🇭🇰"
  ],
  [
    "([京沪滬申广廣深莞苏蘇杭厦廈海光川]日|(?<![\\d\\u4E00-\\u9FFF])日(?![\\u4E00-\\u9FFF]))",
    "🇯🇵"
  ],
  [
    "([京沪滬申广廣深莞苏蘇杭厦廈海光川]新|(?<![\\u4E00-\\u9FFF])新(?![\\u4E00-\\u9FFF]))",
    "🇸🇬"
  ],
  [
    "(中[国國]|[广廣]州)",
    "🇨🇳"
  ],
  [
    "(?:(?<![\\da-z.])(MO|MAC|CTM)(?!\\d*[a-z])|Macao)",
    "🇲🇴"
  ],
  [
    "(?:(?<![\\da-z.])(KP|PRK)(?!\\d*[a-z])|North.*?Korea)",
    "🇰🇵"
  ],
  [
    "(?:(?<![\\da-z.])AUS?(?!\\d*[a-z])|Australia|Sydney|Melbourne)",
    "🇦🇺"
  ],
  [
    "(?:(?<![\\da-z.])(UK|GBR?)(?!\\d*[a-z])|Kingdom|England|London|Cardiff)",
    "🇬🇧"
  ],
  [
    "(?:(?<![\\da-z.])FRA?(?!\\d*[a-z])|France|Paris|Marseille|Marselha)",
    "🇫🇷"
  ],
  [
    "(?:(?<![\\da-z.])(AR?E|UAE)(?!\\d*[a-z])|Emirates|Dubai|Dhabi)",
    "🇦🇪"
  ],
  [
    "(?:(?<![\\da-z.])DN?K(?!\\d*[a-z])|Denmark)",
    "🇩🇰"
  ],
  [
    "(?:(?<![\\da-z.])ESP?(?!\\d*[a-z])|Spain|Madrid)",
    "🇪🇸"
  ],
  [
    "(?:(?<![\\da-z.])ISL?(?!\\d*[a-z])|Iceland)",
    "🇮🇸"
  ],
  [
    "(?:(?<![\\da-z.])PO?L(?!\\d*[a-z])|Poland)",
    "🇵🇱"
  ],
  [
    "(?:(?<![\\da-z.])NLD?(?!\\d*[a-z])|Netherlands)",
    "🇳🇱"
  ],
  [
    "(?:(?<![\\da-z.])ALB?(?!\\d*[a-z])|Albania)",
    "🇦🇱"
  ],
  [
    "(?:(?<![\\da-z.])ARG?(?!\\d*[a-z])|Argentina)",
    "🇦🇷"
  ],
  [
    "(?:(?<![\\da-z.])AU?T(?!\\d*[a-z])|Austria|Vienna)",
    "🇦🇹"
  ],
  [
    "(?:(?<![\\da-z.])AZE?(?!\\d*[a-z])|Azerbaijan)",
    "🇦🇿"
  ],
  [
    "(?:(?<![\\da-z.])(BA|BIH)(?!\\d*[a-z])|Bosnia|Herzegovina)",
    "🇧🇦"
  ],
  [
    "(?:(?<![\\da-z.])BEL?(?!\\d*[a-z])|Belgium)",
    "🇧🇪"
  ],
  [
    "(?:(?<![\\da-z.])BGR?(?!\\d*[a-z])|Bulgaria)",
    "🇧🇬"
  ],
  [
    "(?:(?<![\\da-z.])BRA?(?!\\d*[a-z])|Brazil|Paulo|Vinhedo)",
    "🇧🇷"
  ],
  [
    "(?:(?<![\\da-z.])CHE?(?!\\d*[a-z])|Switzerland|Zurich)",
    "🇨🇭"
  ],
  [
    "(?:(?<![\\da-z.])CH?L(?!\\d*[a-z])|Chile)",
    "🇨🇱"
  ],
  [
    "(?:(?<![\\da-z.])COL?(?!\\d*[a-z])|Colombia)",
    "🇨🇴"
  ],
  [
    "(?:(?<![\\da-z.])CRI?(?!\\d*[a-z])|Costa)",
    "🇨🇷"
  ],
  [
    "(?:(?<![\\da-z.])CYP?(?!\\d*[a-z])|Cyprus)",
    "🇨🇾"
  ],
  [
    "(?:(?<![\\da-z.])CZE?(?!\\d*[a-z])|Czech)",
    "🇨🇿"
  ],
  [
    "(?:(?<![\\da-z.])(EE|EST)(?!\\d*[a-z])|Estonia)",
    "🇪🇪"
  ],
  [
    "(?:(?<![\\da-z.])EGY?(?!\\d*[a-z])|Egypt)",
    "🇪🇬"
  ],
  [
    "(?:(?<![\\da-z.])EUE?(?!\\d*[a-z])|Europe)",
    "🇪🇺"
  ],
  [
    "(?:(?<![\\da-z.])FIN?(?!\\d*[a-z])|Finland|Helsinki)",
    "🇫🇮"
  ],
  [
    "(?:(?<![\\da-z.])GRC?(?!\\d*[a-z])|Greece)",
    "🇬🇷"
  ],
  [
    "(?:(?<![\\da-z.])GEO?(?!\\d*[a-z])|Georgia)",
    "🇬🇪"
  ],
  [
    "(?:(?<![\\da-z.])HRV?(?!\\d*[a-z])|Croatia)",
    "🇭🇷"
  ],
  [
    "(?:(?<![\\da-z.])HUN?(?!\\d*[a-z])|Hungary)",
    "🇭🇺"
  ],
  [
    "(?:(?<![\\da-z.])IDN?(?!\\d*[a-z])|Indonesia|Jakarta)",
    "🇮🇩"
  ],
  [
    "(?:(?<![\\da-z.])THA?(?!\\d*[a-z])|Thailand|Bangkok)",
    "🇹🇭"
  ],
  [
    "(?:(?<![\\da-z.])(IE|IRL)(?!\\d*[a-z])|Ireland|Dublin)",
    "🇮🇪"
  ],
  [
    "(?:(?<![\\da-z.])TU?R(?!\\d*[a-z])|Turkey|Istanbul)",
    "🇹🇷"
  ],
  [
    "(?:(?<![\\da-z.])(IL|ISR)(?!\\d*[a-z])|Israel|Jerusalem|Yerushalayim)",
    "🇮🇱"
  ],
  [
    "(?:(?<![\\da-z.])IMN?(?!\\d*[a-z])|Mann)",
    "🇮🇲"
  ],
  [
    "(?:(?<![\\da-z.])IRN?(?!\\d*[a-z])|Iran)",
    "🇮🇷"
  ],
  [
    "(?:(?<![\\da-z.])ITA?(?!\\d*[a-z])|Italy|Milan)",
    "🇮🇹"
  ],
  [
    "(?:(?<![\\da-z.])JOR?(?!\\d*[a-z])|Jordan)",
    "🇯🇴"
  ],
  [
    "(?:(?<![\\da-z.])KEN?(?!\\d*[a-z])|Kenya)",
    "🇰🇪"
  ],
  [
    "(?:(?<![\\da-z.])KGZ?(?!\\d*[a-z])|Kyrgyzstan)",
    "🇰🇬"
  ],
  [
    "(?:(?<![\\da-z.])KHM?(?!\\d*[a-z])|Cambodia)",
    "🇰🇭"
  ],
  [
    "(?:(?<![\\da-z.])KA?Z(?!\\d*[a-z])|Kazakhstan)",
    "🇰🇿"
  ],
  [
    "(?:(?<![\\da-z.])LTU?(?!\\d*[a-z])|Lietuvos)",
    "🇱🇹"
  ],
  [
    "(?:(?<![\\da-z.])LUX?(?!\\d*[a-z])|Luxembo?urg)",
    "🇱🇺"
  ],
  [
    "(?:(?<![\\da-z.])LVA?(?!\\d*[a-z])|Latvia)",
    "🇱🇻"
  ],
  [
    "(?:(?<![\\da-z.])MDA?(?!\\d*[a-z])|Moldova)",
    "🇲🇩"
  ],
  [
    "(?:(?<![\\da-z.])MKD?(?!\\d*[a-z])|Macedonia)",
    "🇲🇰"
  ],
  [
    "(?:(?<![\\da-z.])MNG?(?!\\d*[a-z])|Mongolia)",
    "🇲🇳"
  ],
  [
    "(?:(?<![\\da-z.])ME?X(?!\\d*[a-z])|Mexico|Queretaro)",
    "🇲🇽"
  ],
  [
    "(?:(?<![\\da-z.])MYS?(?!\\d*[a-z])|Malaysia)",
    "🇲🇾"
  ],
  [
    "(?:(?<![\\da-z.])NGA?(?!\\d*[a-z])|Nigeria)",
    "🇳🇬"
  ],
  [
    "(?:(?<![\\da-z.])NOR?(?!\\d*[a-z])|Norway)",
    "🇳🇴"
  ],
  [
    "(?:(?<![\\da-z.])NZL?(?!\\d*[a-z])|Zealand)",
    "🇳🇿"
  ],
  [
    "(?:(?<![\\da-z.])PHL?(?!\\d*[a-z])|Philippines)",
    "🇵🇭"
  ],
  [
    "(?:(?<![\\da-z.])PA?K(?!\\d*[a-z])|Pakistan)",
    "🇵🇰"
  ],
  [
    "(?:(?<![\\da-z.])PAN?(?!\\d*[a-z])|Panama)",
    "🇵🇦"
  ],
  [
    "(?:(?<![\\da-z.])PER?(?!\\d*[a-z])|Peru)",
    "🇵🇪"
  ],
  [
    "(?:(?<![\\da-z.])PR?T(?!\\d*[a-z])|Portugal)",
    "🇵🇹"
  ],
  [
    "(?:(?<![\\da-z.])ROU?(?!\\d*[a-z])|Romania)",
    "🇷🇴"
  ],
  [
    "(?:(?<![\\da-z.])(RS|SRB)(?!\\d*[a-z])|Serbia)",
    "🇷🇸"
  ],
  [
    "(?:(?<![\\da-z.])SAU?(?!\\d*[a-z])|Arabia|J[eu]dda)",
    "🇸🇦"
  ],
  [
    "(?:(?<![\\da-z.])SW?E(?!\\d*[a-z])|Sweden|Stockholm)",
    "🇸🇪"
  ],
  [
    "(?:(?<![\\da-z.])(SI|SVN)(?!\\d*[a-z])|Slovenia)",
    "🇸🇮"
  ],
  [
    "(?:(?<![\\da-z.])SV?K(?!\\d*[a-z])|Slovensko)",
    "🇸🇰"
  ],
  [
    "(?:(?<![\\da-z.])TU?N(?!\\d*[a-z])|Tunisia)",
    "🇹🇳"
  ],
  [
    "(?:(?<![\\da-z.])UR?Y(?!\\d*[a-z])|Uruguay)",
    "🇺🇾"
  ],
  [
    "(?:(?<![\\da-z.])VNM?(?!\\d*[a-z])|Vietnam)",
    "🇻🇳"
  ],
  [
    "(?:(?<![\\da-z.])ZAF?(?!\\d*[a-z])|Africa|Johannesburg)",
    "🇿🇦"
  ],
  [
    "(?:(?<![\\da-z.])(UA|UKR)(?!\\d*[a-z])|Ukraine)",
    "🇺🇦"
  ],
  [
    "(?:(?<![\\da-z.])PRI?(?!\\d*[a-z])|Puerto)",
    "🇵🇷"
  ],
  [
    "(?:(?<![\\da-z.])ECU?(?!\\d*[a-z])|Ecuador)",
    "🇪🇨"
  ],
  [
    "(?:(?<![\\da-z.])VEN?(?!\\d*[a-z])|Venezuela)",
    "🇻🇪"
  ],
  [
    "(?:(?<![\\da-z.])MAR?(?!\\d*[a-z])|Morocco)",
    "🇲🇦"
  ],
  [
    "(?:(?<![\\da-z.])NPL?(?!\\d*[a-z])|Nepal)",
    "🇳🇵"
  ],
  [
    "(?:(?<![\\da-z.])BG?D(?!\\d*[a-z])|Bengal)",
    "🇧🇩"
  ],
  [
    "(?:(?<![\\da-z.])UZB?(?!\\d*[a-z])|Uzbekistan)",
    "🇺🇿"
  ],
  [
    "(?:(?<![\\da-z.])BR?N(?!\\d*[a-z])|Brunei)",
    "🇧🇳"
  ],
  [
    "(?:(?<![\\da-z.])AR?M(?!\\d*[a-z])|Armenia)",
    "🇦🇲"
  ],
  [
    "(?:(?<![\\da-z.])LKA?(?!\\d*[a-z])|Sri.*Lanka)",
    "🇱🇰"
  ],
  [
    "(?:(?<![\\da-z.])MMR?(?!\\d*[a-z])|Myanmar)",
    "🇲🇲"
  ],
  [
    "(?:(?<![\\da-z.])BL?Z(?!\\d*[a-z])|Belize)",
    "🇧🇿"
  ],
  [
    "(?:(?<![\\da-z.])BTN?(?!\\d*[a-z])|Bhutan)",
    "🇧🇹"
  ],
  [
    "(?:(?<![\\da-z.])LAO?(?!\\d*[a-z])|Lao)",
    "🇱🇦"
  ],
  [
    "(?:(?<![\\da-z.])GR?L(?!\\d*[a-z])|Greenland)",
    "🇬🇱"
  ],
  [
    "(?:(?<![\\da-z.])PSE?(?!\\d*[a-z])|Palestine)",
    "🇵🇸"
  ],
  [
    "(?:(?<![\\da-z.])CAN?(?!\\d*[a-z])|Canada|Toronto|Montreal|Vancouver)",
    "🇨🇦"
  ],
  [
    "(?:(?<![\\da-z.])IND?(?!\\d*[a-z])|India|Mumbai|Kolkata|Jharkhand|Tamil|Hyderabad)",
    "🇮🇳"
  ],
  [
    "(?:(?<![\\da-z.])KO?R(?!\\d*[a-z])|Korea|Seoul|Chuncheon)",
    "🇰🇷"
  ],
  [
    "(?:(?<![\\da-z.])DEU?(?!\\d*[a-z])|Germany|Frankfurt)",
    "🇩🇪"
  ],
  [
    "(?:(?<![\\da-z.])RUS?(?!\\d*[a-z])|Russia|Moscow|Petersburg|Siberia|Khabarovsk)",
    "🇷🇺"
  ],
  [
    "(?:(?<![\\da-z.])USA?(?!\\d*[a-z])|America|United.*States|Washington|Portland|Dallas|Oregon|Phoenix|Fremont|Valley|Francisco|Vegas|Los.*Angeles|San.*Jose|Santa.*Clara|Seattle|Chicago|Columbus|York|Ashburn)",
    "🇺🇸"
  ],
  [
    "(?:(?<![\\da-z.])JA?P(?!\\d*[a-z])|Japan|Tokyo|Osaka|Nagoya|Saitama)",
    "🇯🇵"
  ],
  [
    "(?:(?<![\\da-z.])SGP?(?!\\d*[a-z])|Singapore)",
    "🇸🇬"
  ],
  [
    "(?:(?<![\\da-z.])(TWN?|CHT|HiNet)(?!\\d*[a-z])|Taiwan)",
    "🇹🇼"
  ],
  [
    "(?:(?<![\\da-z.])(HKG?|CMI|HGC|HKT|HKBN|WTT|PCCW)(?!\\d*[a-z])|Hong)",
    "🇭🇰"
  ],
  [
    "(?:(?<![\\da-z.])CH?N(?!\\d*[a-z])|China)",
    "🇨🇳"
  ]
];
const EMOJI_PATTERNS = EMOJI_RULES.map(([pattern, flag]) => [new RegExp(pattern, "i"), flag]);

const PROVIDERS = [
  ["local", ACL + "LocalAreaNetwork.list", "DIRECT"],
  ["direct", OWN + "Direct.list", "DIRECT"],
  ["ban_ad", ACL + "BanAD.list", G.ad],
  ["ban_program", ACL + "BanProgramAD.list", G.ad],
  ["ban_easy", ACL + "BanEasyList.list", G.ad],
  ["ban_easy_cn", ACL + "BanEasyListChina.list", G.ad],
  ["ban_privacy", ACL + "BanEasyPrivacy.list", G.ad],
  ["app_activation", BASE + "LM-Firefly/Rules/refs/heads/master/Special/App-Activation.list", G.ad],
  ["ai", OWN + "AI.list", G.ai],
  ["microsoft", OWN + "Microsoft.list", G.ms],
  ["proxy", OWN + "Proxy.list", G.main],
  ["china_domain", ACL + "ChinaDomain.list", G.inside],
  ["china_ip", ACL + "ChinaCompanyIp.list", G.inside],
  ["download", ACL + "Download.list", G.inside],
  ["gfw", ACL + "ProxyGFWlist.list", G.main]
];

const unique = (items) => [...new Set(items)];

function flagFor(name) {
  if (FLAG.test(name)) return "";
  for (const [pattern, flag] of EMOJI_PATTERNS) {
    if (pattern.test(name)) return flag;
  }
  return "";
}

function normalizeProxies(config) {
  const proxies = Array.isArray(config.proxies) ? config.proxies : [];
  const seen = new Set();
  const kept = [];
  for (const proxy of proxies) {
    if (!proxy || typeof proxy.name !== "string" || BAD_NAME.test(proxy.name)) continue;
    let name = proxy.name;
    const emoji = flagFor(name);
    if (emoji) name += " " + emoji;
    // 前缀只在已知来源的名称上应用；订阅转换器的 GROUPID 在脚本输入中不可用。
    const baseName = name;
    let index = 2;
    while (seen.has(name)) name = `${baseName} (${index++})`;
    proxy.name = name;
    seen.add(name);
    kept.push(proxy);
  }
  config.proxies = kept;
  return kept.map((p) => p.name);
}

function addSelect(groups, name, choices) {
  groups.push({ name, type: "select", proxies: unique(choices) });
}

function addTest(groups, name, choices, interval, tolerance, providerFilter) {
  const group = { name, type: "url-test", proxies: choices, url: CHECK_URL, interval, tolerance };
  if (providerFilter) {
    group["include-all-providers"] = true;
    group.filter = providerFilter;
    group["exclude-filter"] = "(?i)" + BAD_NAME.source + (name === G.other ? "|" + MAIN_REGIONS : "");
    group["empty-fallback"] = "REJECT";
  } else if (!choices.length) {
    group.proxies = ["REJECT"];
  }
  groups.push(group);
}

const main = (config) => {
  if (!config || typeof config !== "object") return config;
  const names = normalizeProxies(config);
  const all = names.filter((n) => !BAD_NAME.test(n));
  const hasProviders = Object.keys(config["proxy-providers"] || {}).length > 0;
  const region = {
    hk: all.filter((n) => /🇭🇰/u.test(n)),
    tw: all.filter((n) => /🇹🇼/u.test(n)),
    cn: all.filter((n) => /🇨🇳|🇭🇰|🇹🇼|🇲🇴/u.test(n)),
    sg: all.filter((n) => /🇸🇬/u.test(n)),
    jp: all.filter((n) => /🇯🇵/u.test(n)),
    us: all.filter((n) => /🇺🇸|🇺🇲/u.test(n))
  };
  const domestic = /🇨🇳|🇭🇰|🇲🇴|🇹🇼|🇸🇬|🇯🇵|🇺🇸|🇺🇲/u;
  region.other = all.filter((n) => !domestic.test(n));
  const providerFilters = {
    hk: "(?i)🇭🇰|香港|港|\\bHK\\b|Hong[ -]?Kong",
    tw: "(?i)🇹🇼|台湾|臺灣|台|\\bTW\\b|Taiwan",
    cn: "(?i)🇨🇳|🇭🇰|🇹🇼|🇲🇴|中国|香港|台湾|臺灣|澳门|澳門|China|Hong[ -]?Kong|Taiwan|Macao",
    sg: "(?i)🇸🇬|新加坡|狮城|獅城|\\bSG\\b|Singapore",
    jp: "(?i)🇯🇵|日本|东京|東京|大阪|\\bJP\\b|Japan|Tokyo|Osaka",
    us: "(?i)🇺🇸|🇺🇲|美国|美國|洛杉矶|纽约|紐約|\\bUS\\b|USA|America|United[ -]?States",
    other: "^.*$"
  };
  const groups = [];
  const available = (keys) => keys.filter((key) => hasProviders || region[key].length).map((key) => G[key]);
  const manualAvailable = (keys) => keys.filter((key) => hasProviders || region[key].length).map((key) => G["m" + key]);
  addSelect(groups, G.main, [G.auto, G.balance, ...available(["hk", "tw", "cn", "sg", "jp", "us", "other"]), G.manual, ...manualAvailable(["hk", "tw", "cn", "sg", "jp", "us", "other"]), "DIRECT"]);
  const serviceChoices = ["us", "other", "hk", "tw", "sg", "jp"];
  for (const service of [G.ai, G.ms]) {
    const choices = [...available(serviceChoices), ...manualAvailable(serviceChoices), G.manual, G.main, G.inside];
    addSelect(groups, service, [service === G.ms ? "DIRECT" : G.main, ...choices]);
  }
  addTest(groups, G.auto, all, 30, 100, hasProviders ? "^.*$" : null);
  const balance = { name: G.balance, type: "load-balance", strategy: "consistent-hashing", proxies: all.length || hasProviders ? all : ["REJECT"], url: CHECK_URL, interval: 30 };
  if (hasProviders) { balance["include-all-providers"] = true; balance["exclude-filter"] = "(?i)" + BAD_NAME.source; balance["empty-fallback"] = "REJECT"; }
  groups.push(balance);
  addSelect(groups, G.inside, ["DIRECT", "REJECT", G.main]);
  addSelect(groups, G.ad, ["REJECT", G.inside, G.main]);
  addSelect(groups, G.final, [G.main, G.inside, G.ad]);
  for (const key of ["hk", "tw", "cn", "sg", "jp", "us", "other"]) {
    if (!hasProviders && !region[key].length) continue;
    addTest(groups, G[key], region[key], key === "other" ? 30 : 15, 500, hasProviders ? providerFilters[key] : null);
  }
  const manual = { name: G.manual, type: "select", proxies: all.length || hasProviders ? all : ["REJECT"] };
  if (hasProviders) { manual["include-all-providers"] = true; manual["exclude-filter"] = "(?i)" + BAD_NAME.source; manual["empty-fallback"] = "REJECT"; }
  groups.push(manual);
  for (const key of ["hk", "tw", "cn", "sg", "jp", "us", "other"]) {
    if (!hasProviders && !region[key].length) continue;
    const manualRegion = { name: G["m" + key], type: "select", proxies: region[key] };
    if (hasProviders) {
      manualRegion["include-all-providers"] = true;
      manualRegion.filter = providerFilters[key];
      manualRegion["exclude-filter"] = "(?i)" + BAD_NAME.source + (key === "other" ? "|" + MAIN_REGIONS : "");
      manualRegion["empty-fallback"] = "REJECT";
    }
    groups.push(manualRegion);
  }
  config["proxy-groups"] = groups;

  const providers = {};
  const rules = ["DOMAIN-SUFFIX,arena.ai,DIRECT", "DOMAIN-SUFFIX,lmarena.ai,DIRECT"];
  for (const [name, url, target] of PROVIDERS) {
    providers["acl4ssr_" + name] = { type: "http", behavior: "classical", format: "text", url, interval: 86400 };
    rules.push(`RULE-SET,acl4ssr_${name},${target}`);
    if (name === "download") rules.push(`GEOIP,LAN,${G.inside}`, `GEOIP,CN,${G.inside}`);
  }
  rules.push(`MATCH,${G.final}`);
  config["rule-providers"] = { ...(config["rule-providers"] || {}), ...providers };
  config.rules = rules;
  return config;
};
