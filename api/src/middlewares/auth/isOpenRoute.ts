interface Route {
    url: string;
    methods: string[];
}

const OpenRoutes: Route[] = [{ url: "/login", methods: ["POST"] }];

export function isOpenRoute(url: string, method?: string): boolean {
    const index = findIndexOfRouteOnOpenRoutes(findRouteWithURL(url));
    if (index === -1) {
        return false;
    }
    if (method) {
        return routeHasMethod(OpenRoutes[index], method);
    }
    return true;
}

type PredicateFn = (value: Route, index: number, obj: Route[]) => unknown;
function findIndexOfRouteOnOpenRoutes(predicateFn: PredicateFn): number {
    return OpenRoutes.findIndex(predicateFn);
}

function findRouteWithURL(url: string) {
    return (route: Route) => route.url === url;
}

function routeHasMethod(route: Route, method: string): boolean {
    return route.methods.includes(method);
}
