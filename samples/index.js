import { reload } from "./app";

reload();

if (module.hot) {
	module.hot.accept("./app", () => reload());
}
