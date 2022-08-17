export function getPageTitle(page) {
    if(!page)
        return "";
        
    return page.title.value || page.name;
}