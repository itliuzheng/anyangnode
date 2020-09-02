var config = require(`./config`);

exports.settingBanner = function(res,bannerName){
    let index = config.banner.find(item => item.label == bannerName);
    let banners = res.locals.partials.banner.filter(banner=>{
        return banner.typeId.some(item=>item == index.value)
    });
    return banners
    // res.locals.partials.banner = banners;
};