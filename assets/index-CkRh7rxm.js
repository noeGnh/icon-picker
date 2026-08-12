const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/style-BIbAYi4N.css"])))=>i.map(i=>d[i]);
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region ../../node_modules/.pnpm/@vue+shared@3.5.41/node_modules/@vue/shared/dist/shared.esm-bundler.js
/**
* @vue/shared v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
	const map = /* @__PURE__ */ Object.create(null);
	for (const key of str.split(",")) map[key] = 1;
	return (val) => val in map;
}
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var NOOP = () => {};
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
	const i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
};
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isDate = (val) => toTypeString(val) === "[object Date]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
	return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
	return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var cacheStringFunction = (fn) => {
	const cache = /* @__PURE__ */ Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
};
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction((str) => {
	return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
	return str ? `on${capitalize(str)}` : ``;
});
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, ...arg) => {
	for (let i = 0; i < fns.length; i++) fns[i](...arg);
};
var def = (obj, key, value, writable = false) => {
	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: false,
		writable,
		value
	});
};
var looseToNumber = (val) => {
	const n = parseFloat(val);
	return isNaN(n) ? val : n;
};
var toNumber = (val) => {
	const n = isString(val) ? Number(val) : NaN;
	return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
	return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
	if (isArray(value)) {
		const res = {};
		for (let i = 0; i < value.length; i++) {
			const item = value[i];
			const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
			if (normalized) for (const key in normalized) res[key] = normalized[key];
		}
		return res;
	} else if (isString(value) || isObject(value)) return value;
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
	const ret = {};
	cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
		if (item) {
			const tmp = item.split(propertyDelimiterRE);
			tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
		}
	});
	return ret;
}
function normalizeClass(value) {
	let res = "";
	if (isString(value)) res = value;
	else if (isArray(value)) for (let i = 0; i < value.length; i++) {
		const normalized = normalizeClass(value[i]);
		if (normalized) res += normalized + " ";
	}
	else if (isObject(value)) {
		for (const name in value) if (value[name]) res += name + " ";
	}
	return res.trim();
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
specialBooleanAttrs + "";
function includeBooleanAttr(value) {
	return !!value || value === "";
}
function looseCompareArrays(a, b) {
	if (a.length !== b.length) return false;
	let equal = true;
	for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i]);
	return equal;
}
function looseEqual(a, b) {
	if (a === b) return true;
	let aValidType = isDate(a);
	let bValidType = isDate(b);
	if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
	aValidType = isSymbol(a);
	bValidType = isSymbol(b);
	if (aValidType || bValidType) return a === b;
	aValidType = isArray(a);
	bValidType = isArray(b);
	if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : false;
	aValidType = isObject(a);
	bValidType = isObject(b);
	if (aValidType || bValidType) {
		if (!aValidType || !bValidType) return false;
		if (Object.keys(a).length !== Object.keys(b).length) return false;
		for (const key in a) {
			const aHasKey = a.hasOwnProperty(key);
			const bHasKey = b.hasOwnProperty(key);
			if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) return false;
		}
	}
	return String(a) === String(b);
}
var isRef$1 = (val) => {
	return !!(val && val["__v_isRef"] === true);
};
var toDisplayString = (val) => {
	return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
	if (isRef$1(val)) return replacer(_key, val.value);
	else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
		entries[stringifySymbol(key, i) + " =>"] = val2;
		return entries;
	}, {}) };
	else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
	else if (isSymbol(val)) return stringifySymbol(val);
	else if (isObject(val) && !isArray(val) && !isPlainObject(val)) return String(val);
	return val;
};
var stringifySymbol = (v, i = "") => {
	var _a;
	return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
function normalizeCssVarValue(value) {
	if (value == null) return "initial";
	if (typeof value === "string") return value === "" ? " " : value;
	if (typeof value !== "number" || !Number.isFinite(value)) {}
	return String(value);
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+reactivity@3.5.41/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
/**
* @vue/reactivity v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var activeEffectScope;
var EffectScope = class {
	constructor(detached = false) {
		this.detached = detached;
		/**
		* @internal
		*/
		this._active = true;
		/**
		* @internal track `on` calls, allow `on` call multiple times
		*/
		this._on = 0;
		/**
		* @internal
		*/
		this.effects = [];
		/**
		* @internal
		*/
		this.cleanups = [];
		this._isPaused = false;
		this._warnOnRun = true;
		this.__v_skip = true;
		if (!detached && activeEffectScope) {
			if (activeEffectScope.active) {
				this.parent = activeEffectScope;
				this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
			} else {
				this._active = false;
				this._warnOnRun = false;
			}
		}
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = true;
			let i, l;
			if (this.scopes) {
				const scopes = this.scopes.slice();
				for (i = 0, l = scopes.length; i < l; i++) scopes[i].pause();
			}
			for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause();
		}
	}
	/**
	* Resumes the effect scope, including all child scopes and effects.
	*/
	resume() {
		if (this._active) {
			if (this._isPaused) {
				this._isPaused = false;
				let i, l;
				if (this.scopes) {
					const scopes = this.scopes.slice();
					for (i = 0, l = scopes.length; i < l; i++) scopes[i].resume();
				}
				const effects = this.effects.slice();
				for (i = 0, l = effects.length; i < l; i++) effects[i].resume();
			}
		}
	}
	run(fn) {
		if (this._active) {
			const currentEffectScope = activeEffectScope;
			try {
				activeEffectScope = this;
				return fn();
			} finally {
				activeEffectScope = currentEffectScope;
			}
		}
	}
	/**
	* This should only be called on non-detached scopes
	* @internal
	*/
	on() {
		if (++this._on === 1) {
			this.prevScope = activeEffectScope;
			activeEffectScope = this;
		}
	}
	/**
	* This should only be called on non-detached scopes
	* @internal
	*/
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (activeEffectScope === this) activeEffectScope = this.prevScope;
			else {
				let current = activeEffectScope;
				while (current) {
					if (current.prevScope === this) {
						current.prevScope = this.prevScope;
						break;
					}
					current = current.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(fromParent) {
		if (this._active) {
			this._active = false;
			let i, l;
			for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
			this.effects.length = 0;
			for (i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
			this.cleanups.length = 0;
			if (this.scopes) {
				const scopes = this.scopes.slice();
				for (i = 0, l = scopes.length; i < l; i++) scopes[i].stop(true);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !fromParent) {
				const last = this.parent.scopes.pop();
				if (last && last !== this) {
					this.parent.scopes[this.index] = last;
					last.index = this.index;
				}
			}
			this.parent = void 0;
		}
	}
};
function getCurrentScope() {
	return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
	if (activeEffectScope) activeEffectScope.cleanups.push(fn);
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
	constructor(fn) {
		this.fn = fn;
		/**
		* @internal
		*/
		this.deps = void 0;
		/**
		* @internal
		*/
		this.depsTail = void 0;
		/**
		* @internal
		*/
		this.flags = 5;
		/**
		* @internal
		*/
		this.next = void 0;
		/**
		* @internal
		*/
		this.cleanup = void 0;
		this.scheduler = void 0;
		if (activeEffectScope) {
			if (activeEffectScope.active) activeEffectScope.effects.push(this);
			else this.flags &= -2;
		}
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		if (this.flags & 64) {
			this.flags &= -65;
			if (pausedQueueEffects.has(this)) {
				pausedQueueEffects.delete(this);
				this.trigger();
			}
		}
	}
	/**
	* @internal
	*/
	notify() {
		if (this.flags & 2 && !(this.flags & 32)) return;
		if (!(this.flags & 8)) batch(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2;
		cleanupEffect(this);
		prepareDeps(this);
		const prevEffect = activeSub;
		const prevShouldTrack = shouldTrack;
		activeSub = this;
		shouldTrack = true;
		try {
			return this.fn();
		} finally {
			cleanupDeps(this);
			activeSub = prevEffect;
			shouldTrack = prevShouldTrack;
			this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let link = this.deps; link; link = link.nextDep) removeSub(link);
			this.deps = this.depsTail = void 0;
			cleanupEffect(this);
			this.onStop && this.onStop();
			this.flags &= -2;
		}
	}
	trigger() {
		if (this.flags & 64) pausedQueueEffects.add(this);
		else if (this.scheduler) this.scheduler();
		else this.runIfDirty();
	}
	/**
	* @internal
	*/
	runIfDirty() {
		if (isDirty(this)) this.run();
	}
	get dirty() {
		return isDirty(this);
	}
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
	sub.flags |= 8;
	if (isComputed) {
		sub.next = batchedComputed;
		batchedComputed = sub;
		return;
	}
	sub.next = batchedSub;
	batchedSub = sub;
}
function startBatch() {
	batchDepth++;
}
function endBatch() {
	if (--batchDepth > 0) return;
	if (batchedComputed) {
		let e = batchedComputed;
		batchedComputed = void 0;
		while (e) {
			const next = e.next;
			e.next = void 0;
			e.flags &= -9;
			e = next;
		}
	}
	let error;
	while (batchedSub) {
		let e = batchedSub;
		batchedSub = void 0;
		while (e) {
			const next = e.next;
			e.next = void 0;
			e.flags &= -9;
			if (e.flags & 1) try {
				e.trigger();
			} catch (err) {
				if (!error) error = err;
			}
			e = next;
		}
	}
	if (error) throw error;
}
function prepareDeps(sub) {
	for (let link = sub.deps; link; link = link.nextDep) {
		link.version = -1;
		link.prevActiveLink = link.dep.activeLink;
		link.dep.activeLink = link;
	}
}
function cleanupDeps(sub) {
	let head;
	let tail = sub.depsTail;
	let link = tail;
	while (link) {
		const prev = link.prevDep;
		if (link.version === -1) {
			if (link === tail) tail = prev;
			removeSub(link);
			removeDep(link);
		} else head = link;
		link.dep.activeLink = link.prevActiveLink;
		link.prevActiveLink = void 0;
		link = prev;
	}
	sub.deps = head;
	sub.depsTail = tail;
}
function isDirty(sub) {
	for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
	if (sub._dirty) return true;
	return false;
}
function refreshComputed(computed) {
	if (computed.flags & 4 && !(computed.flags & 16)) return;
	computed.flags &= -17;
	if (computed.globalVersion === globalVersion) return;
	computed.globalVersion = globalVersion;
	if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) return;
	computed.flags |= 2;
	const dep = computed.dep;
	const prevSub = activeSub;
	const prevShouldTrack = shouldTrack;
	activeSub = computed;
	shouldTrack = true;
	try {
		prepareDeps(computed);
		const value = computed.fn(computed._value);
		if (dep.version === 0 || hasChanged(value, computed._value)) {
			computed.flags |= 128;
			computed._value = value;
			dep.version++;
		}
	} catch (err) {
		dep.version++;
		throw err;
	} finally {
		activeSub = prevSub;
		shouldTrack = prevShouldTrack;
		cleanupDeps(computed);
		computed.flags &= -3;
	}
}
function removeSub(link, soft = false) {
	const { dep, prevSub, nextSub } = link;
	if (prevSub) {
		prevSub.nextSub = nextSub;
		link.prevSub = void 0;
	}
	if (nextSub) {
		nextSub.prevSub = prevSub;
		link.nextSub = void 0;
	}
	if (dep.subs === link) {
		dep.subs = prevSub;
		if (!prevSub && dep.computed) {
			dep.computed.flags &= -5;
			for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, true);
		}
	}
	if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
}
function removeDep(link) {
	const { prevDep, nextDep } = link;
	if (prevDep) {
		prevDep.nextDep = nextDep;
		link.prevDep = void 0;
	}
	if (nextDep) {
		nextDep.prevDep = prevDep;
		link.nextDep = void 0;
	}
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
	trackStack.push(shouldTrack);
	shouldTrack = false;
}
function resetTracking() {
	const last = trackStack.pop();
	shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
	const { cleanup } = e;
	e.cleanup = void 0;
	if (cleanup) {
		const prevSub = activeSub;
		activeSub = void 0;
		try {
			cleanup();
		} finally {
			activeSub = prevSub;
		}
	}
}
var globalVersion = 0;
var Link = class {
	constructor(sub, dep) {
		this.sub = sub;
		this.dep = dep;
		this.version = dep.version;
		this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
};
var Dep = class {
	constructor(computed) {
		this.computed = computed;
		this.version = 0;
		/**
		* Link between this dep and the current active effect
		*/
		this.activeLink = void 0;
		/**
		* Doubly linked list representing the subscribing effects (tail)
		*/
		this.subs = void 0;
		/**
		* For object property deps cleanup
		*/
		this.map = void 0;
		this.key = void 0;
		/**
		* Subscriber counter
		*/
		this.sc = 0;
		/**
		* @internal
		*/
		this.__v_skip = true;
	}
	track(debugInfo) {
		if (!activeSub || !shouldTrack || activeSub === this.computed) return;
		let link = this.activeLink;
		if (link === void 0 || link.sub !== activeSub) {
			link = this.activeLink = new Link(activeSub, this);
			if (!activeSub.deps) activeSub.deps = activeSub.depsTail = link;
			else {
				link.prevDep = activeSub.depsTail;
				activeSub.depsTail.nextDep = link;
				activeSub.depsTail = link;
			}
			addSub(link);
		} else if (link.version === -1) {
			link.version = this.version;
			if (link.nextDep) {
				const next = link.nextDep;
				next.prevDep = link.prevDep;
				if (link.prevDep) link.prevDep.nextDep = next;
				link.prevDep = activeSub.depsTail;
				link.nextDep = void 0;
				activeSub.depsTail.nextDep = link;
				activeSub.depsTail = link;
				if (activeSub.deps === link) activeSub.deps = next;
			}
		}
		return link;
	}
	trigger(debugInfo) {
		this.version++;
		globalVersion++;
		this.notify(debugInfo);
	}
	notify(debugInfo) {
		startBatch();
		try {
			for (let link = this.subs; link; link = link.prevSub) if (link.sub.notify()) link.sub.dep.notify();
		} finally {
			endBatch();
		}
	}
};
function addSub(link) {
	link.dep.sc++;
	if (link.sub.flags & 4) {
		const computed = link.dep.computed;
		if (computed && !link.dep.subs) {
			computed.flags |= 20;
			for (let l = computed.deps; l; l = l.nextDep) addSub(l);
		}
		const currentTail = link.dep.subs;
		if (currentTail !== link) {
			link.prevSub = currentTail;
			if (currentTail) currentTail.nextSub = link;
		}
		link.dep.subs = link;
	}
}
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol("");
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
function track(target, type, key) {
	if (shouldTrack && activeSub) {
		let depsMap = targetMap.get(target);
		if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
		let dep = depsMap.get(key);
		if (!dep) {
			depsMap.set(key, dep = new Dep());
			dep.map = depsMap;
			dep.key = key;
		}
		dep.track();
	}
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
	const depsMap = targetMap.get(target);
	if (!depsMap) {
		globalVersion++;
		return;
	}
	const run = (dep) => {
		if (dep) dep.trigger();
	};
	startBatch();
	if (type === "clear") depsMap.forEach(run);
	else {
		const targetIsArray = isArray(target);
		const isArrayIndex = targetIsArray && isIntegerKey(key);
		if (targetIsArray && key === "length") {
			const newLength = Number(newValue);
			depsMap.forEach((dep, key2) => {
				if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) run(dep);
			});
		} else {
			if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
			if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
			switch (type) {
				case "add":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					} else if (isArrayIndex) run(depsMap.get("length"));
					break;
				case "delete":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					}
					break;
				case "set": if (isMap(target)) run(depsMap.get(ITERATE_KEY));
			}
		}
	}
	endBatch();
}
function getDepFromReactive(object, key) {
	const depMap = targetMap.get(object);
	return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
	const raw = /* @__PURE__ */ toRaw(array);
	if (raw === array) return raw;
	track(raw, "iterate", ARRAY_ITERATE_KEY);
	return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
	track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
	return arr;
}
function toWrapped(target, item) {
	if (/* @__PURE__ */ isReadonly(target)) return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
	return toReactive(item);
}
var arrayInstrumentations = {
	__proto__: null,
	[Symbol.iterator]() {
		return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
	},
	concat(...args) {
		return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
	},
	entries() {
		return iterator(this, "entries", (value) => {
			value[1] = toWrapped(this, value[1]);
			return value;
		});
	},
	every(fn, thisArg) {
		return apply(this, "every", fn, thisArg, void 0, arguments);
	},
	filter(fn, thisArg) {
		return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
	},
	find(fn, thisArg) {
		return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findIndex(fn, thisArg) {
		return apply(this, "findIndex", fn, thisArg, void 0, arguments);
	},
	findLast(fn, thisArg) {
		return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findLastIndex(fn, thisArg) {
		return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
	},
	forEach(fn, thisArg) {
		return apply(this, "forEach", fn, thisArg, void 0, arguments);
	},
	includes(...args) {
		return searchProxy(this, "includes", args);
	},
	indexOf(...args) {
		return searchProxy(this, "indexOf", args);
	},
	join(separator) {
		return reactiveReadArray(this).join(separator);
	},
	lastIndexOf(...args) {
		return searchProxy(this, "lastIndexOf", args);
	},
	map(fn, thisArg) {
		return apply(this, "map", fn, thisArg, void 0, arguments);
	},
	pop() {
		return noTracking(this, "pop");
	},
	push(...args) {
		return noTracking(this, "push", args);
	},
	reduce(fn, ...args) {
		return reduce(this, "reduce", fn, args);
	},
	reduceRight(fn, ...args) {
		return reduce(this, "reduceRight", fn, args);
	},
	shift() {
		return noTracking(this, "shift");
	},
	some(fn, thisArg) {
		return apply(this, "some", fn, thisArg, void 0, arguments);
	},
	splice(...args) {
		return noTracking(this, "splice", args);
	},
	toReversed() {
		return reactiveReadArray(this).toReversed();
	},
	toSorted(comparer) {
		return reactiveReadArray(this).toSorted(comparer);
	},
	toSpliced(...args) {
		return reactiveReadArray(this).toSpliced(...args);
	},
	unshift(...args) {
		return noTracking(this, "unshift", args);
	},
	values() {
		return iterator(this, "values", (item) => toWrapped(this, item));
	}
};
function iterator(self, method, wrapValue) {
	const arr = shallowReadArray(self);
	const iter = arr[method]();
	if (arr !== self && !/* @__PURE__ */ isShallow(self)) {
		iter._next = iter.next;
		iter.next = () => {
			const result = iter._next();
			if (!result.done) result.value = wrapValue(result.value);
			return result;
		};
	}
	return iter;
}
var arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	const methodFn = arr[method];
	if (methodFn !== arrayProto[method]) {
		const result2 = methodFn.apply(self, args);
		return needsWrap ? toReactive(result2) : result2;
	}
	let wrappedFn = fn;
	if (arr !== self) {
		if (needsWrap) wrappedFn = function(item, index) {
			return fn.call(this, toWrapped(self, item), index, self);
		};
		else if (fn.length > 2) wrappedFn = function(item, index) {
			return fn.call(this, item, index, self);
		};
	}
	const result = methodFn.call(arr, wrappedFn, thisArg);
	return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	let wrappedFn = fn;
	let wrapInitialAccumulator = false;
	if (arr !== self) {
		if (needsWrap) {
			wrapInitialAccumulator = args.length === 0;
			wrappedFn = function(acc, item, index) {
				if (wrapInitialAccumulator) {
					wrapInitialAccumulator = false;
					acc = toWrapped(self, acc);
				}
				return fn.call(this, acc, toWrapped(self, item), index, self);
			};
		} else if (fn.length > 3) wrappedFn = function(acc, item, index) {
			return fn.call(this, acc, item, index, self);
		};
	}
	const result = arr[method](wrappedFn, ...args);
	return wrapInitialAccumulator ? toWrapped(self, result) : result;
}
function searchProxy(self, method, args) {
	const arr = /* @__PURE__ */ toRaw(self);
	track(arr, "iterate", ARRAY_ITERATE_KEY);
	const res = arr[method](...args);
	if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
		args[0] = /* @__PURE__ */ toRaw(args[0]);
		return arr[method](...args);
	}
	return res;
}
function noTracking(self, method, args = []) {
	pauseTracking();
	startBatch();
	const res = (/* @__PURE__ */ toRaw(self))[method].apply(self, args);
	endBatch();
	resetTracking();
	return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
function hasOwnProperty(key) {
	if (!isSymbol(key)) key = String(key);
	const obj = /* @__PURE__ */ toRaw(this);
	track(obj, "has", key);
	return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
	constructor(_isReadonly = false, _isShallow = false) {
		this._isReadonly = _isReadonly;
		this._isShallow = _isShallow;
	}
	get(target, key, receiver) {
		if (key === "__v_skip") return target["__v_skip"];
		const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
		if (key === "__v_isReactive") return !isReadonly2;
		else if (key === "__v_isReadonly") return isReadonly2;
		else if (key === "__v_isShallow") return isShallow2;
		else if (key === "__v_raw") {
			if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
			return;
		}
		const targetIsArray = isArray(target);
		if (!isReadonly2) {
			let fn;
			if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
			if (key === "hasOwnProperty") return hasOwnProperty;
		}
		const res = Reflect.get(target, key, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
		if (!isReadonly2) track(target, "get", key);
		if (isShallow2) return res;
		if (/* @__PURE__ */ isRef(res)) {
			const value = targetIsArray && isIntegerKey(key) ? res : res.value;
			return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
		}
		if (isObject(res)) return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
		return res;
	}
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow2 = false) {
		super(false, isShallow2);
	}
	set(target, key, value, receiver) {
		let oldValue = target[key];
		const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
		if (!this._isShallow) {
			const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
			if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
				oldValue = /* @__PURE__ */ toRaw(oldValue);
				value = /* @__PURE__ */ toRaw(value);
			}
			if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
				if (isOldValueReadonly) return true;
				else {
					oldValue.value = value;
					return true;
				}
			}
		}
		const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
		const result = Reflect.set(target, key, value, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (target === /* @__PURE__ */ toRaw(receiver) && result) {
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
		}
		return result;
	}
	deleteProperty(target, key) {
		const hadKey = hasOwn(target, key);
		const oldValue = target[key];
		const result = Reflect.deleteProperty(target, key);
		if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
		return result;
	}
	has(target, key) {
		const result = Reflect.has(target, key);
		if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
		return result;
	}
	ownKeys(target) {
		track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
		return Reflect.ownKeys(target);
	}
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow2 = false) {
		super(true, isShallow2);
	}
	set(target, key) {
		return true;
	}
	deleteProperty(target, key) {
		return true;
	}
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
	return function(...args) {
		const target = this["__v_raw"];
		const rawTarget = /* @__PURE__ */ toRaw(target);
		const targetIsMap = isMap(rawTarget);
		const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
		const isKeyOnly = method === "keys" && targetIsMap;
		const innerIterator = target[method](...args);
		const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
		!isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
		return extend(Object.create(innerIterator), { next() {
			const { value, done } = innerIterator.next();
			return done ? {
				value,
				done
			} : {
				value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
				done
			};
		} });
	};
}
function createReadonlyMethod(type) {
	return function(...args) {
		return type === "delete" ? false : type === "clear" ? void 0 : this;
	};
}
function createInstrumentations(readonly, shallow) {
	const instrumentations = {
		get(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
				track(rawTarget, "get", rawKey);
			}
			const { has } = getProto(rawTarget);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			if (has.call(rawTarget, key)) return wrap(target.get(key));
			else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
			else if (target !== rawTarget) target.get(key);
		},
		get size() {
			const target = this["__v_raw"];
			!readonly && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
			return target.size;
		},
		has(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
				track(rawTarget, "has", rawKey);
			}
			return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
		},
		forEach(callback, thisArg) {
			const observed = this;
			const target = observed["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			!readonly && track(rawTarget, "iterate", ITERATE_KEY);
			return target.forEach((value, key) => {
				return callback.call(thisArg, wrap(value), wrap(key), observed);
			});
		}
	};
	extend(instrumentations, readonly ? {
		add: createReadonlyMethod("add"),
		set: createReadonlyMethod("set"),
		delete: createReadonlyMethod("delete"),
		clear: createReadonlyMethod("clear")
	} : {
		add(value) {
			const target = /* @__PURE__ */ toRaw(this);
			const proto = getProto(target);
			const rawValue = /* @__PURE__ */ toRaw(value);
			const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
			if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
				target.add(valueToAdd);
				trigger(target, "add", valueToAdd, valueToAdd);
			}
			return this;
		},
		set(key, value) {
			if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) value = /* @__PURE__ */ toRaw(value);
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			}
			const oldValue = get.call(target, key);
			target.set(key, value);
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
			return this;
		},
		delete(key) {
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			}
			const oldValue = get ? get.call(target, key) : void 0;
			const result = target.delete(key);
			if (hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		},
		clear() {
			const target = /* @__PURE__ */ toRaw(this);
			const hadItems = target.size !== 0;
			const oldTarget = void 0;
			const result = target.clear();
			if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
			return result;
		}
	});
	[
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((method) => {
		instrumentations[method] = createIterableMethod(method, readonly, shallow);
	});
	return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
	const instrumentations = createInstrumentations(isReadonly2, shallow);
	return (target, key, receiver) => {
		if (key === "__v_isReactive") return !isReadonly2;
		else if (key === "__v_isReadonly") return isReadonly2;
		else if (key === "__v_raw") return target;
		return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
	};
}
var mutableCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, false) };
var shallowCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, true) };
var readonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(true, false) };
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
	switch (rawType) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
	if (/* @__PURE__ */ isReadonly(target)) return target;
	return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
	return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
	return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
	if (!isObject(target)) return target;
	if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
	if (target["__v_skip"] || !Object.isExtensible(target)) return target;
	const existingProxy = proxyMap.get(target);
	if (existingProxy) return existingProxy;
	const targetType = targetTypeMap(toRawType(target));
	if (targetType === 0) return target;
	const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
	proxyMap.set(target, proxy);
	return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
	if (/* @__PURE__ */ isReadonly(value)) return /* @__PURE__ */ isReactive(value["__v_raw"]);
	return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
	return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
	return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
	return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
	const raw = observed && observed["__v_raw"];
	return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
	if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
	return value;
}
var toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
var toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
	return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
	return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
	return createRef(value, true);
}
function createRef(rawValue, shallow) {
	if (/* @__PURE__ */ isRef(rawValue)) return rawValue;
	return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
	constructor(value, isShallow2) {
		this.dep = new Dep();
		this["__v_isRef"] = true;
		this["__v_isShallow"] = false;
		this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
		this._value = isShallow2 ? value : toReactive(value);
		this["__v_isShallow"] = isShallow2;
	}
	get value() {
		this.dep.track();
		return this._value;
	}
	set value(newValue) {
		const oldValue = this._rawValue;
		const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
		newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
		if (hasChanged(newValue, oldValue)) {
			this._rawValue = newValue;
			this._value = useDirectValue ? newValue : toReactive(newValue);
			this.dep.trigger();
		}
	}
};
function unref(ref2) {
	return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
	return isFunction(source) ? source() : unref(source);
}
var shallowUnwrapHandlers = {
	get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
	set: (target, key, value, receiver) => {
		const oldValue = target[key];
		if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
			oldValue.value = value;
			return true;
		} else return Reflect.set(target, key, value, receiver);
	}
};
function proxyRefs(objectWithRefs) {
	return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var ObjectRefImpl = class {
	constructor(_object, key, _defaultValue) {
		this._object = _object;
		this._defaultValue = _defaultValue;
		this["__v_isRef"] = true;
		this._value = void 0;
		this._key = isSymbol(key) ? key : String(key);
		this._raw = /* @__PURE__ */ toRaw(_object);
		let shallow = true;
		let obj = _object;
		if (!isArray(_object) || isSymbol(this._key) || !isIntegerKey(this._key)) do
			shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
		while (shallow && (obj = obj["__v_raw"]));
		this._shallow = shallow;
	}
	get value() {
		let val = this._object[this._key];
		if (this._shallow) val = unref(val);
		return this._value = val === void 0 ? this._defaultValue : val;
	}
	set value(newVal) {
		if (this._shallow && /* @__PURE__ */ isRef(this._raw[this._key])) {
			const nestedRef = this._object[this._key];
			if (/* @__PURE__ */ isRef(nestedRef)) {
				nestedRef.value = newVal;
				return;
			}
		}
		this._object[this._key] = newVal;
	}
	get dep() {
		return getDepFromReactive(this._raw, this._key);
	}
};
var GetterRefImpl = class {
	constructor(_getter) {
		this._getter = _getter;
		this["__v_isRef"] = true;
		this["__v_isReadonly"] = true;
		this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function toRef(source, key, defaultValue) {
	if (/* @__PURE__ */ isRef(source)) return source;
	else if (isFunction(source)) return new GetterRefImpl(source);
	else if (isObject(source) && arguments.length > 1) return propertyToRef(source, key, defaultValue);
	else return /* @__PURE__ */ ref(source);
}
function propertyToRef(source, key, defaultValue) {
	return new ObjectRefImpl(source, key, defaultValue);
}
var ComputedRefImpl = class {
	constructor(fn, setter, isSSR) {
		this.fn = fn;
		this.setter = setter;
		/**
		* @internal
		*/
		this._value = void 0;
		/**
		* @internal
		*/
		this.dep = new Dep(this);
		/**
		* @internal
		*/
		this.__v_isRef = true;
		/**
		* @internal
		*/
		this.deps = void 0;
		/**
		* @internal
		*/
		this.depsTail = void 0;
		/**
		* @internal
		*/
		this.flags = 16;
		/**
		* @internal
		*/
		this.globalVersion = globalVersion - 1;
		/**
		* @internal
		*/
		this.next = void 0;
		this.effect = this;
		this["__v_isReadonly"] = !setter;
		this.isSSR = isSSR;
	}
	/**
	* @internal
	*/
	notify() {
		this.flags |= 16;
		if (!(this.flags & 8) && activeSub !== this) {
			batch(this, true);
			return true;
		}
	}
	get value() {
		const link = this.dep.track();
		refreshComputed(this);
		if (link) link.version = this.dep.version;
		return this._value;
	}
	set value(newValue) {
		if (this.setter) this.setter(newValue);
	}
};
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
	let getter;
	let setter;
	if (isFunction(getterOrOptions)) getter = getterOrOptions;
	else {
		getter = getterOrOptions.get;
		setter = getterOrOptions.set;
	}
	return new ComputedRefImpl(getter, setter, isSSR);
}
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap();
var activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
	if (owner) {
		let cleanups = cleanupMap.get(owner);
		if (!cleanups) cleanupMap.set(owner, cleanups = []);
		cleanups.push(cleanupFn);
	}
}
function watch$1(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, once, scheduler, augmentJob, call } = options;
	const reactiveGetter = (source2) => {
		if (deep) return source2;
		if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
		return traverse(source2);
	};
	let effect;
	let getter;
	let cleanup;
	let boundCleanup;
	let forceTrigger = false;
	let isMultiSource = false;
	if (/* @__PURE__ */ isRef(source)) {
		getter = () => source.value;
		forceTrigger = /* @__PURE__ */ isShallow(source);
	} else if (/* @__PURE__ */ isReactive(source)) {
		getter = () => reactiveGetter(source);
		forceTrigger = true;
	} else if (isArray(source)) {
		isMultiSource = true;
		forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
		getter = () => source.map((s) => {
			if (/* @__PURE__ */ isRef(s)) return s.value;
			else if (/* @__PURE__ */ isReactive(s)) return reactiveGetter(s);
			else if (isFunction(s)) return call ? call(s, 2) : s();
		});
	} else if (isFunction(source)) {
		if (cb) getter = call ? () => call(source, 2) : source;
		else getter = () => {
			if (cleanup) {
				pauseTracking();
				try {
					cleanup();
				} finally {
					resetTracking();
				}
			}
			const currentEffect = activeWatcher;
			activeWatcher = effect;
			try {
				return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
			} finally {
				activeWatcher = currentEffect;
			}
		};
	} else getter = NOOP;
	if (cb && deep) {
		const baseGetter = getter;
		const depth = deep === true ? Infinity : deep;
		getter = () => traverse(baseGetter(), depth);
	}
	const scope = getCurrentScope();
	const watchHandle = () => {
		effect.stop();
		if (scope && scope.active) remove(scope.effects, effect);
	};
	if (once && cb) {
		const _cb = cb;
		cb = (...args) => {
			const res = _cb(...args);
			watchHandle();
			return res;
		};
	}
	let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
	const job = (immediateFirstRun) => {
		if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) return;
		if (cb) {
			const newValue = effect.run();
			if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
				if (cleanup) cleanup();
				const currentWatcher = activeWatcher;
				activeWatcher = effect;
				try {
					const args = [
						newValue,
						oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
						boundCleanup
					];
					oldValue = newValue;
					call ? call(cb, 3, args) : cb(...args);
				} finally {
					activeWatcher = currentWatcher;
				}
			}
		} else effect.run();
	};
	if (augmentJob) augmentJob(job);
	effect = new ReactiveEffect(getter);
	effect.scheduler = scheduler ? () => scheduler(job, false) : job;
	boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
	cleanup = effect.onStop = () => {
		const cleanups = cleanupMap.get(effect);
		if (cleanups) {
			if (call) call(cleanups, 4);
			else for (const cleanup2 of cleanups) cleanup2();
			cleanupMap.delete(effect);
		}
	};
	if (cb) {
		if (immediate) job(true);
		else oldValue = effect.run();
	} else if (scheduler) scheduler(job.bind(null, true), true);
	else effect.run();
	watchHandle.pause = effect.pause.bind(effect);
	watchHandle.resume = effect.resume.bind(effect);
	watchHandle.stop = watchHandle;
	return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
	if (depth <= 0 || !isObject(value) || value["__v_skip"]) return value;
	seen = seen || /* @__PURE__ */ new Map();
	if ((seen.get(value) || 0) >= depth) return value;
	seen.set(value, depth);
	depth--;
	if (/* @__PURE__ */ isRef(value)) traverse(value.value, depth, seen);
	else if (isArray(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);
	else if (isSet(value) || isMap(value)) value.forEach((v) => {
		traverse(v, depth, seen);
	});
	else if (isPlainObject(value)) {
		for (const key in value) traverse(value[key], depth, seen);
		for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse(value[key], depth, seen);
	}
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+runtime-core@3.5.41/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
/**
* @vue/runtime-core v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function callWithErrorHandling(fn, instance, type, args) {
	try {
		return args ? fn(...args) : fn();
	} catch (err) {
		handleError(err, instance, type);
	}
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
	if (isFunction(fn)) {
		const res = callWithErrorHandling(fn, instance, type, args);
		if (res && isPromise(res)) res.catch((err) => {
			handleError(err, instance, type);
		});
		return res;
	}
	if (isArray(fn)) {
		const values = [];
		for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
		return values;
	}
}
function handleError(err, instance, type, throwInDev = true) {
	const contextVNode = instance ? instance.vnode : null;
	const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
	if (instance) {
		let cur = instance.parent;
		const exposedInstance = instance.proxy;
		const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
		while (cur) {
			const errorCapturedHooks = cur.ec;
			if (errorCapturedHooks) {
				for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
			}
			cur = cur.parent;
		}
		if (errorHandler) {
			pauseTracking();
			callWithErrorHandling(errorHandler, null, 10, [
				err,
				exposedInstance,
				errorInfo
			]);
			resetTracking();
			return;
		}
	}
	logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
	if (throwInProd) throw err;
	else console.error(err);
}
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
function nextTick(fn) {
	const p = currentFlushPromise || resolvedPromise;
	return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
	let start = flushIndex + 1;
	let end = queue.length;
	while (start < end) {
		const middle = start + end >>> 1;
		const middleJob = queue[middle];
		const middleJobId = getId(middleJob);
		if (middleJobId < id || middleJobId === id && middleJob.flags & 2) start = middle + 1;
		else end = middle;
	}
	return start;
}
function queueJob(job) {
	if (!(job.flags & 1)) {
		const jobId = getId(job);
		const lastJob = queue[queue.length - 1];
		if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) queue.push(job);
		else queue.splice(findInsertionIndex(jobId), 0, job);
		job.flags |= 1;
		queueFlush();
	}
}
function queueFlush() {
	if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
}
function queuePostFlushCb(cb) {
	if (!isArray(cb)) {
		if (activePostFlushCbs && cb.id === -1) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
		else if (!(cb.flags & 1)) {
			pendingPostFlushCbs.push(cb);
			cb.flags |= 1;
		}
	} else for (let i = 0; i < cb.length; i++) pendingPostFlushCbs.push(cb[i]);
	queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
	for (; i < queue.length; i++) {
		const cb = queue[i];
		if (cb && cb.flags & 2) {
			if (instance && cb.id !== instance.uid) continue;
			queue.splice(i, 1);
			i--;
			if (cb.flags & 4) cb.flags &= -2;
			cb();
			if (!(cb.flags & 4)) cb.flags &= -2;
		}
	}
}
function flushPostFlushCbs(seen) {
	if (pendingPostFlushCbs.length) {
		const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
		pendingPostFlushCbs.length = 0;
		if (activePostFlushCbs) {
			for (let i = 0; i < deduped.length; i++) activePostFlushCbs.push(deduped[i]);
			return;
		}
		activePostFlushCbs = deduped;
		for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
			const cb = activePostFlushCbs[postFlushIndex];
			if (cb.flags & 4) cb.flags &= -2;
			if (!(cb.flags & 8)) cb();
			cb.flags &= -2;
		}
		activePostFlushCbs = null;
		postFlushIndex = 0;
	}
}
var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
	try {
		for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
			const job = queue[flushIndex];
			if (job && !(job.flags & 8)) {
				if (job.flags & 4) job.flags &= -2;
				callWithErrorHandling(job, job.i, job.i ? 15 : 14);
				if (!(job.flags & 4)) job.flags &= -2;
			}
		}
	} finally {
		for (; flushIndex < queue.length; flushIndex++) {
			const job = queue[flushIndex];
			if (job) job.flags &= -2;
		}
		flushIndex = -1;
		queue.length = 0;
		flushPostFlushCbs(seen);
		currentFlushPromise = null;
		if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
	}
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
	const prev = currentRenderingInstance;
	currentRenderingInstance = instance;
	currentScopeId = instance && instance.type.__scopeId || null;
	return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
	if (!ctx) return fn;
	if (fn._n) return fn;
	const renderFnWithContext = (...args) => {
		if (renderFnWithContext._d) setBlockTracking(-1);
		const prevInstance = setCurrentRenderingInstance(ctx);
		const prevStackSize = blockStack.length;
		let res;
		try {
			res = fn(...args);
		} finally {
			for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
			setCurrentRenderingInstance(prevInstance);
			if (renderFnWithContext._d) setBlockTracking(1);
		}
		return res;
	};
	renderFnWithContext._n = true;
	renderFnWithContext._c = true;
	renderFnWithContext._d = true;
	return renderFnWithContext;
}
function withDirectives(vnode, directives) {
	if (currentRenderingInstance === null) return vnode;
	const instance = getComponentPublicInstance(currentRenderingInstance);
	const bindings = vnode.dirs || (vnode.dirs = []);
	for (let i = 0; i < directives.length; i++) {
		let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
		if (dir) {
			if (isFunction(dir)) dir = {
				mounted: dir,
				updated: dir
			};
			if (dir.deep) traverse(value);
			bindings.push({
				dir,
				instance,
				value,
				oldValue: void 0,
				arg,
				modifiers
			});
		}
	}
	return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
	const bindings = vnode.dirs;
	const oldBindings = prevVNode && prevVNode.dirs;
	for (let i = 0; i < bindings.length; i++) {
		const binding = bindings[i];
		if (oldBindings) binding.oldValue = oldBindings[i].value;
		let hook = binding.dir[name];
		if (hook) {
			pauseTracking();
			callWithAsyncErrorHandling(hook, instance, 8, [
				vnode.el,
				binding,
				vnode,
				prevVNode
			]);
			resetTracking();
		}
	}
}
function provide(key, value) {
	if (currentInstance) {
		let provides = currentInstance.provides;
		const parentProvides = currentInstance.parent && currentInstance.parent.provides;
		if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
		provides[key] = value;
	}
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
	const instance = getCurrentInstance();
	if (instance || currentApp) {
		let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
		if (provides && key in provides) return provides[key];
		else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
	}
}
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
var useSSRContext = () => {
	{
		const ctx = inject(ssrContextKey);
		if (!ctx) {}
		return ctx;
	}
};
function watch(source, cb, options) {
	return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, flush, once } = options;
	const baseWatchOptions = extend({}, options);
	const runsImmediately = cb && immediate || !cb && flush !== "post";
	let ssrCleanup;
	if (isInSSRComponentSetup) {
		if (flush === "sync") {
			const ctx = useSSRContext();
			ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
		} else if (!runsImmediately) {
			const watchStopHandle = () => {};
			watchStopHandle.stop = NOOP;
			watchStopHandle.resume = NOOP;
			watchStopHandle.pause = NOOP;
			return watchStopHandle;
		}
	}
	const instance = currentInstance;
	baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
	let isPre = false;
	if (flush === "post") baseWatchOptions.scheduler = (job) => {
		queuePostRenderEffect(job, instance && instance.suspense);
	};
	else if (flush !== "sync") {
		isPre = true;
		baseWatchOptions.scheduler = (job, isFirstRun) => {
			if (isFirstRun) job();
			else queueJob(job);
		};
	}
	baseWatchOptions.augmentJob = (job) => {
		if (cb) job.flags |= 4;
		if (isPre) {
			job.flags |= 2;
			if (instance) {
				job.id = instance.uid;
				job.i = instance;
			}
		}
	};
	const watchHandle = watch$1(source, cb, baseWatchOptions);
	if (isInSSRComponentSetup) {
		if (ssrCleanup) ssrCleanup.push(watchHandle);
		else if (runsImmediately) watchHandle();
	}
	return watchHandle;
}
function instanceWatch(source, value, options) {
	const publicThis = this.proxy;
	const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
	let cb;
	if (isFunction(value)) cb = value;
	else {
		cb = value.handler;
		options = value;
	}
	const reset = setCurrentInstance(this);
	const res = doWatch(getter, cb.bind(publicThis), options);
	reset();
	return res;
}
function createPathGetter(ctx, path) {
	const segments = path.split(".");
	return () => {
		let cur = ctx;
		for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
		return cur;
	};
}
var TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
var isTeleport = (type) => type.__isTeleport;
var leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
var enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
function useTransitionState() {
	const state = {
		isMounted: false,
		isLeaving: false,
		isUnmounting: false,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	onMounted(() => {
		state.isMounted = true;
	});
	onBeforeUnmount(() => {
		state.isUnmounting = true;
	});
	return state;
}
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: TransitionHookValidator,
	onEnter: TransitionHookValidator,
	onAfterEnter: TransitionHookValidator,
	onEnterCancelled: TransitionHookValidator,
	onBeforeLeave: TransitionHookValidator,
	onLeave: TransitionHookValidator,
	onAfterLeave: TransitionHookValidator,
	onLeaveCancelled: TransitionHookValidator,
	onBeforeAppear: TransitionHookValidator,
	onAppear: TransitionHookValidator,
	onAfterAppear: TransitionHookValidator,
	onAppearCancelled: TransitionHookValidator
};
var recursiveGetSubtree = (instance) => {
	const subTree = instance.subTree;
	return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
var BaseTransitionImpl = {
	name: `BaseTransition`,
	props: BaseTransitionPropsValidators,
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const state = useTransitionState();
		return () => {
			const children = slots.default && getTransitionRawChildren(slots.default(), true);
			const child = children && children.length ? findNonCommentChild(children) : instance.subTree ? createCommentVNode() : void 0;
			if (!child) return;
			const rawProps = /* @__PURE__ */ toRaw(props);
			const { mode } = rawProps;
			if (state.isLeaving) return emptyPlaceholder(child);
			const innerChild = getInnerChild$1(child);
			if (!innerChild) return emptyPlaceholder(child);
			let enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance, (hooks) => enterHooks = hooks);
			if (innerChild.type !== Comment) setTransitionHooks(innerChild, enterHooks);
			let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
			if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance).type !== Comment) {
				let leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
				setTransitionHooks(oldInnerChild, leavingHooks);
				if (mode === "out-in" && innerChild.type !== Comment) {
					state.isLeaving = true;
					leavingHooks.afterLeave = () => {
						state.isLeaving = false;
						if (!(instance.job.flags & 8)) instance.update();
						delete leavingHooks.afterLeave;
						oldInnerChild = void 0;
					};
					return emptyPlaceholder(child);
				} else if (mode === "in-out" && innerChild.type !== Comment) leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
					const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
					leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
					el[leaveCbKey] = () => {
						earlyRemove();
						el[leaveCbKey] = void 0;
						delete enterHooks.delayedLeave;
						oldInnerChild = void 0;
					};
					enterHooks.delayedLeave = () => {
						delayedLeave();
						delete enterHooks.delayedLeave;
						oldInnerChild = void 0;
					};
				};
				else oldInnerChild = void 0;
			} else if (oldInnerChild) oldInnerChild = void 0;
			return child;
		};
	}
};
function findNonCommentChild(children) {
	let child = children[0];
	if (children.length > 1) {
		for (const c of children) if (c.type !== Comment) {
			child = c;
			break;
		}
	}
	return child;
}
var BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
	const { leavingVNodes } = state;
	let leavingVNodesCache = leavingVNodes.get(vnode.type);
	if (!leavingVNodesCache) {
		leavingVNodesCache = /* @__PURE__ */ Object.create(null);
		leavingVNodes.set(vnode.type, leavingVNodesCache);
	}
	return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
	const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
	const key = String(vnode.key);
	const leavingVNodesCache = getLeavingNodesForType(state, vnode);
	const callHook = (hook, args) => {
		hook && callWithAsyncErrorHandling(hook, instance, 9, args);
	};
	const callAsyncHook = (hook, args) => {
		const done = args[1];
		callHook(hook, args);
		if (isArray(hook)) {
			if (hook.every((hook2) => hook2.length <= 1)) done();
		} else if (hook.length <= 1) done();
	};
	const hooks = {
		mode,
		persisted,
		beforeEnter(el) {
			let hook = onBeforeEnter;
			if (!state.isMounted) {
				if (appear) hook = onBeforeAppear || onBeforeEnter;
				else return;
			}
			if (el[leaveCbKey]) el[leaveCbKey](true);
			const leavingVNode = leavingVNodesCache[key];
			if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) leavingVNode.el[leaveCbKey]();
			callHook(hook, [el]);
		},
		enter(el) {
			if (leavingVNodesCache[key] === vnode) return;
			let hook = onEnter;
			let afterHook = onAfterEnter;
			let cancelHook = onEnterCancelled;
			if (!state.isMounted) {
				if (appear) {
					hook = onAppear || onEnter;
					afterHook = onAfterAppear || onAfterEnter;
					cancelHook = onAppearCancelled || onEnterCancelled;
				} else return;
			}
			let called = false;
			el[enterCbKey] = (cancelled) => {
				if (called) return;
				called = true;
				if (cancelled) callHook(cancelHook, [el]);
				else callHook(afterHook, [el]);
				if (hooks.delayedLeave) hooks.delayedLeave();
				el[enterCbKey] = void 0;
			};
			const done = el[enterCbKey].bind(null, false);
			if (hook) callAsyncHook(hook, [el, done]);
			else done();
		},
		leave(el, remove) {
			const key2 = String(vnode.key);
			if (el[enterCbKey]) el[enterCbKey](true);
			if (state.isUnmounting) return remove();
			callHook(onBeforeLeave, [el]);
			let called = false;
			el[leaveCbKey] = (cancelled) => {
				if (called) return;
				called = true;
				remove();
				if (cancelled) callHook(onLeaveCancelled, [el]);
				else callHook(onAfterLeave, [el]);
				el[leaveCbKey] = void 0;
				if (leavingVNodesCache[key2] === vnode) delete leavingVNodesCache[key2];
			};
			const done = el[leaveCbKey].bind(null, false);
			leavingVNodesCache[key2] = vnode;
			if (onLeave) callAsyncHook(onLeave, [el, done]);
			else done();
		},
		clone(vnode2) {
			const hooks2 = resolveTransitionHooks(vnode2, props, state, instance, postClone);
			if (postClone) postClone(hooks2);
			return hooks2;
		}
	};
	return hooks;
}
function emptyPlaceholder(vnode) {
	if (isKeepAlive(vnode)) {
		vnode = cloneVNode(vnode);
		vnode.children = null;
		return vnode;
	}
}
function getInnerChild$1(vnode) {
	if (!isKeepAlive(vnode)) {
		if (isTeleport(vnode.type) && vnode.children) return findNonCommentChild(vnode.children);
		return vnode;
	}
	if (vnode.component) return vnode.component.subTree;
	const { shapeFlag, children } = vnode;
	if (children) {
		if (shapeFlag & 16) return children[0];
		if (shapeFlag & 32 && isFunction(children.default)) return children.default();
	}
}
function setTransitionHooks(vnode, hooks) {
	if (vnode.shapeFlag & 6 && vnode.component) {
		vnode.transition = hooks;
		const subTree = vnode.component.subTree;
		setTransitionHooks(isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree, hooks);
	} else if (vnode.shapeFlag & 128) {
		vnode.ssContent.transition = hooks.clone(vnode.ssContent);
		vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
	} else vnode.transition = hooks;
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
	let ret = [];
	let keyedFragmentCount = 0;
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
		if (child.type === Fragment) {
			if (child.patchFlag & 128) keyedFragmentCount++;
			ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
		} else if (keepComment || child.type !== Comment) ret.push(key != null ? cloneVNode(child, { key }) : child);
	}
	if (keyedFragmentCount > 1) for (let i = 0; i < ret.length; i++) ret[i].patchFlag = -2;
	return ret;
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
	return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
}
function markAsyncBoundary(instance) {
	instance.ids = [
		instance.ids[0] + instance.ids[2]++ + "-",
		0,
		0
	];
}
function useTemplateRef(key) {
	const i = getCurrentInstance();
	const r = /* @__PURE__ */ shallowRef(null);
	if (i) {
		const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
		Object.defineProperty(refs, key, {
			enumerable: true,
			get: () => r.value,
			set: (val) => r.value = val
		});
	}
	return r;
}
function isTemplateRefKey(refs, key) {
	let desc;
	return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
var pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
	if (isArray(rawRef)) {
		rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
		return;
	}
	if (isAsyncWrapper(vnode) && !isUnmount) {
		if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
		return;
	}
	const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
	const value = isUnmount ? null : refValue;
	const { i: owner, r: ref } = rawRef;
	const oldRef = oldRawRef && oldRawRef.r;
	const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
	const setupState = owner.setupState;
	const rawSetupState = /* @__PURE__ */ toRaw(setupState);
	const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
		if (isTemplateRefKey(refs, key)) return false;
		return hasOwn(rawSetupState, key);
	};
	const canSetRef = (ref2, key) => {
		if (key && isTemplateRefKey(refs, key)) return false;
		return true;
	};
	if (oldRef != null && oldRef !== ref) {
		invalidatePendingSetRef(oldRawRef);
		if (isString(oldRef)) {
			refs[oldRef] = null;
			if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
		} else if (/* @__PURE__ */ isRef(oldRef)) {
			const oldRawRefAtom = oldRawRef;
			if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
			if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
		}
	}
	if (isFunction(ref)) callWithErrorHandling(ref, owner, 12, [value, refs]);
	else {
		const _isString = isString(ref);
		const _isRef = /* @__PURE__ */ isRef(ref);
		if (_isString || _isRef) {
			const doSet = () => {
				if (rawRef.f) {
					const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !rawRef.k ? ref.value : refs[rawRef.k];
					if (isUnmount) isArray(existing) && remove(existing, refValue);
					else if (!isArray(existing)) {
						if (_isString) {
							refs[ref] = [refValue];
							if (canSetSetupRef(ref)) setupState[ref] = refs[ref];
						} else {
							const newVal = [refValue];
							if (canSetRef(ref, rawRef.k)) ref.value = newVal;
							if (rawRef.k) refs[rawRef.k] = newVal;
						}
					} else if (!existing.includes(refValue)) existing.push(refValue);
				} else if (_isString) {
					refs[ref] = value;
					if (canSetSetupRef(ref)) setupState[ref] = value;
				} else if (_isRef) {
					if (canSetRef(ref, rawRef.k)) ref.value = value;
					if (rawRef.k) refs[rawRef.k] = value;
				}
			};
			if (value) {
				const job = () => {
					doSet();
					pendingSetRefMap.delete(rawRef);
				};
				job.id = -1;
				pendingSetRefMap.set(rawRef, job);
				queuePostRenderEffect(job, parentSuspense);
			} else {
				invalidatePendingSetRef(rawRef);
				doSet();
			}
		}
	}
}
function invalidatePendingSetRef(rawRef) {
	const pendingSetRef = pendingSetRefMap.get(rawRef);
	if (pendingSetRef) {
		pendingSetRef.flags |= 8;
		pendingSetRefMap.delete(rawRef);
	}
}
getGlobalThis().requestIdleCallback;
getGlobalThis().cancelIdleCallback;
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
	registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
	registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
	const wrappedHook = hook.__wdc || (hook.__wdc = () => {
		let current = target;
		while (current) {
			if (current.isDeactivated) return;
			current = current.parent;
		}
		return hook();
	});
	injectHook(type, wrappedHook, target);
	if (target) {
		let current = target.parent;
		while (current && current.parent) {
			if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
			current = current.parent;
		}
	}
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
	const injected = injectHook(type, hook, keepAliveRoot, true);
	onUnmounted(() => {
		remove(keepAliveRoot[type], injected);
	}, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
	if (target) {
		const hooks = target[type] || (target[type] = []);
		const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
			pauseTracking();
			const reset = setCurrentInstance(target);
			const res = callWithAsyncErrorHandling(hook, target, type, args);
			reset();
			resetTracking();
			return res;
		});
		if (prepend) hooks.unshift(wrappedHook);
		else hooks.push(wrappedHook);
		return wrappedHook;
	}
}
var createHook = (lifecycle) => (hook, target = currentInstance) => {
	if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
};
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
	injectHook("ec", hook, target);
}
var COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
	return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
	if (isString(component)) return resolveAsset(COMPONENTS, component, false) || component;
	else return component || NULL_DYNAMIC_COMPONENT;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
	const instance = currentRenderingInstance || currentInstance;
	if (instance) {
		const Component = instance.type;
		if (type === COMPONENTS) {
			const selfName = getComponentName(Component, false);
			if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) return Component;
		}
		const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
		if (!res && maybeSelfReference) return Component;
		return res;
	}
}
function resolve(registry, name) {
	return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
	let ret;
	const cached = cache && cache[index];
	const sourceIsArray = isArray(source);
	if (sourceIsArray || isString(source)) {
		const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
		let needsWrap = false;
		let isReadonlySource = false;
		if (sourceIsReactiveArray) {
			needsWrap = !/* @__PURE__ */ isShallow(source);
			isReadonlySource = /* @__PURE__ */ isReadonly(source);
			source = shallowReadArray(source);
		}
		ret = new Array(source.length);
		for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
	} else if (typeof source === "number") {
		ret = new Array(source);
		for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
	} else if (isObject(source)) {
		if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
		else {
			const keys = Object.keys(source);
			ret = new Array(keys.length);
			for (let i = 0, l = keys.length; i < l; i++) {
				const key = keys[i];
				ret[i] = renderItem(source[key], key, i, cached && cached[i]);
			}
		}
	} else ret = [];
	if (cache) cache[index] = ret;
	return ret;
}
function renderSlot(slots, name, props, fallback, noSlotted, branchKey) {
	if (props == null) props = {};
	if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
		const slotProps = branchKey != null && props.key == null ? extend({}, props, { key: branchKey }) : props;
		const hasProps = Object.keys(slotProps).length > 0;
		if (name !== "default") slotProps.name = name;
		return openBlock(), createBlock(Fragment, null, [createVNode("slot", slotProps, fallback && fallback())], hasProps ? -2 : 64);
	}
	let slot = slots[name];
	if (slot && slot._c) slot._d = false;
	const prevStackSize = blockStack.length;
	openBlock();
	let rendered;
	try {
		const validSlotContent = slot && ensureValidVNode(slot(props));
		const slotKey = props.key || branchKey || validSlotContent && validSlotContent.key;
		rendered = createBlock(Fragment, { key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + (!validSlotContent && fallback ? "_fb" : "") }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
	} catch (err) {
		for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
		throw err;
	} finally {
		if (slot && slot._c) slot._d = true;
	}
	if (!noSlotted && rendered.scopeId) rendered.slotScopeIds = [rendered.scopeId + "-s"];
	return rendered;
}
function ensureValidVNode(vnodes) {
	return vnodes.some((child) => {
		if (!isVNode(child)) return true;
		if (child.type === Comment) return false;
		if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
		return true;
	}) ? vnodes : null;
}
function toHandlers(obj, preserveCaseIfNecessary) {
	const ret = {};
	for (const key in obj) ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
	return ret;
}
var getPublicInstance = (i) => {
	if (!i) return null;
	if (isStatefulComponent(i)) return getComponentPublicInstance(i);
	return getPublicInstance(i.parent);
};
var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
	$: (i) => i,
	$el: (i) => i.vnode.el,
	$data: (i) => i.data,
	$props: (i) => i.props,
	$attrs: (i) => i.attrs,
	$slots: (i) => i.slots,
	$refs: (i) => i.refs,
	$parent: (i) => getPublicInstance(i.parent),
	$root: (i) => getPublicInstance(i.root),
	$host: (i) => i.ce,
	$emit: (i) => i.emit,
	$options: (i) => resolveMergedOptions(i),
	$forceUpdate: (i) => i.f || (i.f = () => {
		queueJob(i.update);
	}),
	$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
	$watch: (i) => instanceWatch.bind(i)
});
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		if (key === "__v_skip") return true;
		const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
		if (key[0] !== "$") {
			const n = accessCache[key];
			if (n !== void 0) switch (n) {
				case 1: return setupState[key];
				case 2: return data[key];
				case 4: return ctx[key];
				case 3: return props[key];
			}
			else if (hasSetupBinding(setupState, key)) {
				accessCache[key] = 1;
				return setupState[key];
			} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
				accessCache[key] = 2;
				return data[key];
			} else if (hasOwn(props, key)) {
				accessCache[key] = 3;
				return props[key];
			} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (shouldCacheAccess) accessCache[key] = 0;
		}
		const publicGetter = publicPropertiesMap[key];
		let cssModule, globalProperties;
		if (publicGetter) {
			if (key === "$attrs") track(instance.attrs, "get", "");
			return publicGetter(instance);
		} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
		else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
			accessCache[key] = 4;
			return ctx[key];
		} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
	},
	set({ _: instance }, key, value) {
		const { data, setupState, ctx } = instance;
		if (hasSetupBinding(setupState, key)) {
			setupState[key] = value;
			return true;
		} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
			data[key] = value;
			return true;
		} else if (hasOwn(instance.props, key)) return false;
		if (key[0] === "$" && key.slice(1) in instance) return false;
		else ctx[key] = value;
		return true;
	},
	has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
		let cssModules;
		return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
	},
	defineProperty(target, key, descriptor) {
		if (descriptor.get != null) target._.accessCache[key] = 0;
		else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
		return Reflect.defineProperty(target, key, descriptor);
	}
};
function useSlots() {
	return getContext("useSlots").slots;
}
function getContext(calledFunctionName) {
	const i = getCurrentInstance();
	return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
	return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
var shouldCacheAccess = true;
function applyOptions(instance) {
	const options = resolveMergedOptions(instance);
	const publicThis = instance.proxy;
	const ctx = instance.ctx;
	shouldCacheAccess = false;
	if (options.beforeCreate) callHook$1(options.beforeCreate, instance, "bc");
	const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
	const checkDuplicateProperties = null;
	if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
	if (methods) for (const key in methods) {
		const methodHandler = methods[key];
		if (isFunction(methodHandler)) ctx[key] = methodHandler.bind(publicThis);
	}
	if (dataOptions) {
		const data = dataOptions.call(publicThis, publicThis);
		if (!isObject(data)) {} else instance.data = /* @__PURE__ */ reactive(data);
	}
	shouldCacheAccess = true;
	if (computedOptions) for (const key in computedOptions) {
		const opt = computedOptions[key];
		const c = computed({
			get: isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
			set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP
		});
		Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => c.value,
			set: (v) => c.value = v
		});
	}
	if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
	if (provideOptions) {
		const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
		Reflect.ownKeys(provides).forEach((key) => {
			provide(key, provides[key]);
		});
	}
	if (created) callHook$1(created, instance, "c");
	function registerLifecycleHook(register, hook) {
		if (isArray(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
		else if (hook) register(hook.bind(publicThis));
	}
	registerLifecycleHook(onBeforeMount, beforeMount);
	registerLifecycleHook(onMounted, mounted);
	registerLifecycleHook(onBeforeUpdate, beforeUpdate);
	registerLifecycleHook(onUpdated, updated);
	registerLifecycleHook(onActivated, activated);
	registerLifecycleHook(onDeactivated, deactivated);
	registerLifecycleHook(onErrorCaptured, errorCaptured);
	registerLifecycleHook(onRenderTracked, renderTracked);
	registerLifecycleHook(onRenderTriggered, renderTriggered);
	registerLifecycleHook(onBeforeUnmount, beforeUnmount);
	registerLifecycleHook(onUnmounted, unmounted);
	registerLifecycleHook(onServerPrefetch, serverPrefetch);
	if (isArray(expose)) {
		if (expose.length) {
			const exposed = instance.exposed || (instance.exposed = {});
			expose.forEach((key) => {
				Object.defineProperty(exposed, key, {
					get: () => publicThis[key],
					set: (val) => publicThis[key] = val,
					enumerable: true
				});
			});
		} else if (!instance.exposed) instance.exposed = {};
	}
	if (render && instance.render === NOOP) instance.render = render;
	if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
	if (components) instance.components = components;
	if (directives) instance.directives = directives;
	if (serverPrefetch) markAsyncBoundary(instance);
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
	if (isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
	for (const key in injectOptions) {
		const opt = injectOptions[key];
		let injected;
		if (isObject(opt)) {
			if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
			else injected = inject(opt.from || key);
		} else injected = inject(opt);
		if (/* @__PURE__ */ isRef(injected)) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => injected.value,
			set: (v) => injected.value = v
		});
		else ctx[key] = injected;
	}
}
function callHook$1(hook, instance, type) {
	callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
	let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
	if (isString(raw)) {
		const handler = ctx[raw];
		if (isFunction(handler)) watch(getter, handler);
	} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
	else if (isObject(raw)) {
		if (isArray(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
		else {
			const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
			if (isFunction(handler)) watch(getter, handler, raw);
		}
	}
}
function resolveMergedOptions(instance) {
	const base = instance.type;
	const { mixins, extends: extendsOptions } = base;
	const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
	const cached = cache.get(base);
	let resolved;
	if (cached) resolved = cached;
	else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
	else {
		resolved = {};
		if (globalMixins.length) globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
		mergeOptions(resolved, base, optionMergeStrategies);
	}
	if (isObject(base)) cache.set(base, resolved);
	return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
	const { mixins, extends: extendsOptions } = from;
	if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
	if (mixins) mixins.forEach((m) => mergeOptions(to, m, strats, true));
	for (const key in from) if (asMixin && key === "expose") {} else {
		const strat = internalOptionMergeStrats[key] || strats && strats[key];
		to[key] = strat ? strat(to[key], from[key]) : from[key];
	}
	return to;
}
var internalOptionMergeStrats = {
	data: mergeDataFn,
	props: mergeEmitsOrPropsOptions,
	emits: mergeEmitsOrPropsOptions,
	methods: mergeObjectOptions,
	computed: mergeObjectOptions,
	beforeCreate: mergeAsArray,
	created: mergeAsArray,
	beforeMount: mergeAsArray,
	mounted: mergeAsArray,
	beforeUpdate: mergeAsArray,
	updated: mergeAsArray,
	beforeDestroy: mergeAsArray,
	beforeUnmount: mergeAsArray,
	destroyed: mergeAsArray,
	unmounted: mergeAsArray,
	activated: mergeAsArray,
	deactivated: mergeAsArray,
	errorCaptured: mergeAsArray,
	serverPrefetch: mergeAsArray,
	components: mergeObjectOptions,
	directives: mergeObjectOptions,
	watch: mergeWatchOptions,
	provide: mergeDataFn,
	inject: mergeInject
};
function mergeDataFn(to, from) {
	if (!from) return to;
	if (!to) return from;
	return function mergedDataFn() {
		return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
	};
}
function mergeInject(to, from) {
	return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
	if (isArray(raw)) {
		const res = {};
		for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
		return res;
	}
	return raw;
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
	return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
	if (to) {
		if (isArray(to) && isArray(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
		return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
	} else return from;
}
function mergeWatchOptions(to, from) {
	if (!to) return from;
	if (!from) return to;
	const merged = extend(/* @__PURE__ */ Object.create(null), to);
	for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
	return merged;
}
function createAppContext() {
	return {
		app: null,
		config: {
			isNativeTag: NO,
			performance: false,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var uid$1 = 0;
function createAppAPI(render, hydrate) {
	return function createApp(rootComponent, rootProps = null) {
		if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
		if (rootProps != null && !isObject(rootProps)) rootProps = null;
		const context = createAppContext();
		const installedPlugins = /* @__PURE__ */ new WeakSet();
		const pluginCleanupFns = [];
		let isMounted = false;
		const app = context.app = {
			_uid: uid$1++,
			_component: rootComponent,
			_props: rootProps,
			_container: null,
			_context: context,
			_instance: null,
			version,
			get config() {
				return context.config;
			},
			set config(v) {},
			use(plugin, ...options) {
				if (installedPlugins.has(plugin)) {} else if (plugin && isFunction(plugin.install)) {
					installedPlugins.add(plugin);
					plugin.install(app, ...options);
				} else if (isFunction(plugin)) {
					installedPlugins.add(plugin);
					plugin(app, ...options);
				}
				return app;
			},
			mixin(mixin) {
				if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
				return app;
			},
			component(name, component) {
				if (!component) return context.components[name];
				context.components[name] = component;
				return app;
			},
			directive(name, directive) {
				if (!directive) return context.directives[name];
				context.directives[name] = directive;
				return app;
			},
			mount(rootContainer, isHydrate, namespace) {
				if (!isMounted) {
					const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
					vnode.appContext = context;
					if (namespace === true) namespace = "svg";
					else if (namespace === false) namespace = void 0;
					if (isHydrate && hydrate) hydrate(vnode, rootContainer);
					else render(vnode, rootContainer, namespace);
					isMounted = true;
					app._container = rootContainer;
					rootContainer.__vue_app__ = app;
					return getComponentPublicInstance(vnode.component);
				}
			},
			onUnmount(cleanupFn) {
				pluginCleanupFns.push(cleanupFn);
			},
			unmount() {
				if (isMounted) {
					callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
					render(null, app._container);
					delete app._container.__vue_app__;
				}
			},
			provide(key, value) {
				context.provides[key] = value;
				return app;
			},
			runWithContext(fn) {
				const lastApp = currentApp;
				currentApp = app;
				try {
					return fn();
				} finally {
					currentApp = lastApp;
				}
			}
		};
		return app;
	};
}
var currentApp = null;
var getModelModifiers = (props, modelName) => {
	return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
	if (instance.isUnmounted) return;
	const props = instance.vnode.props || EMPTY_OBJ;
	let args = rawArgs;
	const isModelListener = event.startsWith("update:");
	const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
	if (modifiers) {
		if (modifiers.trim) args = rawArgs.map((a) => isString(a) ? a.trim() : a);
		if (modifiers.number) args = rawArgs.map(looseToNumber);
	}
	let handlerName;
	let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
	if (!handler && isModelListener) handler = props[handlerName = toHandlerKey(hyphenate(event))];
	if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
	const onceHandler = props[handlerName + `Once`];
	if (onceHandler) {
		if (!instance.emitted) instance.emitted = {};
		else if (instance.emitted[handlerName]) return;
		instance.emitted[handlerName] = true;
		callWithAsyncErrorHandling(onceHandler, instance, 6, args);
	}
}
var mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
	const cached = cache.get(comp);
	if (cached !== void 0) return cached;
	const raw = comp.emits;
	let normalized = {};
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendEmits = (raw2) => {
			const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
			if (normalizedFromExtend) {
				hasExtends = true;
				extend(normalized, normalizedFromExtend);
			}
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
		if (comp.extends) extendEmits(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendEmits);
	}
	if (!raw && !hasExtends) {
		if (isObject(comp)) cache.set(comp, null);
		return null;
	}
	if (isArray(raw)) raw.forEach((key) => normalized[key] = null);
	else extend(normalized, raw);
	if (isObject(comp)) cache.set(comp, normalized);
	return normalized;
}
function isEmitListener(options, key) {
	if (!options || !isOn(key)) return false;
	key = key.slice(2);
	key = key === "Once" ? key : key.replace(/Once$/, "");
	return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function renderComponentRoot(instance) {
	const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
	const prev = setCurrentRenderingInstance(instance);
	let result;
	let fallthroughAttrs;
	try {
		if (vnode.shapeFlag & 4) {
			const proxyToUse = withProxy || proxy;
			const thisProxy = proxyToUse;
			result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
			fallthroughAttrs = attrs;
		} else {
			const render2 = Component;
			result = normalizeVNode(render2.length > 1 ? render2(props, {
				attrs,
				slots,
				emit
			}) : render2(props, null));
			fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
		}
	} catch (err) {
		blockStack.length = 0;
		handleError(err, instance, 1);
		result = createVNode(Comment);
	}
	let root = result;
	if (fallthroughAttrs && inheritAttrs !== false) {
		const keys = Object.keys(fallthroughAttrs);
		const { shapeFlag } = root;
		if (keys.length) {
			if (shapeFlag & 7) {
				if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
				root = cloneVNode(root, fallthroughAttrs, false, true);
			}
		}
	}
	if (vnode.dirs) {
		root = cloneVNode(root, null, false, true);
		root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
	}
	if (vnode.transition) setTransitionHooks(isTeleport(root.type) ? getInnerChild$1(root) || root : root, vnode.transition);
	result = root;
	setCurrentRenderingInstance(prev);
	return result;
}
var getFunctionalFallthrough = (attrs) => {
	let res;
	for (const key in attrs) if (key === "class" || key === "style" || isOn(key)) (res || (res = {}))[key] = attrs[key];
	return res;
};
var filterModelListeners = (attrs, props) => {
	const res = {};
	for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
	return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
	const { props: prevProps, children: prevChildren, component } = prevVNode;
	const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
	const emits = component.emitsOptions;
	if (nextVNode.dirs || nextVNode.transition) return true;
	if (optimized && patchFlag >= 0) {
		if (patchFlag & 1024) return true;
		if (patchFlag & 16) {
			if (!prevProps) return !!nextProps;
			return hasPropsChanged(prevProps, nextProps, emits);
		} else if (patchFlag & 8) {
			const dynamicProps = nextVNode.dynamicProps;
			for (let i = 0; i < dynamicProps.length; i++) {
				const key = dynamicProps[i];
				if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
			}
		}
	} else {
		if (prevChildren || nextChildren) {
			if (!nextChildren || !nextChildren.$stable) return true;
		}
		if (prevProps === nextProps) return false;
		if (!prevProps) return !!nextProps;
		if (!nextProps) return true;
		return hasPropsChanged(prevProps, nextProps, emits);
	}
	return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
	const nextKeys = Object.keys(nextProps);
	if (nextKeys.length !== Object.keys(prevProps).length) return true;
	for (let i = 0; i < nextKeys.length; i++) {
		const key = nextKeys[i];
		if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
	}
	return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
	const nextProp = nextProps[key];
	const prevProp = prevProps[key];
	if (key === "style" && isObject(nextProp) && isObject(prevProp)) return !looseEqual(nextProp, prevProp);
	return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
	while (parent) {
		const root = parent.subTree;
		if (root.suspense && root.suspense.activeBranch === vnode) {
			root.suspense.vnode.el = root.el = el;
			vnode = root;
		}
		if (root === vnode) {
			(vnode = parent.vnode).el = el;
			parent = parent.parent;
		} else break;
	}
	if (suspense && suspense.activeBranch === vnode) suspense.vnode.el = el;
}
var internalObjectProto = {};
var createInternalObject = () => Object.create(internalObjectProto);
var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
	const props = {};
	const attrs = createInternalObject();
	instance.propsDefaults = /* @__PURE__ */ Object.create(null);
	setFullProps(instance, rawProps, props, attrs);
	for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
	if (isStateful) instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
	else if (!instance.type.props) instance.props = attrs;
	else instance.props = props;
	instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
	const { props, attrs, vnode: { patchFlag } } = instance;
	const rawCurrentProps = /* @__PURE__ */ toRaw(props);
	const [options] = instance.propsOptions;
	let hasAttrsChanged = false;
	if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
		if (patchFlag & 8) {
			const propsToUpdate = instance.vnode.dynamicProps;
			for (let i = 0; i < propsToUpdate.length; i++) {
				let key = propsToUpdate[i];
				if (isEmitListener(instance.emitsOptions, key)) continue;
				const value = rawProps[key];
				if (options) {
					if (hasOwn(attrs, key)) {
						if (value !== attrs[key]) {
							attrs[key] = value;
							hasAttrsChanged = true;
						}
					} else {
						const camelizedKey = camelize(key);
						props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
					}
				} else if (value !== attrs[key]) {
					attrs[key] = value;
					hasAttrsChanged = true;
				}
			}
		}
	} else {
		if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
		let kebabKey;
		for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
			if (options) {
				if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
			} else delete props[key];
		}
		if (attrs !== rawCurrentProps) {
			for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
				delete attrs[key];
				hasAttrsChanged = true;
			}
		}
	}
	if (hasAttrsChanged) trigger(instance.attrs, "set", "");
}
function setFullProps(instance, rawProps, props, attrs) {
	const [options, needCastKeys] = instance.propsOptions;
	let hasAttrsChanged = false;
	let rawCastValues;
	if (rawProps) for (let key in rawProps) {
		if (isReservedProp(key)) continue;
		const value = rawProps[key];
		let camelKey;
		if (options && hasOwn(options, camelKey = camelize(key))) {
			if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
			else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
		} else if (!isEmitListener(instance.emitsOptions, key)) {
			if (!(key in attrs) || value !== attrs[key]) {
				attrs[key] = value;
				hasAttrsChanged = true;
			}
		}
	}
	if (needCastKeys) {
		const rawCurrentProps = /* @__PURE__ */ toRaw(props);
		const castValues = rawCastValues || EMPTY_OBJ;
		for (let i = 0; i < needCastKeys.length; i++) {
			const key = needCastKeys[i];
			props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
		}
	}
	return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
	const opt = options[key];
	if (opt != null) {
		const hasDefault = hasOwn(opt, "default");
		if (hasDefault && value === void 0) {
			const defaultValue = opt.default;
			if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
				const { propsDefaults } = instance;
				if (key in propsDefaults) value = propsDefaults[key];
				else {
					const reset = setCurrentInstance(instance);
					value = propsDefaults[key] = defaultValue.call(null, props);
					reset();
				}
			} else value = defaultValue;
			if (instance.ce) instance.ce._setProp(key, value);
		}
		if (opt[0]) {
			if (isAbsent && !hasDefault) value = false;
			else if (opt[1] && (value === "" || value === hyphenate(key))) value = true;
		}
	}
	return value;
}
var mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinPropsCache : appContext.propsCache;
	const cached = cache.get(comp);
	if (cached) return cached;
	const raw = comp.props;
	const normalized = {};
	const needCastKeys = [];
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendProps = (raw2) => {
			hasExtends = true;
			const [props, keys] = normalizePropsOptions(raw2, appContext, true);
			extend(normalized, props);
			if (keys) needCastKeys.push(...keys);
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
		if (comp.extends) extendProps(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendProps);
	}
	if (!raw && !hasExtends) {
		if (isObject(comp)) cache.set(comp, EMPTY_ARR);
		return EMPTY_ARR;
	}
	if (isArray(raw)) for (let i = 0; i < raw.length; i++) {
		const normalizedKey = camelize(raw[i]);
		if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
	}
	else if (raw) for (const key in raw) {
		const normalizedKey = camelize(key);
		if (validatePropName(normalizedKey)) {
			const opt = raw[key];
			const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
			const propType = prop.type;
			let shouldCast = false;
			let shouldCastTrue = true;
			if (isArray(propType)) for (let index = 0; index < propType.length; ++index) {
				const type = propType[index];
				const typeName = isFunction(type) && type.name;
				if (typeName === "Boolean") {
					shouldCast = true;
					break;
				} else if (typeName === "String") shouldCastTrue = false;
			}
			else shouldCast = isFunction(propType) && propType.name === "Boolean";
			prop[0] = shouldCast;
			prop[1] = shouldCastTrue;
			if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
		}
	}
	const res = [normalized, needCastKeys];
	if (isObject(comp)) cache.set(comp, res);
	return res;
}
function validatePropName(key) {
	if (key[0] !== "$" && !isReservedProp(key)) return true;
	return false;
}
var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
	if (rawSlot._n) return rawSlot;
	const normalized = withCtx((...args) => {
		return normalizeSlotValue(rawSlot(...args));
	}, ctx);
	normalized._c = false;
	return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
	const ctx = rawSlots._ctx;
	for (const key in rawSlots) {
		if (isInternalKey(key)) continue;
		const value = rawSlots[key];
		if (isFunction(value)) slots[key] = normalizeSlot(key, value, ctx);
		else if (value != null) {
			const normalized = normalizeSlotValue(value);
			slots[key] = () => normalized;
		}
	}
};
var normalizeVNodeSlots = (instance, children) => {
	const normalized = normalizeSlotValue(children);
	instance.slots.default = () => normalized;
};
var assignSlots = (slots, children, optimized) => {
	for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
};
var initSlots = (instance, children, optimized) => {
	const slots = instance.slots = createInternalObject();
	if (instance.vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			assignSlots(slots, children, optimized);
			if (optimized) def(slots, "_", type, true);
		} else normalizeObjectSlots(children, slots);
	} else if (children) normalizeVNodeSlots(instance, children);
};
var updateSlots = (instance, children, optimized) => {
	const { vnode, slots } = instance;
	let needDeletionCheck = true;
	let deletionComparisonTarget = EMPTY_OBJ;
	if (vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			if (optimized && type === 1) needDeletionCheck = false;
			else assignSlots(slots, children, optimized);
		} else {
			needDeletionCheck = !children.$stable;
			normalizeObjectSlots(children, slots);
		}
		deletionComparisonTarget = children;
	} else if (children) {
		normalizeVNodeSlots(instance, children);
		deletionComparisonTarget = { default: 1 };
	}
	if (needDeletionCheck) {
		for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
	}
};
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
	return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
	const target = getGlobalThis();
	target.__VUE__ = true;
	const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
	const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
		if (n1 === n2) return;
		if (n1 && !isSameVNodeType(n1, n2)) {
			anchor = getNextHostNode(n1);
			unmount(n1, parentComponent, parentSuspense, true);
			n1 = null;
		}
		if (n2.patchFlag === -2) {
			optimized = false;
			n2.dynamicChildren = null;
		}
		const { type, ref, shapeFlag } = n2;
		switch (type) {
			case Text:
				processText(n1, n2, container, anchor);
				break;
			case Comment:
				processCommentNode(n1, n2, container, anchor);
				break;
			case Static:
				if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
				break;
			case Fragment:
				processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				break;
			default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
		}
		if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
		else if (ref == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
	};
	const processText = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
		else {
			const el = n2.el = n1.el;
			if (n2.children !== n1.children) hostSetText(el, n2.children);
		}
	};
	const processCommentNode = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
		else n2.el = n1.el;
	};
	const mountStaticNode = (n2, container, anchor, namespace) => {
		[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
	};
	const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostInsert(el, container, nextSibling);
			el = next;
		}
		hostInsert(anchor, container, nextSibling);
	};
	const removeStaticNode = ({ el, anchor }) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostRemove(el);
			el = next;
		}
		hostRemove(anchor);
	};
	const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		if (n2.type === "svg") namespace = "svg";
		else if (n2.type === "math") namespace = "mathml";
		if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		else {
			const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
			try {
				if (customElement) customElement._beginPatch();
				patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} finally {
				if (customElement) customElement._endPatch();
			}
		}
	};
	const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let el;
		let vnodeHook;
		const { props, shapeFlag, transition, dirs } = vnode;
		el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
		if (shapeFlag & 8) hostSetElementText(el, vnode.children);
		else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
		setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
		if (props) {
			for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
			if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
			if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		}
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
		const needCallTransitionHooks = needTransition(parentSuspense, transition);
		if (needCallTransitionHooks) transition.beforeEnter(el);
		hostInsert(el, container, anchor);
		if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(() => {
			try {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				needCallTransitionHooks && transition.enter(el);
				dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
			} finally {}
		}, parentSuspense);
	};
	const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
		if (scopeId) hostSetScopeId(el, scopeId);
		if (slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
		if (parentComponent) {
			let subTree = parentComponent.subTree;
			if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
				const parentVNode = parentComponent.vnode;
				setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
			}
		}
	};
	const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
		for (let i = start; i < children.length; i++) {
			const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
			patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const el = n2.el = n1.el;
		let { patchFlag, dynamicChildren, dirs } = n2;
		patchFlag |= n1.patchFlag & 16;
		const oldProps = n1.props || EMPTY_OBJ;
		const newProps = n2.props || EMPTY_OBJ;
		let vnodeHook;
		parentComponent && toggleRecurse(parentComponent, false);
		if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
		if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
		parentComponent && toggleRecurse(parentComponent, true);
		if (dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)) {
			patchFlag = 0;
			optimized = false;
			dynamicChildren = null;
		}
		if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
		if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
		else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
		if (patchFlag > 0) {
			if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
			else {
				if (patchFlag & 2) {
					if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
				}
				if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
				if (patchFlag & 8) {
					const propsToUpdate = n2.dynamicProps;
					for (let i = 0; i < propsToUpdate.length; i++) {
						const key = propsToUpdate[i];
						const prev = oldProps[key];
						const next = newProps[key];
						if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
					}
				}
			}
			if (patchFlag & 1) {
				if (n1.children !== n2.children) hostSetElementText(el, n2.children);
			}
		} else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
		if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
		}, parentSuspense);
	};
	const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
		for (let i = 0; i < newChildren.length; i++) {
			const oldVNode = oldChildren[i];
			const newVNode = newChildren[i];
			const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldVNode.el) : fallbackContainer;
			patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
		}
	};
	const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
		if (oldProps !== newProps) {
			if (oldProps !== EMPTY_OBJ) {
				for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
			}
			for (const key in newProps) {
				if (isReservedProp(key)) continue;
				const next = newProps[key];
				const prev = oldProps[key];
				if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
			}
			if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
		}
	};
	const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
		const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
		let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
		if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
		if (n1 == null) {
			hostInsert(fragmentStartAnchor, container, anchor);
			hostInsert(fragmentEndAnchor, container, anchor);
			mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
			if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
		} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
	};
	const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		n2.slotScopeIds = slotScopeIds;
		if (n1 == null) {
			if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
			else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
		} else updateComponent(n1, n2, optimized);
	};
	const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
		const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
		if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
		setupComponent(instance, false, optimized);
		if (instance.asyncDep) {
			parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
			if (!initialVNode.el) {
				const placeholder = instance.subTree = createVNode(Comment);
				processCommentNode(null, placeholder, container, anchor);
				initialVNode.placeholder = placeholder.el;
			}
		} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
	};
	const updateComponent = (n1, n2, optimized) => {
		const instance = n2.component = n1.component;
		if (shouldUpdateComponent(n1, n2, optimized)) {
			if (instance.asyncDep && !instance.asyncResolved) {
				updateComponentPreRender(instance, n2, optimized);
				return;
			} else {
				instance.next = n2;
				instance.update();
			}
		} else {
			n2.el = n1.el;
			instance.vnode = n2;
		}
	};
	const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
		const componentUpdateFn = () => {
			if (!instance.isMounted) {
				let vnodeHook;
				const { el, props } = initialVNode;
				const { bm, m, parent, root, type } = instance;
				const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
				toggleRecurse(instance, false);
				if (bm) invokeArrayFns(bm);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
				toggleRecurse(instance, true);
				if (el && hydrateNode) {
					const hydrateSubTree = () => {
						instance.subTree = renderComponentRoot(instance);
						hydrateNode(el, instance.subTree, instance, parentSuspense, null);
					};
					if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
					else hydrateSubTree();
				} else {
					if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
					const subTree = instance.subTree = renderComponentRoot(instance);
					patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
					initialVNode.el = subTree.el;
				}
				if (m) queuePostRenderEffect(m, parentSuspense);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
					const scopedInitialVNode = initialVNode;
					queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
				}
				if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
				instance.isMounted = true;
				initialVNode = container = anchor = null;
			} else {
				let { next, bu, u, parent, vnode } = instance;
				{
					const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
					if (nonHydratedAsyncRoot) {
						if (next) {
							next.el = vnode.el;
							updateComponentPreRender(instance, next, optimized);
						}
						nonHydratedAsyncRoot.asyncDep.then(() => {
							queuePostRenderEffect(() => {
								if (!instance.isUnmounted) update();
							}, parentSuspense);
						});
						return;
					}
				}
				let originNext = next;
				let vnodeHook;
				toggleRecurse(instance, false);
				if (next) {
					next.el = vnode.el;
					updateComponentPreRender(instance, next, optimized);
				} else next = vnode;
				if (bu) invokeArrayFns(bu);
				if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
				toggleRecurse(instance, true);
				const nextTree = renderComponentRoot(instance);
				const prevTree = instance.subTree;
				instance.subTree = nextTree;
				patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
				next.el = nextTree.el;
				if (originNext === null) updateHOCHostEl(instance, nextTree.el);
				if (u) queuePostRenderEffect(u, parentSuspense);
				if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
			}
		};
		instance.scope.on();
		const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
		instance.scope.off();
		const update = instance.update = effect.run.bind(effect);
		const job = instance.job = effect.runIfDirty.bind(effect);
		job.i = instance;
		job.id = instance.uid;
		effect.scheduler = () => queueJob(job);
		toggleRecurse(instance, true);
		update();
	};
	const updateComponentPreRender = (instance, nextVNode, optimized) => {
		nextVNode.component = instance;
		const prevProps = instance.vnode.props;
		instance.vnode = nextVNode;
		instance.next = null;
		updateProps(instance, nextVNode.props, prevProps, optimized);
		updateSlots(instance, nextVNode.children, optimized);
		pauseTracking();
		flushPreFlushCbs(instance);
		resetTracking();
	};
	const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
		const c1 = n1 && n1.children;
		const prevShapeFlag = n1 ? n1.shapeFlag : 0;
		const c2 = n2.children;
		const { patchFlag, shapeFlag } = n2;
		if (patchFlag > 0) {
			if (patchFlag & 128) {
				patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				return;
			} else if (patchFlag & 256) {
				patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				return;
			}
		}
		if (shapeFlag & 8) {
			if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
			if (c2 !== c1) hostSetElementText(container, c2);
		} else if (prevShapeFlag & 16) {
			if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else unmountChildren(c1, parentComponent, parentSuspense, true);
		} else {
			if (prevShapeFlag & 8) hostSetElementText(container, "");
			if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		c1 = c1 || EMPTY_ARR;
		c2 = c2 || EMPTY_ARR;
		const oldLength = c1.length;
		const newLength = c2.length;
		const commonLength = Math.min(oldLength, newLength);
		let i;
		for (i = 0; i < commonLength; i++) {
			const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
		if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
		else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
	};
	const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let i = 0;
		const l2 = c2.length;
		let e1 = c1.length - 1;
		let e2 = l2 - 1;
		while (i <= e1 && i <= e2) {
			const n1 = c1[i];
			const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			i++;
		}
		while (i <= e1 && i <= e2) {
			const n1 = c1[e1];
			const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			e1--;
			e2--;
		}
		if (i > e1) {
			if (i <= e2) {
				const nextPos = e2 + 1;
				const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
				while (i <= e2) {
					patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					i++;
				}
			}
		} else if (i > e2) while (i <= e1) {
			unmount(c1[i], parentComponent, parentSuspense, true);
			i++;
		}
		else {
			const s1 = i;
			const s2 = i;
			const keyToNewIndexMap = /* @__PURE__ */ new Map();
			for (i = s2; i <= e2; i++) {
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				if (nextChild.key != null) keyToNewIndexMap.set(nextChild.key, i);
			}
			let j;
			let patched = 0;
			const toBePatched = e2 - s2 + 1;
			let moved = false;
			let maxNewIndexSoFar = 0;
			const newIndexToOldIndexMap = new Array(toBePatched);
			for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
			for (i = s1; i <= e1; i++) {
				const prevChild = c1[i];
				if (patched >= toBePatched) {
					unmount(prevChild, parentComponent, parentSuspense, true);
					continue;
				}
				let newIndex;
				if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
				else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
					newIndex = j;
					break;
				}
				if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
				else {
					newIndexToOldIndexMap[newIndex - s2] = i + 1;
					if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
					else moved = true;
					patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					patched++;
				}
			}
			const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
			j = increasingNewIndexSequence.length - 1;
			for (i = toBePatched - 1; i >= 0; i--) {
				const nextIndex = s2 + i;
				const nextChild = c2[nextIndex];
				const anchorVNode = c2[nextIndex + 1];
				const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
				if (newIndexToOldIndexMap[i] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (moved) {
					if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2);
					else j--;
				}
			}
		}
	};
	const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
		const { el, type, transition, children, shapeFlag } = vnode;
		if (shapeFlag & 6) {
			move(vnode.component.subTree, container, anchor, moveType);
			return;
		}
		if (shapeFlag & 128) {
			vnode.suspense.move(container, anchor, moveType);
			return;
		}
		if (shapeFlag & 64) {
			type.move(vnode, container, anchor, internals);
			return;
		}
		if (type === Fragment) {
			hostInsert(el, container, anchor);
			for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
			hostInsert(vnode.anchor, container, anchor);
			return;
		}
		if (type === Static) {
			moveStaticNode(vnode, container, anchor);
			return;
		}
		if (moveType !== 2 && shapeFlag & 1 && transition) {
			if (moveType === 0) {
				if (transition.persisted && !el[leaveCbKey]) hostInsert(el, container, anchor);
				else {
					transition.beforeEnter(el);
					hostInsert(el, container, anchor);
					queuePostRenderEffect(() => transition.enter(el), parentSuspense);
				}
			} else {
				const { leave, delayLeave, afterLeave } = transition;
				const remove2 = () => {
					if (vnode.ctx.isUnmounted) hostRemove(el);
					else hostInsert(el, container, anchor);
				};
				const performLeave = () => {
					const wasLeaving = el._isLeaving || !!el[leaveCbKey];
					if (el._isLeaving) el[leaveCbKey](true);
					if (transition.persisted && !wasLeaving) remove2();
					else leave(el, () => {
						remove2();
						afterLeave && afterLeave();
					});
				};
				if (delayLeave) delayLeave(el, remove2, performLeave);
				else performLeave();
			}
		} else hostInsert(el, container, anchor);
	};
	const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
		const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex, memo } = vnode;
		if (patchFlag === -2) optimized = false;
		if (ref != null) {
			pauseTracking();
			setRef(ref, null, parentSuspense, vnode, true);
			resetTracking();
		}
		if (cacheIndex != null) parentComponent.renderCache[cacheIndex] = void 0;
		if (shapeFlag & 256) {
			parentComponent.ctx.deactivate(vnode);
			return;
		}
		const shouldInvokeDirs = shapeFlag & 1 && dirs;
		const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
		let vnodeHook;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
		else {
			if (shapeFlag & 128) {
				vnode.suspense.unmount(parentSuspense, doRemove);
				return;
			}
			if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
			if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
			else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
			else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
			if (doRemove) remove(vnode);
		}
		const shouldInvalidateMemo = memo != null && cacheIndex == null;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
			shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
			if (shouldInvalidateMemo) vnode.el = null;
		}, parentSuspense);
	};
	const remove = (vnode) => {
		const { type, el, anchor, transition } = vnode;
		if (type === Fragment) {
			removeFragment(el, anchor);
			return;
		}
		if (type === Static) {
			removeStaticNode(vnode);
			return;
		}
		const performRemove = () => {
			hostRemove(el);
			if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
		};
		if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
			const { leave, delayLeave } = transition;
			const performLeave = () => leave(el, performRemove);
			if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
			else performLeave();
		} else performRemove();
	};
	const removeFragment = (cur, end) => {
		let next;
		while (cur !== end) {
			next = hostNextSibling(cur);
			hostRemove(cur);
			cur = next;
		}
		hostRemove(end);
	};
	const unmountComponent = (instance, parentSuspense, doRemove) => {
		const { bum, scope, job, subTree, um, m, a } = instance;
		invalidateMount(m);
		invalidateMount(a);
		if (bum) invokeArrayFns(bum);
		scope.stop();
		if (job) {
			job.flags |= 8;
			unmount(subTree, instance, parentSuspense, doRemove);
		}
		if (um) queuePostRenderEffect(um, parentSuspense);
		queuePostRenderEffect(() => {
			instance.isUnmounted = true;
		}, parentSuspense);
	};
	const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
		for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
	};
	const getNextHostNode = (vnode) => {
		if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
		if (vnode.shapeFlag & 128) return vnode.suspense.next();
		const el = hostNextSibling(vnode.anchor || vnode.el);
		const teleportEnd = el && el[TeleportEndKey];
		return teleportEnd ? hostNextSibling(teleportEnd) : el;
	};
	let isFlushing = false;
	const render = (vnode, container, namespace) => {
		let instance;
		if (vnode == null) {
			if (container._vnode) {
				unmount(container._vnode, null, null, true);
				instance = container._vnode.component;
			}
		} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
		container._vnode = vnode;
		if (!isFlushing) {
			isFlushing = true;
			flushPreFlushCbs(instance);
			flushPostFlushCbs();
			isFlushing = false;
		}
	};
	const internals = {
		p: patch,
		um: unmount,
		m: move,
		r: remove,
		mt: mountComponent,
		mc: mountChildren,
		pc: patchChildren,
		pbc: patchBlockChildren,
		n: getNextHostNode,
		o: options
	};
	let hydrate;
	let hydrateNode;
	if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
	return {
		render,
		hydrate,
		createApp: createAppAPI(render, hydrate)
	};
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
	return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, job }, allowed) {
	if (allowed) {
		effect.flags |= 32;
		job.flags |= 4;
	} else {
		effect.flags &= -33;
		job.flags &= -5;
	}
}
function needTransition(parentSuspense, transition) {
	return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
	const ch1 = n1.children;
	const ch2 = n2.children;
	if (isArray(ch1) && isArray(ch2)) for (let i = 0; i < ch1.length; i++) {
		const c1 = ch1[i];
		let c2 = ch2[i];
		if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
			if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
				c2 = ch2[i] = cloneIfMounted(ch2[i]);
				c2.el = c1.el;
			}
			if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
		}
		if (c2.type === Text) {
			if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
			c2.el = c1.el;
		}
		if (c2.type === Comment && !c2.el) c2.el = c1.el;
	}
}
function getSequence(arr) {
	const p = arr.slice();
	const result = [0];
	let i, j, u, v, c;
	const len = arr.length;
	for (i = 0; i < len; i++) {
		const arrI = arr[i];
		if (arrI !== 0) {
			j = result[result.length - 1];
			if (arr[j] < arrI) {
				p[i] = j;
				result.push(i);
				continue;
			}
			u = 0;
			v = result.length - 1;
			while (u < v) {
				c = u + v >> 1;
				if (arr[result[c]] < arrI) u = c + 1;
				else v = c;
			}
			if (arrI < arr[result[u]]) {
				if (u > 0) p[i] = result[u - 1];
				result[u] = i;
			}
		}
	}
	u = result.length;
	v = result[u - 1];
	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}
	return result;
}
function locateNonHydratedAsyncRoot(instance) {
	const subComponent = instance.subTree.component;
	if (subComponent) {
		if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
		else return locateNonHydratedAsyncRoot(subComponent);
	}
}
function invalidateMount(hooks) {
	if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
	if (anchorVnode.placeholder) return anchorVnode.placeholder;
	const instance = anchorVnode.component;
	if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
	return null;
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
	if (suspense && suspense.pendingBranch) {
		if (isArray(fn)) suspense.effects.push(...fn);
		else suspense.effects.push(fn);
	} else queuePostFlushCb(fn);
}
var Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
var Text = /* @__PURE__ */ Symbol.for("v-txt");
var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
var Static = /* @__PURE__ */ Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
	blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
	blockStack.pop();
	currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
	isBlockTreeEnabled += value;
	if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
}
function setupBlock(vnode) {
	vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
	closeBlock();
	if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
	return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
	return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
	return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
	return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
	return n1.type === n2.type && n1.key === n2.key;
}
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({ ref, ref_key, ref_for }) => {
	if (typeof ref === "number") ref = "" + ref;
	return ref != null ? isString(ref) || /* @__PURE__ */ isRef(ref) || isFunction(ref) ? {
		i: currentRenderingInstance,
		r: ref,
		k: ref_key,
		f: !!ref_for
	} : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
	const vnode = {
		__v_isVNode: true,
		__v_skip: true,
		type,
		props,
		key: props && normalizeKey(props),
		ref: props && normalizeRef(props),
		scopeId: currentScopeId,
		slotScopeIds: null,
		children,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag,
		patchFlag,
		dynamicProps,
		dynamicChildren: null,
		appContext: null,
		ctx: currentRenderingInstance
	};
	if (needFullChildrenNormalization) {
		normalizeChildren(vnode, children);
		if (shapeFlag & 128) type.normalize(vnode);
	} else if (children) vnode.shapeFlag |= isString(children) ? 8 : 16;
	if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
	return vnode;
}
var createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
	if (isVNode(type)) {
		const cloned = cloneVNode(type, props, true);
		if (children) normalizeChildren(cloned, children);
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
			if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
			else currentBlock.push(cloned);
		}
		cloned.patchFlag = -2;
		return cloned;
	}
	if (isClassComponent(type)) type = type.__vccOpts;
	if (props) {
		props = guardReactiveProps(props);
		let { class: klass, style } = props;
		if (klass && !isString(klass)) props.class = normalizeClass(klass);
		if (isObject(style)) {
			if (/* @__PURE__ */ isProxy(style) && !isArray(style)) style = extend({}, style);
			props.style = normalizeStyle(style);
		}
	}
	const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
	return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
	if (!props) return null;
	return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
	const { props, ref, patchFlag, children, transition } = vnode;
	const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	const cloned = {
		__v_isVNode: true,
		__v_skip: true,
		type: vnode.type,
		props: mergedProps,
		key: mergedProps && normalizeKey(mergedProps),
		ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
		scopeId: vnode.scopeId,
		slotScopeIds: vnode.slotScopeIds,
		children,
		target: vnode.target,
		targetStart: vnode.targetStart,
		targetAnchor: vnode.targetAnchor,
		staticCount: vnode.staticCount,
		shapeFlag: vnode.shapeFlag,
		patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
		dynamicProps: vnode.dynamicProps,
		dynamicChildren: vnode.dynamicChildren,
		appContext: vnode.appContext,
		dirs: vnode.dirs,
		transition,
		component: vnode.component,
		suspense: vnode.suspense,
		ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
		ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
		placeholder: vnode.placeholder,
		el: vnode.el,
		anchor: vnode.anchor,
		ctx: vnode.ctx,
		ce: vnode.ce
	};
	if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
	return cloned;
}
function createTextVNode(text = " ", flag = 0) {
	return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
	return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
	if (child == null || typeof child === "boolean") return createVNode(Comment);
	else if (isArray(child)) return createVNode(Fragment, null, child.slice());
	else if (isVNode(child)) return cloneIfMounted(child);
	else return createVNode(Text, null, String(child));
}
function cloneIfMounted(child) {
	return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
	let type = 0;
	const { shapeFlag } = vnode;
	if (children == null) children = null;
	else if (isArray(children)) type = 16;
	else if (typeof children === "object") {
		if (shapeFlag & 65) {
			const slot = children.default;
			if (slot) {
				slot._c && (slot._d = false);
				normalizeChildren(vnode, slot());
				slot._c && (slot._d = true);
			}
			return;
		} else {
			type = 32;
			const slotFlag = children._;
			if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
			else if (slotFlag === 3 && currentRenderingInstance) {
				if (currentRenderingInstance.slots._ === 1) children._ = 1;
				else {
					children._ = 2;
					vnode.patchFlag |= 1024;
				}
			}
		}
	} else if (isFunction(children)) {
		if (shapeFlag & 65) {
			normalizeChildren(vnode, { default: children });
			return;
		}
		children = {
			default: children,
			_ctx: currentRenderingInstance
		};
		type = 32;
	} else {
		children = String(children);
		if (shapeFlag & 64) {
			type = 16;
			children = [createTextVNode(children)];
		} else type = 8;
	}
	vnode.children = children;
	vnode.shapeFlag |= type;
}
function mergeProps(...args) {
	const ret = {};
	for (let i = 0; i < args.length; i++) {
		const toMerge = args[i];
		for (const key in toMerge) if (key === "class") {
			if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
		} else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
		else if (isOn(key)) {
			const existing = ret[key];
			const incoming = toMerge[key];
			if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
			else if (incoming == null && existing == null && !isModelListener(key)) ret[key] = incoming;
		} else if (key !== "") ret[key] = toMerge[key];
	}
	return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
	callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance(vnode, parent, suspense) {
	const type = vnode.type;
	const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
	const instance = {
		uid: uid++,
		vnode,
		type,
		parent,
		appContext,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new EffectScope(true),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: parent ? parent.provides : Object.create(appContext.provides),
		ids: parent ? parent.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: normalizePropsOptions(type, appContext),
		emitsOptions: normalizeEmitsOptions(type, appContext),
		emit: null,
		emitted: null,
		propsDefaults: EMPTY_OBJ,
		inheritAttrs: type.inheritAttrs,
		ctx: EMPTY_OBJ,
		data: EMPTY_OBJ,
		props: EMPTY_OBJ,
		attrs: EMPTY_OBJ,
		slots: EMPTY_OBJ,
		refs: EMPTY_OBJ,
		setupState: EMPTY_OBJ,
		setupContext: null,
		suspense,
		suspenseId: suspense ? suspense.pendingId : 0,
		asyncDep: null,
		asyncResolved: false,
		isMounted: false,
		isUnmounted: false,
		isDeactivated: false,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	instance.ctx = { _: instance };
	instance.root = parent ? parent.root : instance;
	instance.emit = emit.bind(null, instance);
	if (vnode.ce) vnode.ce(instance);
	return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
	const g = getGlobalThis();
	const registerGlobalSetter = (key, setter) => {
		let setters;
		if (!(setters = g[key])) setters = g[key] = [];
		setters.push(setter);
		return (v) => {
			if (setters.length > 1) setters.forEach((set) => set(v));
			else setters[0](v);
		};
	};
	internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
	setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
}
var setCurrentInstance = (instance) => {
	const prev = currentInstance;
	internalSetCurrentInstance(instance);
	instance.scope.on();
	return () => {
		instance.scope.off();
		internalSetCurrentInstance(prev);
	};
};
var unsetCurrentInstance = () => {
	currentInstance && currentInstance.scope.off();
	internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
	return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
	isSSR && setInSSRSetupState(isSSR);
	const { props, children } = instance.vnode;
	const isStateful = isStatefulComponent(instance);
	initProps(instance, props, isStateful, isSSR);
	initSlots(instance, children, optimized || isSSR);
	const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
	isSSR && setInSSRSetupState(false);
	return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
	const Component = instance.type;
	instance.accessCache = /* @__PURE__ */ Object.create(null);
	instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
	const { setup } = Component;
	if (setup) {
		pauseTracking();
		const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
		const reset = setCurrentInstance(instance);
		const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
		const isAsyncSetup = isPromise(setupResult);
		resetTracking();
		reset();
		if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
		if (isAsyncSetup) {
			setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
			if (isSSR) return setupResult.then((resolvedResult) => {
				setInSSRSetupState(true);
				try {
					handleSetupResult(instance, resolvedResult, isSSR);
				} finally {
					setInSSRSetupState(false);
				}
			}).catch((e) => {
				handleError(e, instance, 0);
			});
			else instance.asyncDep = setupResult;
		} else handleSetupResult(instance, setupResult, isSSR);
	} else finishComponentSetup(instance, isSSR);
}
function handleSetupResult(instance, setupResult, isSSR) {
	if (isFunction(setupResult)) {
		if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
		else instance.render = setupResult;
	} else if (isObject(setupResult)) instance.setupState = proxyRefs(setupResult);
	finishComponentSetup(instance, isSSR);
}
var compile;
var installWithProxy;
function finishComponentSetup(instance, isSSR, skipOptions) {
	const Component = instance.type;
	if (!instance.render) {
		if (!isSSR && compile && !Component.render) {
			const template = Component.template || resolveMergedOptions(instance).template;
			if (template) {
				const { isCustomElement, compilerOptions } = instance.appContext.config;
				const { delimiters, compilerOptions: componentCompilerOptions } = Component;
				Component.render = compile(template, extend(extend({
					isCustomElement,
					delimiters
				}, compilerOptions), componentCompilerOptions));
			}
		}
		instance.render = Component.render || NOOP;
		if (installWithProxy) installWithProxy(instance);
	}
	{
		const reset = setCurrentInstance(instance);
		pauseTracking();
		try {
			applyOptions(instance);
		} finally {
			resetTracking();
			reset();
		}
	}
}
var attrsProxyHandlers = { get(target, key) {
	track(target, "get", "");
	return target[key];
} };
function createSetupContext(instance) {
	const expose = (exposed) => {
		instance.exposed = exposed || {};
	};
	return {
		attrs: new Proxy(instance.attrs, attrsProxyHandlers),
		slots: instance.slots,
		emit: instance.emit,
		expose
	};
}
function getComponentPublicInstance(instance) {
	if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
		get(target, key) {
			if (key in target) return target[key];
			else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
		},
		has(target, key) {
			return key in target || key in publicPropertiesMap;
		}
	}));
	else return instance.proxy;
}
function getComponentName(Component, includeInferred = true) {
	return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
	return isFunction(value) && "__vccOpts" in value;
}
var computed = (getterOrOptions, debugOptions) => {
	return /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
	try {
		setBlockTracking(-1);
		const l = arguments.length;
		if (l === 2) {
			if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
				if (isVNode(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
				return createVNode(type, propsOrChildren);
			} else return createVNode(type, null, propsOrChildren);
		} else {
			if (l > 3) children = Array.prototype.slice.call(arguments, 2);
			else if (l === 3 && isVNode(children)) children = [children];
			return createVNode(type, propsOrChildren, children);
		}
	} finally {
		setBlockTracking(1);
	}
}
var version = "3.5.41";
//#endregion
//#region ../../node_modules/.pnpm/@vue+runtime-dom@3.5.41/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
/**
* @vue/runtime-dom v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var policy = void 0;
var tt$1 = typeof window !== "undefined" && window.trustedTypes;
if (tt$1) try {
	policy = /* @__PURE__ */ tt$1.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
	insert: (child, parent, anchor) => {
		parent.insertBefore(child, anchor || null);
	},
	remove: (child) => {
		const parent = child.parentNode;
		if (parent) parent.removeChild(child);
	},
	createElement: (tag, namespace, is, props) => {
		const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
		return el;
	},
	createText: (text) => doc.createTextNode(text),
	createComment: (text) => doc.createComment(text),
	setText: (node, text) => {
		node.nodeValue = text;
	},
	setElementText: (el, text) => {
		el.textContent = text;
	},
	parentNode: (node) => node.parentNode,
	nextSibling: (node) => node.nextSibling,
	querySelector: (selector) => doc.querySelector(selector),
	setScopeId(el, id) {
		el.setAttribute(id, "");
	},
	insertStaticContent(content, parent, anchor, namespace, start, end) {
		const before = anchor ? anchor.previousSibling : parent.lastChild;
		if (start && (start === end || start.nextSibling)) while (true) {
			parent.insertBefore(start.cloneNode(true), anchor);
			if (start === end || !(start = start.nextSibling)) break;
		}
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
			const template = templateContainer.content;
			if (namespace === "svg" || namespace === "mathml") {
				const wrapper = template.firstChild;
				while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
				template.removeChild(wrapper);
			}
			parent.insertBefore(template, anchor);
		}
		return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
	}
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
var DOMTransitionPropsValidators = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: true
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
};
var TransitionPropsValidators = /* @__PURE__ */ extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var decorate$1 = (t) => {
	t.displayName = "Transition";
	t.props = TransitionPropsValidators;
	return t;
};
var Transition = /* @__PURE__ */ decorate$1((props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots));
var callHook = (hook, args = []) => {
	if (isArray(hook)) hook.forEach((h2) => h2(...args));
	else if (hook) hook(...args);
};
var hasExplicitCallback = (hook) => {
	return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
	const baseProps = {};
	for (const key in rawProps) if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
	if (rawProps.css === false) return baseProps;
	const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
	const durations = normalizeDuration(duration);
	const enterDuration = durations && durations[0];
	const leaveDuration = durations && durations[1];
	const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
	const finishEnter = (el, isAppear, done, isCancelled) => {
		el._enterCancelled = isCancelled;
		removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
		removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
		done && done();
	};
	const finishLeave = (el, done) => {
		el._isLeaving = false;
		removeTransitionClass(el, leaveFromClass);
		removeTransitionClass(el, leaveToClass);
		removeTransitionClass(el, leaveActiveClass);
		done && done();
	};
	const makeEnterHook = (isAppear) => {
		return (el, done) => {
			const hook = isAppear ? onAppear : onEnter;
			const resolve = () => finishEnter(el, isAppear, done);
			callHook(hook, [el, resolve]);
			nextFrame(() => {
				removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
				addTransitionClass(el, isAppear ? appearToClass : enterToClass);
				if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
			});
		};
	};
	return extend(baseProps, {
		onBeforeEnter(el) {
			callHook(onBeforeEnter, [el]);
			addTransitionClass(el, enterFromClass);
			addTransitionClass(el, enterActiveClass);
		},
		onBeforeAppear(el) {
			callHook(onBeforeAppear, [el]);
			addTransitionClass(el, appearFromClass);
			addTransitionClass(el, appearActiveClass);
		},
		onEnter: makeEnterHook(false),
		onAppear: makeEnterHook(true),
		onLeave(el, done) {
			el._isLeaving = true;
			const resolve = () => finishLeave(el, done);
			addTransitionClass(el, leaveFromClass);
			if (!el._enterCancelled) {
				forceReflow(el);
				addTransitionClass(el, leaveActiveClass);
			} else {
				addTransitionClass(el, leaveActiveClass);
				forceReflow(el);
			}
			nextFrame(() => {
				if (!el._isLeaving) return;
				removeTransitionClass(el, leaveFromClass);
				addTransitionClass(el, leaveToClass);
				if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
			});
			callHook(onLeave, [el, resolve]);
		},
		onEnterCancelled(el) {
			finishEnter(el, false, void 0, true);
			callHook(onEnterCancelled, [el]);
		},
		onAppearCancelled(el) {
			finishEnter(el, true, void 0, true);
			callHook(onAppearCancelled, [el]);
		},
		onLeaveCancelled(el) {
			finishLeave(el);
			callHook(onLeaveCancelled, [el]);
		}
	});
}
function normalizeDuration(duration) {
	if (duration == null) return null;
	else if (isObject(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
	else {
		const n = NumberOf(duration);
		return [n, n];
	}
}
function NumberOf(val) {
	return toNumber(val);
}
function addTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
	(el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
	const _vtc = el[vtcKey];
	if (_vtc) {
		_vtc.delete(cls);
		if (!_vtc.size) el[vtcKey] = void 0;
	}
}
function nextFrame(cb) {
	requestAnimationFrame(() => {
		requestAnimationFrame(cb);
	});
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
	const id = el._endId = ++endId;
	const resolveIfNotStale = () => {
		if (id === el._endId) resolve();
	};
	if (explicitTimeout != null) return setTimeout(resolveIfNotStale, explicitTimeout);
	const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
	if (!type) return resolve();
	const endEvent = type + "end";
	let ended = 0;
	const end = () => {
		el.removeEventListener(endEvent, onEnd);
		resolveIfNotStale();
	};
	const onEnd = (e) => {
		if (e.target === el && ++ended >= propCount) end();
	};
	setTimeout(() => {
		if (ended < propCount) end();
	}, timeout + 1);
	el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
	const styles = window.getComputedStyle(el);
	const getStyleProperties = (key) => (styles[key] || "").split(", ");
	const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
	const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
	const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
	const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
	const animationTimeout = getTimeout(animationDelays, animationDurations);
	let type = null;
	let timeout = 0;
	let propCount = 0;
	if (expectedType === TRANSITION) {
		if (transitionTimeout > 0) {
			type = TRANSITION;
			timeout = transitionTimeout;
			propCount = transitionDurations.length;
		}
	} else if (expectedType === ANIMATION) {
		if (animationTimeout > 0) {
			type = ANIMATION;
			timeout = animationTimeout;
			propCount = animationDurations.length;
		}
	} else {
		timeout = Math.max(transitionTimeout, animationTimeout);
		type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
		propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
	}
	const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
	return {
		type,
		timeout,
		propCount,
		hasTransform
	};
}
function getTimeout(delays, durations) {
	while (delays.length < durations.length) delays = delays.concat(delays);
	return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
	if (s === "auto") return 0;
	return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
	return (el ? el.ownerDocument : document).body.offsetHeight;
}
function patchClass(el, value, isSVG) {
	const transitionClasses = el[vtcKey];
	if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
	if (value == null) el.removeAttribute("class");
	else if (isSVG) el.setAttribute("class", value);
	else el.className = value;
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var vShow = {
	name: "show",
	beforeMount(el, { value }, { transition }) {
		el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		if (transition && value) transition.beforeEnter(el);
		else setDisplay(el, value);
	},
	mounted(el, { value }, { transition }) {
		if (transition && value) transition.enter(el);
	},
	updated(el, { value, oldValue }, { transition }) {
		if (!value === !oldValue) return;
		if (transition) {
			if (value) {
				transition.beforeEnter(el);
				setDisplay(el, true);
				transition.enter(el);
			} else transition.leave(el, () => {
				setDisplay(el, false);
			});
		} else setDisplay(el, value);
	},
	beforeUnmount(el, { value }) {
		setDisplay(el, value);
	}
};
function setDisplay(el, value) {
	el.style.display = value ? el[vShowOriginalDisplay] : "none";
	el[vShowHidden] = !value;
}
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
function useCssVars(getter) {
	const instance = getCurrentInstance();
	if (!instance) return;
	const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)).forEach((node) => setVarsOnNode(node, vars));
	};
	const setVars = () => {
		const vars = getter(instance.proxy);
		if (instance.ce) setVarsOnNode(instance.ce, vars);
		else setVarsOnVNode(instance.subTree, vars);
		updateTeleports(vars);
	};
	onBeforeUpdate(() => {
		queuePostFlushCb(setVars);
	});
	onMounted(() => {
		watch(setVars, NOOP, { flush: "post" });
		const ob = new MutationObserver(setVars);
		ob.observe(instance.subTree.el.parentNode, { childList: true });
		onUnmounted(() => ob.disconnect());
	});
}
function setVarsOnVNode(vnode, vars) {
	if (vnode.shapeFlag & 128) {
		const suspense = vnode.suspense;
		vnode = suspense.activeBranch;
		if (suspense.pendingBranch && !suspense.isHydrating) suspense.effects.push(() => {
			setVarsOnVNode(suspense.activeBranch, vars);
		});
	}
	while (vnode.component) vnode = vnode.component.subTree;
	if (vnode.shapeFlag & 1 && vnode.el) setVarsOnNode(vnode.el, vars);
	else if (vnode.type === Fragment) vnode.children.forEach((c) => setVarsOnVNode(c, vars));
	else if (vnode.type === Static) {
		let { el, anchor } = vnode;
		while (el) {
			setVarsOnNode(el, vars);
			if (el === anchor) break;
			el = el.nextSibling;
		}
	}
}
function setVarsOnNode(el, vars) {
	if (el.nodeType === 1) {
		const style = el.style;
		let cssText = "";
		for (const key in vars) {
			const value = normalizeCssVarValue(vars[key]);
			style.setProperty(`--${key}`, value);
			cssText += `--${key}: ${value};`;
		}
		style[CSS_VAR_TEXT] = cssText;
	}
}
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
	const style = el.style;
	const isCssString = isString(next);
	let hasControlledDisplay = false;
	if (next && !isCssString) {
		if (prev) {
			if (!isString(prev)) {
				for (const key in prev) if (next[key] == null) setStyle(style, key, "");
			} else for (const prevStyle of prev.split(";")) {
				const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
				if (next[key] == null) setStyle(style, key, "");
			}
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
			} else setStyle(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = next;
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) el.removeAttribute("style");
	if (vShowOriginalDisplay in el) {
		el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
	if (isArray(val)) val.forEach((v) => setStyle(style, name, v));
	else {
		if (val == null) val = "";
		if (name.startsWith("--")) style.setProperty(name, val);
		else {
			const prefixed = autoPrefix(style, name);
			if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
			else style[prefixed] = val;
		}
	}
}
var prefixes = [
	"Webkit",
	"Moz",
	"ms"
];
var prefixCache = {};
function autoPrefix(style, rawName) {
	const cached = prefixCache[rawName];
	if (cached) return cached;
	let name = camelize(rawName);
	if (name !== "filter" && name in style) return prefixCache[rawName] = name;
	name = capitalize(name);
	for (let i = 0; i < prefixes.length; i++) {
		const prefixed = prefixes[i] + name;
		if (prefixed in style) return prefixCache[rawName] = prefixed;
	}
	return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
	return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
	if (isSVG && key.startsWith("xlink:")) {
		if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
		else el.setAttributeNS(xlinkNS, key, value);
	} else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
	else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
	if (key === "innerHTML" || key === "textContent") {
		if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		return;
	}
	const tag = el.tagName;
	if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
		const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
		if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
		if (value == null) el.removeAttribute(key);
		el._value = value;
		return;
	}
	let needRemove = false;
	if (value === "" || value == null) {
		const type = typeof el[key];
		if (type === "boolean") value = includeBooleanAttr(value);
		else if (value == null && type === "string") {
			value = "";
			needRemove = true;
		} else if (type === "number") {
			value = 0;
			needRemove = true;
		}
	}
	try {
		el[key] = value;
	} catch (e) {}
	needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = nextValue;
	else {
		const [name, options] = parseName(rawName);
		if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
		else if (existingInvoker) {
			removeEventListener(el, name, existingInvoker, options);
			invokers[rawName] = void 0;
		}
	}
}
var optionsModifierRE = /(Once|Passive|Capture)$/;
var optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseName(name) {
	let options;
	let m;
	while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
		if (!options) options = {};
		name = name.slice(0, name.length - m[1].length);
		options[m[1].toLowerCase()] = true;
	}
	return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
}
var cachedNow = 0;
var p = /* @__PURE__ */ Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
	const invoker = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= invoker.attached) return;
		const value = invoker.value;
		if (isArray(value)) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
			const handlers = value.slice();
			const args = [e];
			for (let i = 0; i < handlers.length; i++) {
				if (e._stopped) break;
				const handler = handlers[i];
				if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
			}
		} else callWithAsyncErrorHandling(value, instance, 5, [e]);
	};
	invoker.value = initialValue;
	invoker.attached = getNow();
	return invoker;
}
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
	const isSVG = namespace === "svg";
	if (key === "class") patchClass(el, nextValue, isSVG);
	else if (key === "style") patchStyle(el, prevValue, nextValue);
	else if (isOn(key)) {
		if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
	} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		patchDOMProp(el, key, nextValue);
		if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
	else {
		if (key === "true-value") el._trueValue = nextValue;
		else if (key === "false-value") el._falseValue = nextValue;
		patchAttr(el, key, nextValue, isSVG);
	}
};
function shouldSetAsProp(el, key, value, isSVG) {
	if (isSVG) {
		if (key === "innerHTML" || key === "textContent") return true;
		if (key in el && isNativeOn(key) && isFunction(value)) return true;
		return false;
	}
	if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
	if (key === "sandbox" && el.tagName === "IFRAME") return false;
	if (key === "form") return false;
	if (key === "list" && el.tagName === "INPUT") return false;
	if (key === "type" && el.tagName === "TEXTAREA") return false;
	if (key === "width" || key === "height") {
		const tag = el.tagName;
		if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
	}
	if (isNativeOn(key) && isString(value)) return false;
	return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
	const props = el._def.props;
	if (!props) return false;
	const camelKey = camelize(key);
	return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
var getModelAssigner = (vnode) => {
	const fn = vnode.props["onUpdate:modelValue"] || false;
	return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
	e.target.composing = true;
}
function onCompositionEnd(e) {
	const target = e.target;
	if (target.composing) {
		target.composing = false;
		target.dispatchEvent(new Event("input"));
	}
}
var assignKey = /* @__PURE__ */ Symbol("_assign");
var initialValueKey = /* @__PURE__ */ Symbol("_initialValue");
function castValue(value, trim, number) {
	if (trim) value = value.trim();
	if (number) value = looseToNumber(value);
	return value;
}
var vModelText = {
	created(el, { modifiers: { lazy, trim, number } }, vnode) {
		if (el.parentNode) {
			if (el.type === "text") el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
			else if (el.type === "textarea") el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
		}
		el[assignKey] = getModelAssigner(vnode);
		const castToNumber = number || vnode.props && vnode.props.type === "number";
		addEventListener(el, lazy ? "change" : "input", (e) => {
			if (e.target.composing) return;
			el[assignKey](castValue(el.value, trim, castToNumber));
		});
		if (trim || castToNumber) addEventListener(el, "change", () => {
			el.value = castValue(el.value, trim, castToNumber);
		});
		if (!lazy) {
			addEventListener(el, "compositionstart", onCompositionStart);
			addEventListener(el, "compositionend", onCompositionEnd);
			addEventListener(el, "change", onCompositionEnd);
		}
	},
	mounted(el, { value, modifiers: { trim, number } }) {
		const newValue = value == null ? "" : value;
		const initialValue = el[initialValueKey];
		delete el[initialValueKey];
		if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) el[assignKey](castValue(el.value, trim, number));
		else el.value = newValue;
	},
	beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		if (el.composing) return;
		const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
		const newValue = value == null ? "" : value;
		if (elValue === newValue) return;
		const rootNode = el.getRootNode();
		if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
			if (lazy && value === oldValue) return;
			if (trim && el.value.trim() === newValue) return;
		}
		el.value = newValue;
	}
};
var systemModifiers = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
var modifierGuards = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
	if (!fn) return fn;
	const cache = fn._withMods || (fn._withMods = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
		for (let i = 0; i < modifiers.length; i++) {
			const guard = modifierGuards[modifiers[i]];
			if (guard && guard(event, modifiers)) return;
		}
		return fn(event, ...args);
	}));
};
var keyNames = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
};
var withKeys = (fn, modifiers) => {
	const cache = fn._withKeys || (fn._withKeys = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event) => {
		if (!("key" in event)) return;
		const eventKey = hyphenate(event.key);
		if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
	}));
};
var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
var renderer;
function ensureRenderer() {
	return renderer || (renderer = createRenderer(rendererOptions));
}
var createApp = ((...args) => {
	const app = ensureRenderer().createApp(...args);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (!container) return;
		const component = app._component;
		if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
		if (container.nodeType === 1) container.textContent = "";
		const proxy = mount(container, false, resolveRootNamespace(container));
		if (container instanceof Element) {
			container.removeAttribute("v-cloak");
			container.setAttribute("data-v-app", "");
		}
		return proxy;
	};
	return app;
});
function resolveRootNamespace(container) {
	if (container instanceof SVGElement) return "svg";
	if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
function normalizeContainer(container) {
	if (isString(container)) return document.querySelector(container);
	return container;
}
//#endregion
//#region ../vue3-icon-picker/dist/index.mjs
var W = "https://api.iconify.design";
var Y = [
	"tabler",
	"carbon",
	"fa",
	"fluent",
	"ion",
	"material-symbols",
	"ant-design"
];
var G = 64;
async function q(e, t = {}) {
	const { limit: n, apiBase: o = W } = t;
	try {
		const t = await (await fetch(`${o}/collection?prefix=${encodeURIComponent(e)}`)).json(), r = [...t.uncategorized ?? [], ...Object.values(t.categories ?? {}).flat()];
		return ("number" == typeof n ? r.slice(0, n) : r).map((t) => ({
			name: `${e}:${t}`,
			prefix: e,
			icon: t
		}));
	} catch (r) {
		return console.error(`Failed to browse collection ${e}`, r), [];
	}
}
function X(e, t, n) {
	return n ? Array.isArray(e) && e.includes(t) : e === t;
}
function K(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0, o = Array(t); n < t; n++) o[n] = e[n];
	return o;
}
function Q(e, t) {
	return function(e) {
		if (Array.isArray(e)) return e;
	}(e) || function(e, t) {
		var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (null != n) {
			var o, r, i, l, a = [], s = !0, c = !1;
			try {
				if (i = (n = n.call(e)).next, 0 === t);
				else for (; !(s = (o = i.call(n)).done) && (a.push(o.value), a.length !== t); s = !0);
			} catch (e) {
				c = !0, r = e;
			} finally {
				try {
					if (!s && null != n.return && (l = n.return(), Object(l) !== l)) return;
				} finally {
					if (c) throw r;
				}
			}
			return a;
		}
	}(e, t) || function(e, t) {
		if (e) {
			if ("string" == typeof e) return K(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? K(e, t) : void 0;
		}
	}(e, t) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var Z = Object.entries;
var J = Object.setPrototypeOf;
var ee = Object.isFrozen;
var te = Object.getPrototypeOf;
var ne = Object.getOwnPropertyDescriptor;
var oe = Object.freeze;
var re = Object.seal;
var ie = Object.create;
var le = "undefined" != typeof Reflect && Reflect;
var ae = le.apply;
var se = le.construct;
oe || (oe = function(e) {
	return e;
}), re || (re = function(e) {
	return e;
}), ae || (ae = function(e, t) {
	for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) o[r - 2] = arguments[r];
	return e.apply(t, o);
}), se || (se = function(e) {
	for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
	return new e(...n);
});
var ce;
var ue = ze(Array.prototype.forEach);
var de = ze(Array.prototype.lastIndexOf);
var fe = ze(Array.prototype.pop);
var pe = ze(Array.prototype.push);
var me = ze(Array.prototype.splice);
var he = Array.isArray;
var ve = ze(String.prototype.toLowerCase);
var ge = ze(String.prototype.toString);
var ye = ze(String.prototype.match);
var be = ze(String.prototype.replace);
var we = ze(String.prototype.indexOf);
var xe = ze(String.prototype.trim);
var Se = ze(Number.prototype.toString);
var Te = ze(Boolean.prototype.toString);
var Ie = "undefined" == typeof BigInt ? null : ze(BigInt.prototype.toString);
var ke = "undefined" == typeof Symbol ? null : ze(Symbol.prototype.toString);
var Ee = ze(Object.prototype.hasOwnProperty);
var _e = ze(Object.prototype.toString);
var Ae = ze(RegExp.prototype.test);
var Ne = (ce = TypeError, function() {
	for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
	return se(ce, t);
});
function ze(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
		return ae(e, t, o);
	};
}
function Oe(e, t) {
	let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ve;
	if (J && J(e, null), !he(t)) return e;
	let o = t.length;
	for (; o--;) {
		let r = t[o];
		if ("string" == typeof r) {
			const e = n(r);
			e !== r && (ee(t) || (t[o] = e), r = e);
		}
		e[r] = !0;
	}
	return e;
}
function Ce(e) {
	for (let t = 0; t < e.length; t++) Ee(e, t) || (e[t] = null);
	return e;
}
function Me(e) {
	const t = ie(null);
	for (const o of Z(e)) {
		var n = Q(o, 2);
		const r = n[0], i = n[1];
		Ee(e, r) && (he(i) ? t[r] = Ce(i) : i && "object" == typeof i && i.constructor === Object ? t[r] = Me(i) : t[r] = i);
	}
	return t;
}
function Re(e, t) {
	for (; null !== e;) {
		const n = ne(e, t);
		if (n) {
			if (n.get) return ze(n.get);
			if ("function" == typeof n.value) return ze(n.value);
		}
		e = te(e);
	}
	return function() {
		return null;
	};
}
var Le = oe([
	"a",
	"abbr",
	"acronym",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"big",
	"blink",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"content",
	"data",
	"datalist",
	"dd",
	"decorator",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"element",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meter",
	"nav",
	"nobr",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"shadow",
	"slot",
	"small",
	"source",
	"spacer",
	"span",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]);
var Fe = oe([
	"svg",
	"a",
	"altglyph",
	"altglyphdef",
	"altglyphitem",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"circle",
	"clippath",
	"defs",
	"desc",
	"ellipse",
	"enterkeyhint",
	"exportparts",
	"filter",
	"font",
	"g",
	"glyph",
	"glyphref",
	"hkern",
	"image",
	"inputmode",
	"line",
	"lineargradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"part",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialgradient",
	"rect",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textpath",
	"title",
	"tref",
	"tspan",
	"view",
	"vkern"
]);
var De = oe([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]);
var Pe = oe([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]);
var je = oe([
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msup",
	"msubsup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"mprescripts"
]);
var Ue = oe([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]);
var Be = oe(["#text"]);
var He = oe([
	"accept",
	"action",
	"align",
	"alt",
	"autocapitalize",
	"autocomplete",
	"autopictureinpicture",
	"autoplay",
	"background",
	"bgcolor",
	"border",
	"capture",
	"cellpadding",
	"cellspacing",
	"checked",
	"cite",
	"class",
	"clear",
	"color",
	"cols",
	"colspan",
	"command",
	"commandfor",
	"controls",
	"controlslist",
	"coords",
	"crossorigin",
	"datetime",
	"decoding",
	"default",
	"dir",
	"disabled",
	"disablepictureinpicture",
	"disableremoteplayback",
	"download",
	"draggable",
	"enctype",
	"enterkeyhint",
	"exportparts",
	"face",
	"for",
	"headers",
	"height",
	"hidden",
	"high",
	"href",
	"hreflang",
	"id",
	"inert",
	"inputmode",
	"integrity",
	"ismap",
	"kind",
	"label",
	"lang",
	"list",
	"loading",
	"loop",
	"low",
	"max",
	"maxlength",
	"media",
	"method",
	"min",
	"minlength",
	"multiple",
	"muted",
	"name",
	"nonce",
	"noshade",
	"novalidate",
	"nowrap",
	"open",
	"optimum",
	"part",
	"pattern",
	"placeholder",
	"playsinline",
	"popover",
	"popovertarget",
	"popovertargetaction",
	"poster",
	"preload",
	"pubdate",
	"radiogroup",
	"readonly",
	"rel",
	"required",
	"rev",
	"reversed",
	"role",
	"rows",
	"rowspan",
	"spellcheck",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"span",
	"srclang",
	"start",
	"src",
	"srcset",
	"step",
	"style",
	"summary",
	"tabindex",
	"title",
	"translate",
	"type",
	"usemap",
	"valign",
	"value",
	"width",
	"wrap",
	"xmlns"
]);
var $e = oe([
	"accent-height",
	"accumulate",
	"additive",
	"alignment-baseline",
	"amplitude",
	"ascent",
	"attributename",
	"attributetype",
	"azimuth",
	"basefrequency",
	"baseline-shift",
	"begin",
	"bias",
	"by",
	"class",
	"clip",
	"clippathunits",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"cx",
	"cy",
	"d",
	"dx",
	"dy",
	"diffuseconstant",
	"direction",
	"display",
	"divisor",
	"dominant-baseline",
	"dur",
	"edgemode",
	"elevation",
	"end",
	"exponent",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"filterunits",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-variant",
	"font-weight",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyph-name",
	"glyphref",
	"gradientunits",
	"gradienttransform",
	"height",
	"href",
	"id",
	"image-rendering",
	"in",
	"in2",
	"intercept",
	"k",
	"k1",
	"k2",
	"k3",
	"k4",
	"kerning",
	"keypoints",
	"keysplines",
	"keytimes",
	"lang",
	"lengthadjust",
	"letter-spacing",
	"kernelmatrix",
	"kernelunitlength",
	"lighting-color",
	"local",
	"marker-end",
	"marker-mid",
	"marker-start",
	"markerheight",
	"markerunits",
	"markerwidth",
	"maskcontentunits",
	"maskunits",
	"max",
	"mask",
	"mask-type",
	"media",
	"method",
	"mode",
	"min",
	"name",
	"numoctaves",
	"offset",
	"operator",
	"opacity",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"paint-order",
	"path",
	"pathlength",
	"patterncontentunits",
	"patterntransform",
	"patternunits",
	"points",
	"preservealpha",
	"preserveaspectratio",
	"primitiveunits",
	"r",
	"rx",
	"ry",
	"radius",
	"refx",
	"refy",
	"repeatcount",
	"repeatdur",
	"restart",
	"result",
	"rotate",
	"scale",
	"seed",
	"shape-rendering",
	"slope",
	"specularconstant",
	"specularexponent",
	"spreadmethod",
	"startoffset",
	"stddeviation",
	"stitchtiles",
	"stop-color",
	"stop-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke",
	"stroke-width",
	"style",
	"surfacescale",
	"systemlanguage",
	"tabindex",
	"tablevalues",
	"targetx",
	"targety",
	"transform",
	"transform-origin",
	"text-anchor",
	"text-decoration",
	"text-orientation",
	"text-rendering",
	"textlength",
	"type",
	"u1",
	"u2",
	"unicode",
	"values",
	"viewbox",
	"visibility",
	"version",
	"vert-adv-y",
	"vert-origin-x",
	"vert-origin-y",
	"width",
	"word-spacing",
	"wrap",
	"writing-mode",
	"xchannelselector",
	"ychannelselector",
	"x",
	"x1",
	"x2",
	"xmlns",
	"y",
	"y1",
	"y2",
	"z",
	"zoomandpan"
]);
var Ve = oe([
	"accent",
	"accentunder",
	"align",
	"bevelled",
	"close",
	"columnalign",
	"columnlines",
	"columnspacing",
	"columnspan",
	"denomalign",
	"depth",
	"dir",
	"display",
	"displaystyle",
	"encoding",
	"fence",
	"frame",
	"height",
	"href",
	"id",
	"largeop",
	"length",
	"linethickness",
	"lquote",
	"lspace",
	"mathbackground",
	"mathcolor",
	"mathsize",
	"mathvariant",
	"maxsize",
	"minsize",
	"movablelimits",
	"notation",
	"numalign",
	"open",
	"rowalign",
	"rowlines",
	"rowspacing",
	"rowspan",
	"rspace",
	"rquote",
	"scriptlevel",
	"scriptminsize",
	"scriptsizemultiplier",
	"selection",
	"separator",
	"separators",
	"stretchy",
	"subscriptshift",
	"supscriptshift",
	"symmetric",
	"voffset",
	"width",
	"xmlns"
]);
var We = oe([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]);
var Ye = re(/{{[\w\W]*|^[\w\W]*}}/g);
var Ge = re(/<%[\w\W]*|^[\w\W]*%>/g);
var qe = re(/\${[\w\W]*/g);
var Xe = re(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var Ke = re(/^aria-[\-\w]+$/);
var Qe = re(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var Ze = re(/^(?:\w+script|data):/i);
var Je = re(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var et = re(/^html$/i);
var tt = re(/^[a-z][.\w]*(-[.\w]+)+$/i);
var nt = re(/<[/\w!]/g);
var ot = re(/<[/\w]/g);
var rt = re(/<\/no(script|embed|frames)/i);
var it = re(/\/>/i);
var lt = 1;
var at = 3;
var st = 7;
var ct = 8;
var ut = 9;
var dt = 11;
var ft = function() {
	return "undefined" == typeof window ? null : window;
};
var pt = function(e, t, n, o) {
	return Ee(e, t) && he(e[t]) ? Oe(o.base ? Me(o.base) : {}, e[t], o.transform) : n;
};
var mt = function e() {
	let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ft();
	const n = (t) => e(t);
	if (n.version = "3.4.13", n.removed = [], !t || !t.document || t.document.nodeType !== ut || !t.Element) return n.isSupported = !1, n;
	let o = t.document;
	const r = o, i = r.currentScript;
	t.DocumentFragment;
	const l = t.HTMLTemplateElement, a = t.Node, s = t.Element, c = t.NodeFilter;
	void 0 === t.NamedNodeMap && (t.NamedNodeMap || t.MozNamedAttrMap), t.HTMLFormElement;
	const u = t.DOMParser, d = t.trustedTypes, f = s.prototype, p = Re(f, "cloneNode"), m = Re(f, "remove"), h = Re(f, "nextSibling"), v = Re(f, "childNodes"), g = Re(f, "parentNode"), y = Re(f, "shadowRoot"), b = Re(f, "attributes"), w = a && a.prototype ? Re(a.prototype, "nodeType") : null, x = a && a.prototype ? Re(a.prototype, "nodeName") : null, S = a && a.prototype ? Re(a.prototype, "ownerDocument") : null;
	if ("function" == typeof l) {
		const e = o.createElement("template");
		e.content && e.content.ownerDocument && (o = e.content.ownerDocument);
	}
	let T, I, k = "", E = !1, _ = 0;
	const A = function() {
		if (_ > 0) throw Ne("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, N = function(e) {
		A(), _++;
		try {
			return T.createHTML(e);
		} finally {
			_--;
		}
	}, z = function() {
		return E || (I = function(e, t) {
			if ("object" != typeof e || "function" != typeof e.createPolicy) return null;
			let n = null;
			const o = "data-tt-policy-suffix";
			t && t.hasAttribute(o) && (n = t.getAttribute(o));
			const r = "dompurify" + (n ? "#" + n : "");
			try {
				return e.createPolicy(r, {
					createHTML: (e) => e,
					createScriptURL: (e) => e
				});
			} catch (i) {
				return console.warn("TrustedTypes policy " + r + " could not be created."), null;
			}
		}(d, i), E = !0), I;
	}, O = o, C = O.implementation, M = O.createNodeIterator, R = O.createDocumentFragment, L = O.getElementsByTagName, F = r.importNode;
	let D = {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
	n.isSupported = "function" == typeof Z && "function" == typeof g && C && void 0 !== C.createHTMLDocument;
	const P = Ye, j = Ge, U = qe, B = Xe, H = Ke, $ = Ze, V = Je, W = tt;
	let Y = Qe, G = null;
	const q = Oe({}, [
		...Le,
		...Fe,
		...De,
		...je,
		...Be
	]);
	let X = null;
	const K = Oe({}, [
		...He,
		...$e,
		...Ve,
		...We
	]);
	let Q = Object.seal(ie(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), J = null, ee = null;
	const te = Object.seal(ie(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	}));
	let ne = !0, le = !0, ae = !1, se = !0, ce = !1, ze = !0, Ce = !1, mt = !1, ht = null, vt = null, gt = !1, yt = !1, bt = !1, wt = !1, xt = !0, St = !1;
	const Tt = "user-content-";
	let It = !0, kt = !1, Et = {}, _t = null;
	const At = Oe({}, [
		"annotation-xml",
		"audio",
		"colgroup",
		"desc",
		"foreignobject",
		"head",
		"iframe",
		"math",
		"mi",
		"mn",
		"mo",
		"ms",
		"mtext",
		"noembed",
		"noframes",
		"noscript",
		"plaintext",
		"script",
		"selectedcontent",
		"style",
		"svg",
		"template",
		"thead",
		"title",
		"video",
		"xmp"
	]);
	let Nt = null;
	const zt = Oe({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]);
	let Ot = null;
	const Ct = Oe({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), Mt = "http://www.w3.org/1998/Math/MathML", Rt = "http://www.w3.org/2000/svg", Lt = "http://www.w3.org/1999/xhtml";
	let Ft = Lt, Dt = !1, Pt = null;
	const jt = Oe({}, [
		Mt,
		Rt,
		Lt
	], ge), Ut = oe([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]);
	let Bt = Oe({}, Ut);
	const Ht = oe(["annotation-xml"]);
	let $t = Oe({}, Ht);
	const Vt = Oe({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]);
	let Wt = null;
	const Yt = ["application/xhtml+xml", "text/html"];
	let Gt = null, qt = null;
	const Xt = o.createElement("form"), Kt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, Qt = function() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		if (qt && qt === e) return;
		e && "object" == typeof e || (e = {}), e = Me(e), Wt = -1 === Yt.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE, Gt = "application/xhtml+xml" === Wt ? ge : ve, G = pt(e, "ALLOWED_TAGS", q, { transform: Gt }), X = pt(e, "ALLOWED_ATTR", K, { transform: Gt }), Pt = pt(e, "ALLOWED_NAMESPACES", jt, { transform: ge }), Ot = pt(e, "ADD_URI_SAFE_ATTR", Ct, {
			transform: Gt,
			base: Ct
		}), Nt = pt(e, "ADD_DATA_URI_TAGS", zt, {
			transform: Gt,
			base: zt
		}), _t = pt(e, "FORBID_CONTENTS", At, { transform: Gt }), J = pt(e, "FORBID_TAGS", Me({}), { transform: Gt }), ee = pt(e, "FORBID_ATTR", Me({}), { transform: Gt }), Et = !!Ee(e, "USE_PROFILES") && (e.USE_PROFILES && "object" == typeof e.USE_PROFILES ? Me(e.USE_PROFILES) : e.USE_PROFILES), ne = !1 !== e.ALLOW_ARIA_ATTR, le = !1 !== e.ALLOW_DATA_ATTR, ae = e.ALLOW_UNKNOWN_PROTOCOLS || !1, se = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR, ce = e.SAFE_FOR_TEMPLATES || !1, ze = !1 !== e.SAFE_FOR_XML, Ce = e.WHOLE_DOCUMENT || !1, yt = e.RETURN_DOM || !1, bt = e.RETURN_DOM_FRAGMENT || !1, wt = e.RETURN_TRUSTED_TYPE || !1, gt = e.FORCE_BODY || !1, xt = !1 !== e.SANITIZE_DOM, St = e.SANITIZE_NAMED_PROPS || !1, It = !1 !== e.KEEP_CONTENT, kt = e.IN_PLACE || !1, Y = function(e) {
			try {
				return Ae(e, ""), !0;
			} catch (t) {
				return !1;
			}
		}(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : Qe, Ft = "string" == typeof e.NAMESPACE ? e.NAMESPACE : Lt, Bt = Ee(e, "MATHML_TEXT_INTEGRATION_POINTS") && e.MATHML_TEXT_INTEGRATION_POINTS && "object" == typeof e.MATHML_TEXT_INTEGRATION_POINTS ? Me(e.MATHML_TEXT_INTEGRATION_POINTS) : Oe({}, Ut), $t = Ee(e, "HTML_INTEGRATION_POINTS") && e.HTML_INTEGRATION_POINTS && "object" == typeof e.HTML_INTEGRATION_POINTS ? Me(e.HTML_INTEGRATION_POINTS) : Oe({}, Ht);
		const t = Ee(e, "CUSTOM_ELEMENT_HANDLING") && e.CUSTOM_ELEMENT_HANDLING && "object" == typeof e.CUSTOM_ELEMENT_HANDLING ? Me(e.CUSTOM_ELEMENT_HANDLING) : ie(null);
		if (Q = ie(null), Ee(t, "tagNameCheck") && Kt(t.tagNameCheck) && (Q.tagNameCheck = t.tagNameCheck), Ee(t, "attributeNameCheck") && Kt(t.attributeNameCheck) && (Q.attributeNameCheck = t.attributeNameCheck), Ee(t, "allowCustomizedBuiltInElements") && "boolean" == typeof t.allowCustomizedBuiltInElements && (Q.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), re(Q), ce && (le = !1), bt && (yt = !0), Et && (G = Oe({}, Be), X = ie(null), !0 === Et.html && (Oe(G, Le), Oe(X, He)), !0 === Et.svg && (Oe(G, Fe), Oe(X, $e), Oe(X, We)), !0 === Et.svgFilters && (Oe(G, De), Oe(X, $e), Oe(X, We)), !0 === Et.mathMl && (Oe(G, je), Oe(X, Ve), Oe(X, We))), te.tagCheck = null, te.attributeCheck = null, Ee(e, "ADD_TAGS") && ("function" == typeof e.ADD_TAGS ? te.tagCheck = e.ADD_TAGS : he(e.ADD_TAGS) && (G === q && (G = Me(G)), Oe(G, e.ADD_TAGS, Gt))), Ee(e, "ADD_ATTR") && ("function" == typeof e.ADD_ATTR ? te.attributeCheck = e.ADD_ATTR : he(e.ADD_ATTR) && (X === K && (X = Me(X)), Oe(X, e.ADD_ATTR, Gt))), Ee(e, "ADD_URI_SAFE_ATTR") && he(e.ADD_URI_SAFE_ATTR) && Oe(Ot, e.ADD_URI_SAFE_ATTR, Gt), Ee(e, "FORBID_CONTENTS") && he(e.FORBID_CONTENTS) && (_t === At && (_t = Me(_t)), Oe(_t, e.FORBID_CONTENTS, Gt)), Ee(e, "ADD_FORBID_CONTENTS") && he(e.ADD_FORBID_CONTENTS) && (_t === At && (_t = Me(_t)), Oe(_t, e.ADD_FORBID_CONTENTS, Gt)), It && (G["#text"] = !0), Ce && Oe(G, [
			"html",
			"head",
			"body"
		]), G.table && (Oe(G, ["tbody"]), delete J.tbody), e.TRUSTED_TYPES_POLICY) {
			if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML) throw Ne("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL) throw Ne("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			const t = T;
			T = e.TRUSTED_TYPES_POLICY;
			try {
				k = N("");
			} catch (n) {
				throw T = t, n;
			}
		} else null === e.TRUSTED_TYPES_POLICY ? (T = void 0, k = "") : (void 0 === T && (T = z()), T && "string" == typeof k && (k = N("")));
		oe && oe(e), qt = e;
	}, Zt = Oe({}, [
		...Fe,
		...De,
		...Pe
	]), Jt = Oe({}, [...je, ...Ue]), en = function(e) {
		let t = g(e);
		t && t.tagName || (t = {
			namespaceURI: Ft,
			tagName: "template"
		});
		const n = ve(e.tagName), o = ve(t.tagName);
		return !!Pt[e.namespaceURI] && (e.namespaceURI === Rt ? function(e, t, n) {
			return t.namespaceURI === Lt ? "svg" === e : t.namespaceURI === Mt ? "svg" === e && ("annotation-xml" === n || Bt[n]) : Boolean(Zt[e]);
		}(n, t, o) : e.namespaceURI === Mt ? function(e, t, n) {
			return t.namespaceURI === Lt ? "math" === e : t.namespaceURI === Rt ? "math" === e && $t[n] : Boolean(Jt[e]);
		}(n, t, o) : e.namespaceURI === Lt ? function(e, t, n) {
			return !(t.namespaceURI === Rt && !$t[n]) && !(t.namespaceURI === Mt && !Bt[n]) && !Jt[e] && (Vt[e] || !Zt[e]);
		}(n, t, o) : !("application/xhtml+xml" !== Wt || !Pt[e.namespaceURI]));
	}, tn = function(e) {
		pe(n.removed, { element: e });
		try {
			g(e).removeChild(e);
		} catch (t) {
			if (m(e), !g(e)) throw Ne("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, nn = function(e) {
		ln(e);
		const t = v(e);
		if (t) {
			const e = [];
			ue(t, (t) => {
				pe(e, t);
			}), ue(e, (e) => {
				try {
					m(e);
				} catch (t) {}
			});
		}
		const n = b(e);
		if (n) for (let r = n.length - 1; r >= 0; --r) {
			const t = n[r], i = t && t.name;
			if ("string" == typeof i) try {
				e.removeAttribute(i);
			} catch (o) {}
		}
	}, on = function(e, t) {
		try {
			pe(n.removed, {
				attribute: t.getAttributeNode(e),
				from: t
			});
		} catch (o) {
			pe(n.removed, {
				attribute: null,
				from: t
			});
		}
		if (t.removeAttribute(e), "is" === e) if (yt || bt) try {
			tn(t);
		} catch (o) {}
		else try {
			t.setAttribute(e, "");
		} catch (o) {}
	}, rn = function(e) {
		const t = b(e);
		if (t) for (let o = t.length - 1; o >= 0; --o) {
			const r = t[o], i = r && r.name;
			if ("string" == typeof i && !X[Gt(i)]) try {
				e.removeAttribute(i);
			} catch (n) {}
		}
	}, ln = function(e) {
		const t = [e];
		for (; t.length > 0;) {
			const e = t.pop();
			(w ? w(e) : e.nodeType) === lt && rn(e);
			const n = v(e);
			if (n) for (let o = n.length - 1; o >= 0; --o) t.push(n[o]);
		}
	}, an = function(e) {
		let t = null, n = null;
		if (gt) e = "<remove></remove>" + e;
		else {
			const t = ye(e, /^[\r\n\t ]+/);
			n = t && t[0];
		}
		"application/xhtml+xml" === Wt && Ft === Lt && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		const r = T ? N(e) : e;
		if (Ft === Lt) try {
			t = new u().parseFromString(r, Wt);
		} catch (l) {}
		if (!t || !t.documentElement) {
			t = C.createDocument(Ft, "template", null);
			try {
				t.documentElement.innerHTML = Dt ? k : r;
			} catch (l) {}
		}
		const i = t.body || t.documentElement;
		return e && n && i.insertBefore(o.createTextNode(n), i.childNodes[0] || null), Ft === Lt ? L.call(t, Ce ? "html" : "body")[0] : Ce ? t.documentElement : i;
	}, sn = function(e) {
		const t = S ? S(e) : e.ownerDocument;
		return M.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, cn = function(e) {
		return e = be(e, P, " "), e = be(e, j, " "), e = be(e, U, " ");
	}, un = function(e) {
		var t;
		e.normalize();
		const n = S ? S(e) : e.ownerDocument, o = M.call(n || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null);
		let r = o.nextNode();
		for (; r;) r.data = cn(r.data), r = o.nextNode();
		const i = null === (t = e.querySelectorAll) || void 0 === t ? void 0 : t.call(e, "template");
		i && ue(i, (e) => {
			fn(e.content) && un(e.content);
		});
	}, dn = function(e) {
		const t = x ? x(e) : null;
		return "string" == typeof t && "form" === Gt(t) && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || e.attributes !== b(e) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes || e.nodeType !== w(e) || e.childNodes !== v(e));
	}, fn = function(e) {
		if (!w || "object" != typeof e || null === e) return !1;
		try {
			return w(e) === dt;
		} catch (t) {
			return !1;
		}
	}, pn = function(e) {
		if (!w || "object" != typeof e || null === e) return !1;
		try {
			return "number" == typeof w(e);
		} catch (t) {
			return !1;
		}
	};
	function mn(e, t, o) {
		0 !== e.length && ue(e, (e) => {
			e.call(n, t, o, qt);
		});
	}
	const hn = function(e, t, n, o) {
		return 0 === e.length ? t : t === n || t === o ? Me(t) : t;
	}, vn = function(e, t) {
		if (mn(D.beforeSanitizeElements, e, null), e !== t && null === g(e)) return kt && ln(e), !0;
		if (dn(e)) return tn(e), !0;
		const o = Gt(x ? x(e) : e.nodeName);
		if (G = hn(D.uponSanitizeElement, G, q, ht), mn(D.uponSanitizeElement, e, {
			tagName: o,
			allowedTags: G
		}), e !== t && null === g(e)) return kt && ln(e), !0;
		if (function(e, t) {
			return !!(ze && e.hasChildNodes() && !pn(e.firstElementChild) && Ae(nt, e.textContent) && Ae(nt, e.innerHTML)) || !(!ze || e.namespaceURI !== Lt || "style" !== t || !pn(e.firstElementChild)) || e.nodeType === st || !(!ze || e.nodeType !== ct || !Ae(ot, e.data));
		}(e, o)) return tn(e), !0;
		if (J[o] || !(te.tagCheck instanceof Function && te.tagCheck(o)) && !G[o]) {
			const n = function(e, t, n) {
				if (!J[t] && bn(t)) {
					if (Q.tagNameCheck instanceof RegExp && Ae(Q.tagNameCheck, t)) return !1;
					if (Q.tagNameCheck instanceof Function && Q.tagNameCheck(t)) return !1;
				}
				if (It && !_t[t]) {
					const t = g(e), o = v(e);
					if (o && t) for (let r = o.length - 1; r >= 0; --r) {
						const i = e === n ? p(o[r], !0) : o[r];
						t.insertBefore(i, h(e));
					}
				}
				return tn(e), !0;
			}(e, o, t);
			return !1 === n && mn(D.afterSanitizeElements, e, null), n;
		}
		if ((w ? w(e) : e.nodeType) === lt && !en(e)) return tn(e), !0;
		if (("noscript" === o || "noembed" === o || "noframes" === o) && Ae(rt, e.innerHTML)) return tn(e), !0;
		if (ce && e.nodeType === at) {
			const t = cn(e.textContent);
			e.textContent !== t && (pe(n.removed, { element: e.cloneNode() }), e.textContent = t);
		}
		return mn(D.afterSanitizeElements, e, null), !1;
	}, gn = function(e, t, n) {
		if (ee[t]) return !1;
		if (ze && "patchsrc" === t) return !1;
		if (ze && "for" === t && "label" !== e && "output" !== e) return !1;
		if (xt && ("id" === t || "name" === t) && (n in o || n in Xt)) return !1;
		const r = X[t] || te.attributeCheck instanceof Function && te.attributeCheck(t, e);
		if (le && Ae(B, t));
		else if (ne && Ae(H, t));
		else if (r) {
			if (Ot[t]);
			else if (Ae(Y, be(n, V, "")));
			else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== we(n, "data:") || !Nt[e]) {
				if (ae && !Ae($, be(n, V, "")));
				else if (n) return !1;
			}
		} else if (!(bn(e) && (Q.tagNameCheck instanceof RegExp && Ae(Q.tagNameCheck, e) || Q.tagNameCheck instanceof Function && Q.tagNameCheck(e)) && (Q.attributeNameCheck instanceof RegExp && Ae(Q.attributeNameCheck, t) || Q.attributeNameCheck instanceof Function && Q.attributeNameCheck(t, e)) || "is" === t && Q.allowCustomizedBuiltInElements && (Q.tagNameCheck instanceof RegExp && Ae(Q.tagNameCheck, n) || Q.tagNameCheck instanceof Function && Q.tagNameCheck(n)))) return !1;
		return !0;
	}, yn = Oe({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), bn = function(e) {
		return !yn[ve(e)] && Ae(W, e);
	}, wn = function(e, t, n, o) {
		if (T && "object" == typeof d && "function" == typeof d.getAttributeType && !n) switch (d.getAttributeType(e, t)) {
			case "TrustedHTML": return N(o);
			case "TrustedScriptURL": return function(e) {
				A(), _++;
				try {
					return T.createScriptURL(e);
				} finally {
					_--;
				}
			}(o);
		}
		return o;
	}, xn = function(e, t, o, r) {
		try {
			o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r), dn(e) ? tn(e) : fe(n.removed);
		} catch (i) {
			on(t, e);
		}
	}, Sn = function(e) {
		mn(D.beforeSanitizeAttributes, e, null);
		const t = e.attributes;
		if (!t || dn(e)) return;
		X = hn(D.uponSanitizeAttribute, X, K, vt);
		const n = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: X,
			forceKeepAttr: void 0
		};
		let o = t.length;
		const r = Gt(e.nodeName);
		for (; o--;) {
			const i = t[o], l = i.name, a = i.namespaceURI, s = i.value, c = Gt(l), u = s;
			let d = "value" === l ? u : xe(u);
			n.attrName = c, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, mn(D.uponSanitizeAttribute, e, n), d = n.attrValue, !St || "id" !== c && "name" !== c || 0 === we(d, Tt) || (on(l, e), d = Tt + d), ze && Ae(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, d) ? on(l, e) : "attributename" === c && ye(d, "href") ? on(l, e) : n.forceKeepAttr || (n.keepAttr && (se || !Ae(it, d)) ? (ce && (d = cn(d)), gn(r, c, d) ? (d = wn(r, c, a, d), d !== u && xn(e, l, a, d)) : on(l, e)) : on(l, e));
		}
		mn(D.afterSanitizeAttributes, e, null);
	}, Tn = function(e) {
		let t = null;
		const n = sn(e);
		for (mn(D.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (mn(D.uponSanitizeShadowNode, t, null), vn(t, e), Sn(t), fn(t.content) && Tn(t.content), (w ? w(t) : t.nodeType) === lt) {
			const e = y(t);
			fn(e) && (In(e), Tn(e));
		}
		mn(D.afterSanitizeShadowDOM, e, null);
	}, In = function(e) {
		const t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			const e = t.pop();
			if (e.shadow) {
				Tn(e.shadow);
				continue;
			}
			const n = e.node, o = (w ? w(n) : n.nodeType) === lt, r = v(n);
			if (r) for (let i = r.length - 1; i >= 0; --i) t.push({
				node: r[i],
				shadow: null
			});
			if (o) {
				const e = x ? x(n) : null;
				if ("string" == typeof e && "template" === Gt(e)) {
					const e = n.content;
					fn(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (o) {
				const e = y(n);
				fn(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return n.sanitize = function(e) {
		let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = null, i = null, l = null, a = null;
		if (Dt = !e, Dt && (e = "<!-->"), "string" != typeof e && !pn(e) && "string" != typeof (e = function(e) {
			switch (typeof e) {
				case "string": return e;
				case "number": return Se(e);
				case "boolean": return Te(e);
				case "bigint": return Ie ? Ie(e) : "0";
				case "symbol": return ke ? ke(e) : "Symbol()";
				case "undefined":
				default: return _e(e);
				case "function":
				case "object": {
					if (null === e) return _e(e);
					const t = e, n = Re(t, "toString");
					if ("function" == typeof n) {
						const e = n(t);
						return "string" == typeof e ? e : _e(e);
					}
					return _e(e);
				}
			}
		}(e))) throw Ne("dirty is not a string, aborting");
		if (!n.isSupported) return e;
		mt ? (G = ht, X = vt) : Qt(t), (D.uponSanitizeElement.length > 0 || D.uponSanitizeAttribute.length > 0) && (G = Me(G)), D.uponSanitizeAttribute.length > 0 && (X = Me(X)), n.removed = [];
		const s = kt && "string" != typeof e && pn(e);
		if (s) {
			(function(e) {
				if (!ze) return;
				const t = [e];
				for (; t.length > 0;) {
					const e = t.pop(), o = w ? w(e) : e.nodeType;
					if (o === st || o === ct && Ae(ot, e.data)) {
						try {
							m(e);
						} catch (n) {}
						continue;
					}
					if (o === lt) {
						const t = e, o = Gt(x ? x(e) : e.nodeName);
						try {
							t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && "label" !== o && "output" !== o && t.removeAttribute("for");
						} catch (n) {}
					}
					const r = v(e);
					if (r) for (let n = r.length - 1; n >= 0; --n) t.push(r[n]);
				}
			})(e);
			const t = x ? x(e) : e.nodeName;
			if ("string" == typeof t) {
				const n = Gt(t);
				if (!G[n] || J[n]) throw nn(e), Ne("root node is forbidden and cannot be sanitized in-place");
			}
			if (dn(e)) throw nn(e), Ne("root node is clobbered and cannot be sanitized in-place");
			try {
				In(e);
			} catch (d) {
				throw nn(e), d;
			}
		} else if (pn(e)) o = an("<!---->"), i = o.ownerDocument.importNode(e, !0), i.nodeType === lt && "BODY" === i.nodeName || "HTML" === i.nodeName ? o = i : o.appendChild(i), In(i);
		else {
			if (!yt && !ce && !Ce && -1 === e.indexOf("<")) return T && wt ? N(e) : e;
			if (o = an(e), !o) return yt ? null : wt ? k : "";
		}
		o && gt && tn(o.firstChild);
		const c = s ? e : o;
		try {
			const e = sn(c);
			for (; l = e.nextNode();) vn(l, c), Sn(l), fn(l.content) && Tn(l.content);
		} catch (d) {
			throw s && (nn(e), ue(n.removed, (e) => {
				e.element && ln(e.element);
			})), d;
		}
		if (s) return ue(n.removed, (e) => {
			e.element && ln(e.element);
		}), ce && un(e), e;
		if (yt) {
			if (ce && un(o), bt) for (a = R.call(o.ownerDocument); o.firstChild;) a.appendChild(o.firstChild);
			else a = o;
			return (X.shadowroot || X.shadowrootmode) && (a = F.call(r, a, !0)), a;
		}
		let u = Ce ? o.outerHTML : o.innerHTML;
		return Ce && G["!doctype"] && o.ownerDocument && o.ownerDocument.doctype && o.ownerDocument.doctype.name && Ae(et, o.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + o.ownerDocument.doctype.name + ">\n" + u), ce && (u = cn(u)), T && wt ? N(u) : u;
	}, n.setConfig = function() {
		Qt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), mt = !0, ht = G, vt = X;
	}, n.clearConfig = function() {
		qt = null, mt = !1, ht = null, vt = null, T = I, k = "";
	}, n.isValidAttribute = function(e, t, n) {
		return qt || Qt({}), gn(Gt(e), Gt(t), n);
	}, n.addHook = function(e, t) {
		"function" == typeof t && Ee(D, e) && pe(D[e], t);
	}, n.removeHook = function(e, t) {
		if (Ee(D, e)) {
			if (void 0 !== t) {
				const n = de(D[e], t);
				return -1 === n ? void 0 : me(D[e], n, 1)[0];
			}
			return fe(D[e]);
		}
	}, n.removeHooks = function(e) {
		Ee(D, e) && (D[e] = []);
	}, n.removeAllHooks = function() {
		D = {
			afterSanitizeAttributes: [],
			afterSanitizeElements: [],
			afterSanitizeShadowDOM: [],
			beforeSanitizeAttributes: [],
			beforeSanitizeElements: [],
			beforeSanitizeShadowDOM: [],
			uponSanitizeAttribute: [],
			uponSanitizeElement: [],
			uponSanitizeShadowNode: []
		};
	}, n;
}();
var ht = /* @__PURE__ */ new Map();
function vt(e) {
	const t = ht.get(e);
	return void 0 !== t && (ht.delete(e), ht.set(e, t)), t;
}
function gt(e, t) {
	if (ht.size >= 500) {
		const e = ht.keys().next().value;
		e && ht.delete(e);
	}
	const n = mt.sanitize(t, { USE_PROFILES: {
		svg: !0,
		svgFilters: !0
	} });
	return ht.set(e, n), n;
}
var yt = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var bt = (e, t, n, o = "") => {
	const r = e.split(":");
	if ("@" === e.slice(0, 1)) {
		if (r.length < 2 || r.length > 3) return null;
		o = r.shift().slice(1);
	}
	if (r.length > 3 || !r.length) return null;
	if (r.length > 1) {
		const e = r.pop(), n = r.pop(), i = {
			provider: r.length > 0 ? r[0] : o,
			prefix: n,
			name: e
		};
		return t && !wt(i) ? null : i;
	}
	const i = r[0], l = i.split("-");
	if (l.length > 1) {
		const e = {
			provider: o,
			prefix: l.shift(),
			name: l.join("-")
		};
		return t && !wt(e) ? null : e;
	}
	if (n && "" === o) {
		const e = {
			provider: o,
			prefix: "",
			name: i
		};
		return t && !wt(e, n) ? null : e;
	}
	return null;
};
var wt = (e, t) => !!e && !(!(t && "" === e.prefix || e.prefix) || !e.name);
var xt = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
});
var St = Object.freeze({
	rotate: 0,
	vFlip: !1,
	hFlip: !1
});
var Tt = Object.freeze({
	...xt,
	...St
});
var It = Object.freeze({
	...Tt,
	body: "",
	hidden: !1
});
function kt(e, t) {
	const n = function(e, t) {
		const n = {};
		!e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
		const o = ((e.rotate || 0) + (t.rotate || 0)) % 4;
		return o && (n.rotate = o), n;
	}(e, t);
	for (const o in It) o in St ? o in e && !(o in n) && (n[o] = St[o]) : o in t ? n[o] = t[o] : o in e && (n[o] = e[o]);
	return n;
}
function Et(e, t, n) {
	const o = e.icons, r = e.aliases || Object.create(null);
	let i = {};
	function l(e) {
		i = kt(o[e] || r[e], i);
	}
	return l(t), n.forEach(l), kt(e, i);
}
function _t(e, t) {
	const n = [];
	if ("object" != typeof e || "object" != typeof e.icons) return n;
	e.not_found instanceof Array && e.not_found.forEach((e) => {
		t(e, null), n.push(e);
	});
	const o = function(e) {
		const t = e.icons, n = e.aliases || Object.create(null), o = Object.create(null);
		return Object.keys(t).concat(Object.keys(n)).forEach(function e(r) {
			if (t[r]) return o[r] = [];
			if (!(r in o)) {
				o[r] = null;
				const t = n[r] && n[r].parent, i = t && e(t);
				i && (o[r] = [t].concat(i));
			}
			return o[r];
		}), o;
	}(e);
	for (const r in o) {
		const i = o[r];
		i && (t(r, Et(e, r, i)), n.push(r));
	}
	return n;
}
var At = {
	provider: "",
	aliases: {},
	not_found: {},
	...xt
};
function Nt(e, t) {
	for (const n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
	return !0;
}
function zt(e) {
	if ("object" != typeof e || null === e) return null;
	const t = e;
	if ("string" != typeof t.prefix || !e.icons || "object" != typeof e.icons) return null;
	if (!Nt(e, At)) return null;
	const n = t.icons;
	for (const r in n) {
		const e = n[r];
		if (!r || "string" != typeof e.body || !Nt(e, It)) return null;
	}
	const o = t.aliases || Object.create(null);
	for (const r in o) {
		const e = o[r], t = e.parent;
		if (!r || "string" != typeof t || !n[t] && !o[t] || !Nt(e, It)) return null;
	}
	return t;
}
var Ot = Object.create(null);
function Ct(e, t) {
	const n = Ot[e] || (Ot[e] = Object.create(null));
	return n[t] || (n[t] = function(e, t) {
		return {
			provider: e,
			prefix: t,
			icons: Object.create(null),
			missing: /* @__PURE__ */ new Set()
		};
	}(e, t));
}
function Mt(e, t) {
	return zt(t) ? _t(t, (t, n) => {
		n ? e.icons[t] = n : e.missing.add(t);
	}) : [];
}
var Rt = !1;
function Lt(e) {
	return "boolean" == typeof e && (Rt = e), Rt;
}
function Ft(e) {
	const t = "string" == typeof e ? bt(e, !0, Rt) : e;
	if (t) {
		const e = Ct(t.provider, t.prefix), n = t.name;
		return e.icons[n] || (e.missing.has(n) ? null : void 0);
	}
}
function Dt(e, t) {
	if ("object" != typeof e) return !1;
	if ("string" != typeof t && (t = e.provider || ""), Rt && !t && !e.prefix) {
		let t = !1;
		return zt(e) && (e.prefix = "", _t(e, (e, n) => {
			(function(e, t) {
				const n = bt(e, !0, Rt);
				if (!n) return !1;
				const o = Ct(n.provider, n.prefix);
				return t ? function(e, t, n) {
					try {
						if ("string" == typeof n.body) return e.icons[t] = { ...n }, !0;
					} catch (o) {}
					return !1;
				}(o, n.name, t) : (o.missing.add(n.name), !0);
			})(e, n) && (t = !0);
		})), t;
	}
	const n = e.prefix;
	return !!wt({
		prefix: n,
		name: "a"
	}) && !!Mt(Ct(t, n), e);
}
var Pt = Object.freeze({
	width: null,
	height: null
});
var jt = Object.freeze({
	...Pt,
	...St
});
var Ut = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var Bt = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Ht(e, t, n) {
	if (1 === t) return e;
	if (n = n || 100, "number" == typeof e) return Math.ceil(e * t * n) / n;
	if ("string" != typeof e) return e;
	const o = e.split(Ut);
	if (null === o || !o.length) return e;
	const r = [];
	let i = o.shift(), l = Bt.test(i);
	for (;;) {
		if (l) {
			const e = parseFloat(i);
			isNaN(e) ? r.push(i) : r.push(Math.ceil(e * t * n) / n);
		} else r.push(i);
		if (i = o.shift(), void 0 === i) return r.join("");
		l = !l;
	}
}
function $t(e, t) {
	const n = {
		...Tt,
		...e
	}, o = {
		...jt,
		...t
	}, r = {
		left: n.left,
		top: n.top,
		width: n.width,
		height: n.height
	};
	let i = n.body;
	[n, o].forEach((e) => {
		const t = [], n = e.hFlip, o = e.vFlip;
		let l, a = e.rotate;
		switch (n ? o ? a += 2 : (t.push("translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"), t.push("scale(-1 1)"), r.top = r.left = 0) : o && (t.push("translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"), t.push("scale(1 -1)"), r.top = r.left = 0), a < 0 && (a -= 4 * Math.floor(a / 4)), a %= 4, a) {
			case 1:
				l = r.height / 2 + r.top, t.unshift("rotate(90 " + l.toString() + " " + l.toString() + ")");
				break;
			case 2:
				t.unshift("rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")");
				break;
			case 3: l = r.width / 2 + r.left, t.unshift("rotate(-90 " + l.toString() + " " + l.toString() + ")");
		}
		a % 2 == 1 && (r.left !== r.top && (l = r.left, r.left = r.top, r.top = l), r.width !== r.height && (l = r.width, r.width = r.height, r.height = l)), t.length && (i = function(e, t, n) {
			const o = function(e, t = "defs") {
				let n = "";
				const o = e.indexOf("<" + t);
				for (; o >= 0;) {
					const r = e.indexOf(">", o), i = e.indexOf("</" + t);
					if (-1 === r || -1 === i) break;
					const l = e.indexOf(">", i);
					if (-1 === l) break;
					n += e.slice(r + 1, i).trim(), e = e.slice(0, o).trim() + e.slice(l + 1);
				}
				return {
					defs: n,
					content: e
				};
			}(e);
			return r = o.defs, i = t + o.content + n, r ? "<defs>" + r + "</defs>" + i : i;
			var r, i;
		}(i, "<g transform=\"" + t.join(" ") + "\">", "</g>"));
	});
	const l = o.width, a = o.height, s = r.width, c = r.height;
	let u, d;
	null === l ? (d = null === a ? "1em" : "auto" === a ? c : a, u = Ht(d, s / c)) : (u = "auto" === l ? s : l, d = null === a ? Ht(u, c / s) : "auto" === a ? c : a);
	const f = {}, p = (e, t) => {
		((e) => "unset" === e || "undefined" === e || "none" === e)(t) || (f[e] = t.toString());
	};
	p("width", u), p("height", d);
	const m = [
		r.left,
		r.top,
		s,
		c
	];
	return f.viewBox = m.join(" "), {
		attributes: f,
		viewBox: m,
		body: i
	};
}
var Vt = /\sid="(\S+)"/g;
var Wt = /* @__PURE__ */ new Map();
function Yt(e) {
	const t = [];
	let n;
	for (; n = Vt.exec(e);) t.push(n[1]);
	if (!t.length) return e;
	const o = "suffix" + (16777216 * Math.random() | Date.now()).toString(16);
	return t.forEach((t) => {
		const n = function(e) {
			e = e.replace(/[0-9]+$/, "") || "a";
			const t = Wt.get(e) || 0;
			return Wt.set(e, t + 1), t ? `${e}${t}` : e;
		}(t), r = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		e = e.replace(new RegExp("([#;\"])(" + r + ")([\")]|\\.[a-z])", "g"), "$1" + n + o + "$3");
	}), e = e.replace(new RegExp(o, "g"), "");
}
var Gt = Object.create(null);
function qt(e) {
	return Gt[e] || Gt[""];
}
function Xt(e) {
	let t;
	if ("string" == typeof e.resources) t = [e.resources];
	else if (t = e.resources, !(t instanceof Array && t.length)) return null;
	return {
		resources: t,
		path: e.path || "/",
		maxURL: e.maxURL || 500,
		rotate: e.rotate || 750,
		timeout: e.timeout || 5e3,
		random: !0 === e.random,
		index: e.index || 0,
		dataAfterTimeout: !1 !== e.dataAfterTimeout
	};
}
for (var Kt = Object.create(null), Qt = ["https://api.simplesvg.com", "https://api.unisvg.com"], Zt = []; Qt.length > 0;) 1 === Qt.length || Math.random() > .5 ? Zt.push(Qt.shift()) : Zt.push(Qt.pop());
function Jt(e, t) {
	const n = Xt(t);
	return null !== n && (Kt[e] = n, !0);
}
function en(e) {
	return Kt[e];
}
Kt[""] = Xt({ resources: ["https://api.iconify.design"].concat(Zt) });
var tn = (() => {
	let e;
	try {
		if (e = fetch, "function" == typeof e) return e;
	} catch (t) {}
})();
var nn = {
	prepare: (e, t, n) => {
		const o = [], r = function(e, t) {
			const n = en(e);
			if (!n) return 0;
			let o;
			if (n.maxURL) {
				let e = 0;
				n.resources.forEach((t) => {
					e = Math.max(e, t.length);
				});
				const r = t + ".json?icons=";
				o = n.maxURL - e - n.path.length - r.length;
			} else o = 0;
			return o;
		}(e, t), i = "icons";
		let l = {
			type: i,
			provider: e,
			prefix: t,
			icons: []
		}, a = 0;
		return n.forEach((n, s) => {
			a += n.length + 1, a >= r && s > 0 && (o.push(l), l = {
				type: i,
				provider: e,
				prefix: t,
				icons: []
			}, a = n.length), l.icons.push(n);
		}), o.push(l), o;
	},
	send: (e, t, n) => {
		if (!tn) return void n("abort", 424);
		let o = function(e) {
			if ("string" == typeof e) {
				const t = en(e);
				if (t) return t.path;
			}
			return "/";
		}(t.provider);
		switch (t.type) {
			case "icons": {
				const e = t.prefix, n = t.icons.join(",");
				o += e + ".json?" + new URLSearchParams({ icons: n }).toString();
				break;
			}
			case "custom": {
				const e = t.uri;
				o += "/" === e.slice(0, 1) ? e.slice(1) : e;
				break;
			}
			default:
				n("abort", 400);
				return;
		}
		let r = 503;
		tn(e + o).then((e) => {
			const t = e.status;
			if (200 === t) return r = 501, e.json();
			setTimeout(() => {
				n(function(e) {
					return 404 === e;
				}(t) ? "abort" : "next", t);
			});
		}).then((e) => {
			"object" == typeof e && null !== e ? setTimeout(() => {
				n("success", e);
			}) : setTimeout(() => {
				404 === e ? n("abort", e) : n("next", r);
			});
		}).catch(() => {
			n("next", r);
		});
	}
};
function on(e, t) {
	e.forEach((e) => {
		const n = e.loaderCallbacks;
		n && (e.loaderCallbacks = n.filter((e) => e.id !== t));
	});
}
var rn = 0;
var ln = {
	resources: [],
	index: 0,
	timeout: 2e3,
	rotate: 750,
	random: !1,
	dataAfterTimeout: !1
};
function an(e) {
	const t = {
		...ln,
		...e
	};
	let n = [];
	function o() {
		n = n.filter((e) => "pending" === e().status);
	}
	return {
		query: function(e, r, i) {
			const l = function(e, t, n, o) {
				const r = e.resources.length, i = e.random ? Math.floor(Math.random() * r) : e.index;
				let l;
				if (e.random) {
					let t = e.resources.slice(0);
					for (l = []; t.length > 1;) {
						const e = Math.floor(Math.random() * t.length);
						l.push(t[e]), t = t.slice(0, e).concat(t.slice(e + 1));
					}
					l = l.concat(t);
				} else l = e.resources.slice(i).concat(e.resources.slice(0, i));
				const a = Date.now();
				let s, c = "pending", u = 0, d = null, f = [], p = [];
				function m() {
					d && (clearTimeout(d), d = null);
				}
				function h() {
					"pending" === c && (c = "aborted"), m(), f.forEach((e) => {
						"pending" === e.status && (e.status = "aborted");
					}), f = [];
				}
				function v(e, t) {
					t && (p = []), "function" == typeof e && p.push(e);
				}
				function g() {
					c = "failed", p.forEach((e) => {
						e(void 0, s);
					});
				}
				function y() {
					f.forEach((e) => {
						"pending" === e.status && (e.status = "aborted");
					}), f = [];
				}
				function b(t, n, o) {
					const r = "success" !== n;
					switch (f = f.filter((e) => e !== t), c) {
						case "pending": break;
						case "failed":
							if (r || !e.dataAfterTimeout) return;
							break;
						default: return;
					}
					if ("abort" === n) return s = o, void g();
					if (r) return s = o, void (f.length || (l.length ? w() : g()));
					if (m(), y(), !e.random) {
						const n = e.resources.indexOf(t.resource);
						-1 !== n && n !== e.index && (e.index = n);
					}
					c = "completed", p.forEach((e) => {
						e(o);
					});
				}
				function w() {
					if ("pending" !== c) return;
					m();
					const o = l.shift();
					if (void 0 === o) return f.length ? void (d = setTimeout(() => {
						m(), "pending" === c && (y(), g());
					}, e.timeout)) : void g();
					const r = {
						status: "pending",
						resource: o,
						callback: (e, t) => {
							b(r, e, t);
						}
					};
					f.push(r), u++, d = setTimeout(w, e.rotate), n(o, t, r.callback);
				}
				return "function" == typeof o && p.push(o), setTimeout(w), function() {
					return {
						startTime: a,
						payload: t,
						status: c,
						queriesSent: u,
						queriesPending: f.length,
						subscribe: v,
						abort: h
					};
				};
			}(t, e, r, (e, t) => {
				o(), i && i(e, t);
			});
			return n.push(l), l;
		},
		find: function(e) {
			return n.find((t) => e(t)) || null;
		},
		setIndex: (e) => {
			t.index = e;
		},
		getIndex: () => t.index,
		cleanup: o
	};
}
function sn() {}
var cn = Object.create(null);
function un(e, t, n) {
	let o, r;
	if ("string" == typeof e) {
		const t = qt(e);
		if (!t) return n(void 0, 424), sn;
		r = t.send;
		const i = function(e) {
			if (!cn[e]) {
				const t = en(e);
				if (!t) return;
				cn[e] = {
					config: t,
					redundancy: an(t)
				};
			}
			return cn[e];
		}(e);
		i && (o = i.redundancy);
	} else {
		const t = Xt(e);
		if (t) {
			o = an(t);
			const n = qt(e.resources ? e.resources[0] : "");
			n && (r = n.send);
		}
	}
	return o && r ? o.query(t, r, n)().abort : (n(void 0, 424), sn);
}
function dn() {}
function fn(e) {
	e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
		e.iconsLoaderFlag = !1, function(e) {
			e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
				e.pendingCallbacksFlag = !1;
				const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
				if (!t.length) return;
				let n = !1;
				const o = e.provider, r = e.prefix;
				t.forEach((t) => {
					const i = t.icons, l = i.pending.length;
					i.pending = i.pending.filter((t) => {
						if (t.prefix !== r) return !0;
						const l = t.name;
						if (e.icons[l]) i.loaded.push({
							provider: o,
							prefix: r,
							name: l
						});
						else {
							if (!e.missing.has(l)) return n = !0, !0;
							i.missing.push({
								provider: o,
								prefix: r,
								name: l
							});
						}
						return !1;
					}), i.pending.length !== l && (n || on([e], t.id), t.callback(i.loaded.slice(0), i.missing.slice(0), i.pending.slice(0), t.abort));
				});
			}));
		}(e);
	}));
}
function pn(e, t, n) {
	function o() {
		const n = e.pendingIcons;
		t.forEach((t) => {
			n && n.delete(t), e.icons[t] || e.missing.add(t);
		});
	}
	if (n && "object" == typeof n) try {
		if (!Mt(e, n).length) return void o();
	} catch (r) {
		console.error(r);
	}
	o(), fn(e);
}
function mn(e, t) {
	e instanceof Promise ? e.then((e) => {
		t(e);
	}).catch(() => {
		t(null);
	}) : t(e);
}
function hn(e, t) {
	e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
		e.iconsQueueFlag = !1;
		const { provider: t, prefix: n } = e, o = e.iconsToLoad;
		if (delete e.iconsToLoad, !o || !o.length) return;
		const r = e.loadIcon;
		if (e.loadIcons && (o.length > 1 || !r)) return void mn(e.loadIcons(o, n, t), (t) => {
			pn(e, o, t);
		});
		if (r) return void o.forEach((o) => {
			mn(r(o, n, t), (t) => {
				pn(e, [o], t ? {
					prefix: n,
					icons: { [o]: t }
				} : null);
			});
		});
		const { valid: i, invalid: l } = function(e) {
			const t = [], n = [];
			return e.forEach((e) => {
				(e.match(yt) ? t : n).push(e);
			}), {
				valid: t,
				invalid: n
			};
		}(o);
		if (l.length && pn(e, l, null), !i.length) return;
		const a = n.match(yt) ? qt(t) : null;
		a ? a.prepare(t, n, i).forEach((n) => {
			un(t, n, (t) => {
				pn(e, n.icons, t);
			});
		}) : pn(e, i, null);
	}));
}
var vn = (e, t) => {
	const n = function(e) {
		const t = {
			loaded: [],
			missing: [],
			pending: []
		}, n = Object.create(null);
		e.sort((e, t) => e.provider !== t.provider ? e.provider.localeCompare(t.provider) : e.prefix !== t.prefix ? e.prefix.localeCompare(t.prefix) : e.name.localeCompare(t.name));
		let o = {
			provider: "",
			prefix: "",
			name: ""
		};
		return e.forEach((e) => {
			if (o.name === e.name && o.prefix === e.prefix && o.provider === e.provider) return;
			o = e;
			const r = e.provider, i = e.prefix, l = e.name, a = n[r] || (n[r] = Object.create(null)), s = a[i] || (a[i] = Ct(r, i));
			let c;
			c = l in s.icons ? t.loaded : "" === i || s.missing.has(l) ? t.missing : t.pending;
			const u = {
				provider: r,
				prefix: i,
				name: l
			};
			c.push(u);
		}), t;
	}(function(e, t = !0, n = !1) {
		const o = [];
		return e.forEach((e) => {
			const r = "string" == typeof e ? bt(e, t, n) : e;
			r && o.push(r);
		}), o;
	}(e, !0, Lt()));
	if (!n.pending.length) {
		let e = !0;
		return t && setTimeout(() => {
			e && t(n.loaded, n.missing, n.pending, dn);
		}), () => {
			e = !1;
		};
	}
	const o = Object.create(null), r = [];
	let i, l;
	return n.pending.forEach((e) => {
		const { provider: t, prefix: n } = e;
		if (n === l && t === i) return;
		i = t, l = n, r.push(Ct(t, n));
		const a = o[t] || (o[t] = Object.create(null));
		a[n] || (a[n] = []);
	}), n.pending.forEach((e) => {
		const { provider: t, prefix: n, name: r } = e, i = Ct(t, n), l = i.pendingIcons || (i.pendingIcons = /* @__PURE__ */ new Set());
		l.has(r) || (l.add(r), o[t][n].push(r));
	}), r.forEach((e) => {
		const t = o[e.provider][e.prefix];
		t.length && hn(e, t);
	}), t ? function(e, t, n) {
		const o = rn++, r = on.bind(null, n, o);
		if (!t.pending.length) return r;
		const i = {
			id: o,
			icons: t,
			callback: e,
			abort: r
		};
		return n.forEach((e) => {
			(e.loaderCallbacks || (e.loaderCallbacks = [])).push(i);
		}), r;
	}(t, n, r) : dn;
};
var gn = (e) => new Promise((t, n) => {
	const o = "string" == typeof e ? bt(e, !0) : e;
	o ? vn([o || e], (r) => {
		if (r.length && o) {
			const e = Ft(o);
			if (e) return void t({
				...Tt,
				...e
			});
		}
		n(e);
	}) : n(e);
});
var yn = /[\s,]+/;
function bn(e, t) {
	t.split(yn).forEach((t) => {
		switch (t.trim()) {
			case "horizontal":
				e.hFlip = !0;
				break;
			case "vertical": e.vFlip = !0;
		}
	});
}
function wn(e, t = 0) {
	const n = e.replace(/^-?[0-9.]*/, "");
	function o(e) {
		for (; e < 0;) e += 4;
		return e % 4;
	}
	if ("" === n) {
		const t = parseInt(e);
		return isNaN(t) ? 0 : o(t);
	}
	if (n !== e) {
		let t = 0;
		switch (n) {
			case "%":
				t = 25;
				break;
			case "deg": t = 90;
		}
		if (t) {
			let r = parseFloat(e.slice(0, e.length - n.length));
			return isNaN(r) ? 0 : (r /= t, r % 1 == 0 ? o(r) : 0);
		}
	}
	return t;
}
function xn(e) {
	return "url(\"" + function(e) {
		return "data:image/svg+xml," + function(e) {
			return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
		}(e);
	}(e) + "\")";
}
var Sn = {
	...jt,
	inline: !1
};
var Tn = {
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	"aria-hidden": !0,
	role: "img"
};
var In = { display: "inline-block" };
var kn = { backgroundColor: "currentColor" };
var En = { backgroundColor: "transparent" };
var _n = {
	Image: "var(--svg)",
	Repeat: "no-repeat",
	Size: "100% 100%"
};
var An = {
	webkitMask: kn,
	mask: kn,
	background: En
};
for (const Zo in An) {
	const e = An[Zo];
	for (const t in _n) e[Zo + t] = _n[t];
}
var Nn = {};
function zn(e) {
	return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
["horizontal", "vertical"].forEach((e) => {
	const t = e.slice(0, 1) + "Flip";
	Nn[e + "-flip"] = t, Nn[e.slice(0, 1) + "-flip"] = t, Nn[e + "Flip"] = t;
});
var On;
var Cn = (e, t) => {
	const n = function(e, t) {
		const n = { ...e };
		for (const o in t) {
			const e = t[o], r = typeof e;
			o in Pt ? (null === e || e && ("string" === r || "number" === r)) && (n[o] = e) : r === typeof n[o] && (n[o] = "rotate" === o ? e % 4 : e);
		}
		return n;
	}(Sn, t), o = { ...Tn }, r = t.mode || "svg", i = {}, l = t.style, a = "object" != typeof l || l instanceof Array ? {} : l;
	for (let d in t) {
		const e = t[d];
		if (void 0 !== e) switch (d) {
			case "icon":
			case "style":
			case "onLoad":
			case "mode":
			case "ssr":
			case "customise": break;
			case "inline":
			case "hFlip":
			case "vFlip":
				n[d] = !0 === e || "true" === e || 1 === e;
				break;
			case "flip":
				"string" == typeof e && bn(n, e);
				break;
			case "color":
				i.color = e;
				break;
			case "rotate":
				"string" == typeof e ? n[d] = wn(e) : "number" == typeof e && (n[d] = e);
				break;
			case "ariaHidden":
			case "aria-hidden":
				!0 !== e && "true" !== e && delete o["aria-hidden"];
				break;
			default: {
				const t = Nn[d];
				t ? !0 !== e && "true" !== e && 1 !== e || (n[t] = !0) : void 0 === Sn[d] && (o[d] = e);
			}
		}
	}
	const s = $t(e, n), c = s.attributes;
	if (n.inline && (i.verticalAlign = "-0.125em"), "svg" === r) return o.style = {
		...i,
		...a
	}, Object.assign(o, c), o.innerHTML = Yt(s.body), h("svg", o);
	const { body: u, width: f, height: p } = e, m = "mask" === r || "bg" !== r && -1 !== u.indexOf("currentColor"), h$1 = function(e, t) {
		let n = -1 === e.indexOf("xlink:") ? "" : " xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
		for (const o in t) n += " " + o + "=\"" + t[o] + "\"";
		return "<svg xmlns=\"http://www.w3.org/2000/svg\"" + n + ">" + e + "</svg>";
	}(u, {
		...c,
		width: f + "",
		height: p + ""
	});
	return o.style = {
		...i,
		"--svg": xn(h$1),
		width: zn(c.width),
		height: zn(c.height),
		...In,
		...m ? kn : En,
		...a
	}, h("span", o);
};
if (Lt(!0), On = nn, Gt[""] = On, "undefined" != typeof document && "undefined" != typeof window) {
	const e = window;
	if (void 0 !== e.IconifyPreload) {
		const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
		"object" == typeof t && null !== t && (t instanceof Array ? t : [t]).forEach((e) => {
			try {
				("object" != typeof e || null === e || e instanceof Array || "object" != typeof e.icons || "string" != typeof e.prefix || !Dt(e)) && console.error(n);
			} catch (t) {
				console.error(n);
			}
		});
	}
	if (void 0 !== e.IconifyProviders) {
		const t = e.IconifyProviders;
		if ("object" == typeof t && null !== t) for (let e in t) {
			const n = "IconifyProviders[" + e + "] is invalid.";
			try {
				const o = t[e];
				if ("object" != typeof o || !o || void 0 === o.resources) continue;
				Jt(e, o) || console.error(n);
			} catch (Qo) {
				console.error(n);
			}
		}
	}
}
var Mn = {
	...Tt,
	body: ""
};
var Rn = /* @__PURE__ */ defineComponent((e, { emit: t }) => {
	const n = /* @__PURE__ */ ref(null);
	function o() {
		n.value && (n.value.abort?.(), n.value = null);
	}
	const r = /* @__PURE__ */ ref(!!e.ssr), i = /* @__PURE__ */ ref(""), l = /* @__PURE__ */ shallowRef(null);
	function a() {
		const r = function() {
			const r = e.icon;
			if ("object" == typeof r && null !== r && "string" == typeof r.body) return i.value = "", { data: r };
			let l;
			if ("string" != typeof r || null === (l = bt(r, !1, !0))) return null;
			let s = Ft(l);
			if (!s) {
				const e = n.value;
				return e && e.name === r || (n.value = null === s ? { name: r } : {
					name: r,
					abort: vn([l], a)
				}), null;
			}
			o(), i.value !== r && (i.value = r, nextTick(() => {
				t("load", r);
			}));
			const c = e.customise;
			if (c) {
				s = Object.assign({}, s);
				const e = c(s.body, l.name, l.prefix, l.provider);
				"string" == typeof e && (s.body = e);
			}
			const u = ["iconify"];
			return "" !== l.prefix && u.push("iconify--" + l.prefix), "" !== l.provider && u.push("iconify--" + l.provider), {
				data: s,
				classes: u
			};
		}();
		r ? r.data !== l.value?.data && (l.value = r) : l.value = null;
	}
	return r.value ? a() : onMounted(() => {
		r.value = !0, a();
	}), watch(() => e.icon, a), onUnmounted(o), () => {
		const t = l.value;
		if (!t) return Cn(Mn, e);
		let n = e;
		return t.classes && (n = {
			...e,
			class: t.classes.join(" ")
		}), Cn({
			...Tt,
			...t.data
		}, n);
	};
}, {
	props: [
		"icon",
		"mode",
		"ssr",
		"width",
		"height",
		"style",
		"color",
		"inline",
		"rotate",
		"hFlip",
		"horizontalFlip",
		"vFlip",
		"verticalFlip",
		"flip",
		"id",
		"ariaHidden",
		"customise",
		"title"
	],
	emits: ["load"]
});
var Ln = ["innerHTML"];
var Fn = (e, t) => {
	const n = e.__vccOpts || e;
	for (const [o, r] of t) n[o] = r;
	return n;
};
var Dn = /*#__PURE__*/ Fn(/*@__PURE__*/ defineComponent({
	__name: "Icon",
	props: {
		data: {},
		color: { default: void 0 },
		size: { default: 24 }
	},
	setup(e) {
		useCssVars((e) => ({
			a2e94770: a.value,
			v22013bfc: l.value
		}));
		const t = e, l = computed(() => t.color), a = computed(() => "number" == typeof t.size ? t.size + "px" : t.size || "unset"), s = computed(() => !!t.data && function(e) {
			const t = /^\s*<svg\b[^>]*>[\s\S]*<\/svg>\s*$/i;
			try {
				if (!t.test(e)) return !1;
				const n = new DOMParser().parseFromString(e, "image/svg+xml");
				if (n.getElementsByTagName("parsererror").length > 0) return !1;
				const o = n.getElementsByTagName("svg");
				return o.length > 0 && o[0]?.parentNode === n;
			} catch {
				return !1;
			}
		}(t.data)), c = computed(() => t.data && s.value ? vt(t.data) ?? gt(t.data, t.data) : "");
		return (n, l) => s.value ? (openBlock(), createElementBlock("i", {
			key: 0,
			innerHTML: c.value
		}, null, 8, Ln)) : e.data ? (openBlock(), createBlock(unref(Rn), {
			key: 1,
			icon: e.data,
			color: t.color,
			width: t.size,
			height: t.size
		}, null, 8, [
			"icon",
			"color",
			"width",
			"height"
		])) : createCommentVNode("", !0);
	}
}), [["__scopeId", "data-v-4eb5d1bb"]]);
var Pn = "undefined" != typeof window && "undefined" != typeof document;
var jn = Object.prototype.toString;
var Un = () => {};
var Bn = /* #__PURE__ */ Hn();
function Hn() {
	var e, t, n;
	return Pn && !!(null === (e = window) || void 0 === e || null === (e = e.navigator) || void 0 === e ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || (null === (t = window) || void 0 === t || null === (t = t.navigator) || void 0 === t ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(null === (n = window) || void 0 === n ? void 0 : n.navigator.userAgent));
}
function $n(e) {
	return Array.isArray(e) ? e : [e];
}
function Gn(e, t = !0, n) {
	!function(e) {
		return e || getCurrentInstance();
	}(n) ? t ? e() : nextTick(e) : onMounted(e, n);
}
var qn = Pn ? window : void 0;
Pn && window.document, Pn && window.navigator, Pn && window.location;
function Xn(e) {
	var t;
	const n = toValue(e);
	return null !== (t = null == n ? void 0 : n.$el) && void 0 !== t ? t : n;
}
function Kn(...e) {
	const t = computed(() => {
		const t = $n(toValue(e[0])).filter((e) => null != e);
		return t.every((e) => "string" != typeof e) ? t : void 0;
	});
	return o = ([e, t, n, o], r, i) => {
		if (!(null == e ? void 0 : e.length) || !(null == t ? void 0 : t.length) || !(null == n ? void 0 : n.length)) return;
		const l = (a = o, "[object Object]" === jn.call(a) ? { ...o } : o);
		var a;
		const s = e.flatMap((e) => t.flatMap((t) => n.map((n) => ((e, t, n, o) => (e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o)))(e, t, n, l))));
		i(() => {
			s.forEach((e) => e());
		});
	}, r = { flush: "post" }, watch(() => {
		var n, o;
		return [
			null !== (n = null === (o = t.value) || void 0 === o ? void 0 : o.map((e) => Xn(e))) && void 0 !== n ? n : [qn].filter((e) => null != e),
			$n(toValue(t.value ? e[1] : e[0])),
			$n(unref(t.value ? e[2] : e[1])),
			toValue(t.value ? e[3] : e[2])
		];
	}, o, {
		...r,
		immediate: !0
	});
	var o, r;
}
var Qn = !1;
function Zn(e, t, n = {}) {
	const { window: o = qn, ignore: r = [], capture: i = !0, detectIframe: l = !1, controls: a = !1 } = n;
	if (!o) return a ? {
		stop: Un,
		cancel: Un,
		trigger: Un
	} : Un;
	if (Bn && !Qn) {
		Qn = !0;
		const e = { passive: !0 };
		Array.from(o.document.body.children).forEach((t) => t.addEventListener("click", Un, e)), o.document.documentElement.addEventListener("click", Un, e);
	}
	let s = !0;
	const c = (e) => toValue(r).some((t) => {
		if ("string" == typeof t) return Array.from(o.document.querySelectorAll(t)).some((t) => t === e.target || e.composedPath().includes(t));
		{
			const n = Xn(t);
			return n && (e.target === n || e.composedPath().includes(n));
		}
	});
	const u = (n) => {
		const o = Xn(e);
		null != n.target && (o instanceof Element || !function(e) {
			const t = toValue(e);
			return t && 16 === t.$.subTree.shapeFlag;
		}(e) || !function(e, t) {
			const n = toValue(e), o = n.$.subTree && n.$.subTree.children;
			return !(null == o || !Array.isArray(o)) && o.some((e) => e.el === t.target || t.composedPath().includes(e.el));
		}(e, n)) && o && o !== n.target && !n.composedPath().includes(o) && ("detail" in n && 0 === n.detail && (s = !c(n)), s ? t(n) : s = !0);
	};
	let d = !1;
	const f = [
		Kn(o, "click", (e) => {
			d || (d = !0, setTimeout(() => {
				d = !1;
			}, 0), u(e));
		}, {
			passive: !0,
			capture: i
		}),
		Kn(o, "pointerdown", (t) => {
			const n = Xn(e);
			s = !c(t) && !(!n || t.composedPath().includes(n));
		}, { passive: !0 }),
		l && Kn(o, "blur", (n) => {
			setTimeout(() => {
				const r = Xn(e);
				let i = o.document.activeElement;
				for (; null == i ? void 0 : i.shadowRoot;) i = i.shadowRoot.activeElement;
				"IFRAME" !== (null == i ? void 0 : i.tagName) || null != r && r.contains(o.document.activeElement) || t(n);
			}, 0);
		}, { passive: !0 })
	].filter(Boolean), p = () => f.forEach((e) => e());
	return a ? {
		stop: p,
		cancel: () => {
			s = !1;
		},
		trigger: (e) => {
			s = !0, u(e), s = !1;
		}
	} : p;
}
function Jn(e) {
	const t = function() {
		const e = /* @__PURE__ */ shallowRef(!1), t = getCurrentInstance();
		return t && onMounted(() => {
			e.value = !0;
		}, t), e;
	}();
	return computed(() => (t.value, Boolean(e())));
}
function eo(e, t, o = {}) {
	const { window: r = qn, ...i } = o;
	let l;
	const a = /* @__PURE__ */ Jn(() => r && "ResizeObserver" in r), s = () => {
		l && (l.disconnect(), l = void 0);
	}, c = watch(computed(() => {
		const t = toValue(e);
		return Array.isArray(t) ? t.map((e) => Xn(e)) : [Xn(t)];
	}), (e) => {
		if (s(), a.value && r) {
			l = new ResizeObserver(t);
			for (const t of e) t && l.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), d = () => {
		s(), c();
	};
	var f, p;
	return f = d, getCurrentScope() && onScopeDispose(f, p), {
		isSupported: a,
		stop: d
	};
}
Number.POSITIVE_INFINITY;
function to(e, t, n) {
	if (!n) return t;
	const o = "function" == typeof n ? n(e, t) : null == e ? void 0 : e[n];
	if (null == o) throw new Error(`Key is ${o} on item (keyField is ${function(e) {
		return null == e ? "null" : "function" == typeof e ? "a function" : `'${e}'`;
	}(n)})`);
	return o;
}
function no(e, t, n) {
	return to(e, t, n);
}
function oo(e, t) {
	return e.map((e, n) => no(e, n, t));
}
function ro(e, t, n) {
	if (!function(e, t, n) {
		if (!e || e.keys.length !== t.length || e.sizes.length !== t.length) return !1;
		for (let o = 0; o < t.length; o++) if (e.keys[o] !== no(t[o], o, n)) return !1;
		return !0;
	}(e, t, n)) return {};
	const o = {};
	for (let r = 0; r < e.keys.length; r++) {
		const t = e.sizes[r];
		"number" == typeof t && t > 0 && (o[e.keys[r]] = t);
	}
	return o;
}
function io(e, t, n, o, r, i = 0) {
	const l = r ?? "start";
	if ("nearest" === l) {
		const r = e + t;
		return e >= n && r <= n + o ? null : e < n ? e + i : r - o + i;
	}
	return "end" === l ? e + t - o + i : "center" === l ? e + (t - o) / 2 + i : e + i;
}
function lo(e) {
	return e.flowMode && "vertical" === e.direction && !e.gridItems ? "flow" : e.disableTransform ? "position" : "transform";
}
function ao(e) {
	return computed(() => toValue(e));
}
var so = 1e3;
function co(e) {
	return typeof window < "u" && e === window;
}
var uo = (() => {
	if (typeof document > "u") return "negative";
	const e = document.createElement("div"), t = document.createElement("div");
	e.style.width = "4px", e.style.height = "1px", e.style.overflow = "auto", e.style.direction = "rtl", t.style.width = "8px", t.style.height = "1px", e.appendChild(t), document.body.appendChild(e), e.scrollLeft = -1;
	const n = e.scrollLeft < 0;
	return document.body.removeChild(e), n ? "negative" : "default";
})();
function fo(e, t, n) {
	return "horizontal" !== t || !n || co(n) || "rtl" !== getComputedStyle(n).direction ? e : "negative" === uo ? -e : e;
}
function po(e, t, n, o) {
	const r = function(e, t, n) {
		return fo(e, t, n);
	}(n, t, e), i = !(null == o || !o.smooth);
	co(e) ? "vertical" === t ? e.scrollTo({
		top: r,
		behavior: i ? "smooth" : "auto"
	}) : e.scrollTo({
		left: r,
		behavior: i ? "smooth" : "auto"
	}) : "function" != typeof e.scrollTo ? "vertical" === t ? e.scrollTop = r : e.scrollLeft = r : e.scrollTo("vertical" === t ? {
		top: r,
		behavior: i ? "smooth" : "auto"
	} : {
		left: r,
		behavior: i ? "smooth" : "auto"
	});
}
var mo = /auto|scroll/;
function ho(e, t) {
	return null === e.parentNode ? t : ho(e.parentNode, [...t, e]);
}
function vo(e, t) {
	return getComputedStyle(e, null).getPropertyValue(t);
}
function go(e) {
	return mo.test(function(e) {
		return vo(e, "overflow") + vo(e, "overflow-y") + vo(e, "overflow-x");
	}(e));
}
function yo(e) {
	if (!(e instanceof HTMLElement || e instanceof SVGElement)) return;
	if (null === e.parentNode) return document.scrollingElement || document.documentElement;
	const t = ho(e.parentNode, []);
	for (let n = 0; n < t.length; n += 1) if (t[n] instanceof Element && go(t[n])) return t[n];
	return document.scrollingElement || document.documentElement;
}
var bo = !1;
if (typeof window < "u") {
	bo = !1;
	try {
		const e = Object.defineProperty({}, "passive", { get() {
			bo = !0;
		} });
		window.addEventListener("test", null, e);
	} catch {}
}
function wo(e) {
	return "number" == typeof e ? e : null;
}
function xo(e, t, n, o, r, i) {
	return "function" == typeof n ? n(e, t) || o || Number(r) || 0 : o || (null == e ? void 0 : e[i ?? "size"]) || Number(r) || 0;
}
var So = 0;
var To = [];
function Io(e, t) {
	return e.map((e) => function(e, t) {
		return e && "object" == typeof e ? e[t] : void 0;
	}(e, t));
}
function ko(e) {
	const t = e;
	t._vs_visibilityStamp++, t._vs_styleStamp++;
}
function Eo(e, t, o, r, i, l) {
	const a = ao(e), s = function(e, t, o, r, i) {
		const l = ao(e);
		return {
			el: computed(() => {
				const e = l.value.el;
				return toValue(t ?? e);
			}),
			before: computed(() => {
				const e = l.value.before;
				return toValue(o ?? e);
			}),
			after: computed(() => {
				const e = l.value.after;
				return toValue(r ?? e);
			}),
			scrollParent: computed(() => {
				const e = l.value.scrollParent;
				return toValue(e);
			}),
			callbacks: {
				onResize: () => {
					var e;
					return null == (e = (null == i ? void 0 : i.onResize) ?? l.value.onResize) ? void 0 : e();
				},
				onVisible: () => {
					var e;
					return null == (e = (null == i ? void 0 : i.onVisible) ?? l.value.onVisible) ? void 0 : e();
				},
				onHidden: () => {
					var e;
					return null == (e = (null == i ? void 0 : i.onHidden) ?? l.value.onHidden) ? void 0 : e();
				},
				onUpdate: (e, t, n, o) => {
					var r;
					return null == (r = (null == i ? void 0 : i.onUpdate) ?? l.value.onUpdate) ? void 0 : r(e, t, n, o);
				}
			}
		};
	}(a, t, o, r, i), c = computed(() => {
		const e = toValue(ee().items);
		return function(e) {
			for (let t = 0; t < e.length; t++) e[t];
		}(e), e;
	}), u = /* @__PURE__ */ ref([]), d = /* @__PURE__ */ ref(0), f = /* @__PURE__ */ ref(0), m = /* @__PURE__ */ ref(0), v = /* @__PURE__ */ ref(!1);
	let g = 0, x = 0, S = 0, T = 0, k = !1, E = null;
	const _ = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map();
	let z = !1, O = 0, C = 0, R = !1, L = null, F = null, D = null, P = 0, j = null, B = null, H = [], $ = [], V = null, W = null, Y = null, G = !1, q = !1, X = !1;
	const K = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ ref({}), Z = [], J = { accumulator: 0 };
	function ee() {
		return a.value;
	}
	function te() {
		return (null == l ? void 0 : l.pageMode) ?? ee().pageMode;
	}
	const ne = computed(() => toValue(ee().enabled ?? !0)), oe = computed(() => function(e, t) {
		if (t) return t;
		if (!e) return;
		const n = yo(e);
		return n ? typeof window < "u" && window.document && (n === window.document.documentElement || n === window.document.body) ? window : n : void 0;
	}(s.el.value, s.scrollParent.value)), re = computed(() => {
		const e = c.value;
		return e.length > 0 && "object" != typeof e[0];
	}), ie = computed(() => {
		const e = ee();
		if (null === wo(e.itemSize)) {
			const t = c.value, n = Array.from({ length: t.length });
			J.accumulator = 0, n[-1] = J;
			const o = e.minItemSize, r = Q.value, i = re.value;
			let l, a = 1e4, s = 0;
			for (let c = 0, u = t.length; c < u; c++) {
				const u = i ? c : to(t[c], c, e.keyField);
				l = xo(t[c], c, e.itemSize, r[u], o, e.sizeField), l < a && (a = l), s += l;
				const d = Z[c] ?? (Z[c] = {
					accumulator: 0,
					size: void 0
				});
				d.accumulator = s, d.size = l, n[c] = d;
			}
			return Z.length = t.length, P = a, n;
		}
		return To;
	}), le = computed(() => u.value.filter((e) => (e._vs_visibilityStamp, e.nr.used)).sort((e, t) => e.nr.index - t.nr.index)), ae = computed(() => {
		const e = ee(), t = re.value ? null : e.keyField;
		return function(e, t, n) {
			const o = [], r = [];
			for (let i = 0; i < e.length; i++) {
				const l = e[i], a = no(l, i, t), s = n(l, i, a);
				o.push(a), r.push("number" == typeof s && s > 0 ? s : null);
			}
			return {
				keys: o,
				sizes: r
			};
		}(c.value, t, (t, n, o) => function(e, t, n, o, r) {
			return "number" == typeof n ? n : "function" == typeof n ? n(e, t) || o || void 0 : o || (null == e ? void 0 : e[r ?? "size"]) || void 0;
		}(t, n, e.itemSize, Q.value[o], e.sizeField));
	});
	function se(e = ee()) {
		return e.direction ?? "vertical";
	}
	function ce(e = ee()) {
		const t = se(e);
		let n = e.flowMode ?? !1;
		return n && "vertical" !== t && (q || (console.warn("[vue-recycle-scroller] flowMode only supports vertical lists. Falling back to standard positioning."), q = !0), n = !1), n && e.gridItems && (X || (console.warn("[vue-recycle-scroller] flowMode does not support gridItems. Falling back to standard positioning."), X = !0), n = !1), lo({
			direction: t,
			disableTransform: e.disableTransform ?? !1,
			flowMode: n,
			gridItems: e.gridItems
		});
	}
	function ue() {
		u.value.sort((e, t) => e.nr.used !== t.nr.used ? e.nr.used ? -1 : 1 : e.nr.used && t.nr.used ? e.nr.index - t.nr.index : e.nr.id - t.nr.id);
	}
	function de(e) {
		const t = ee();
		return Q.value = ro(e, c.value, re.value ? null : t.keyField), Object.keys(Q.value).length > 0;
	}
	function fe(e) {
		let t = N.get(e);
		return t || (t = [], N.set(e, t)), t;
	}
	function pe(e, t) {
		const n = u.value, o = n.indexOf(e);
		if (-1 === o) return;
		const r = Math.max(0, Math.min(t, n.length - 1));
		o !== r && (n.splice(o, 1), n.splice(r, 0, e));
	}
	function me(e, t = !1) {
		fe(e.nr.type).push(e), e.nr.used = !1, e.position = ee().hiddenPosition ?? -999999, ko(e), _.delete(e.nr.key), t && function(e) {
			pe(e, u.value.length - 1);
		}(e);
	}
	function he(e) {
		let t = -1;
		return t = requestAnimationFrame(() => {
			K.delete(t), e();
		}), K.add(t), t;
	}
	function ve() {
		for (const e of K) cancelAnimationFrame(e);
		K.clear();
	}
	function ge() {
		L && (clearTimeout(L), L = null), F && (clearTimeout(F), F = null), D && (clearTimeout(D), D = null), W && (clearTimeout(W), W = null), Y && (clearTimeout(Y), Y = null);
	}
	function ye() {
		var e, t;
		ne.value && (null == (t = (e = s.callbacks).onResize) || t.call(e), v.value && Oe(!1));
	}
	function be() {
		if (!ne.value) return;
		V && !G && ke();
		const e = ee();
		if (!z) {
			if (z = !0, L) return;
			const t = () => he(() => {
				z = !1;
				const { continuous: t } = Oe(!1, !0);
				t || (F && clearTimeout(F), F = setTimeout(be, e.updateInterval + 100));
			});
			t(), e.updateInterval && (L = setTimeout(() => {
				L = null, z && t();
			}, e.updateInterval));
		}
	}
	function we() {
		const e = s.before.value;
		return e ? "vertical" === se(ee()) ? e.scrollHeight : e.scrollWidth : 0;
	}
	function xe() {
		const e = s.el.value;
		if (!e) return {
			start: 0,
			end: 0
		};
		const t = se(ee()), n = "vertical" === t;
		let o;
		if (te()) {
			const t = e.getBoundingClientRect(), r = n ? t.height : t.width, i = oe.value, l = !i || i === window, a = l ? 0 : i.getBoundingClientRect().top, s = l ? 0 : i.getBoundingClientRect().left, c = l ? window.innerHeight : i.clientHeight, u = l ? window.innerWidth : i.clientWidth;
			let d = n ? -(t.top - a) : -(t.left - s), f = n ? c : u;
			d < 0 && (f += d, d = 0), d + f > r && (f = r - d), o = {
				start: d,
				end: d + f
			};
		} else o = n ? {
			start: e.scrollTop,
			end: e.scrollTop + e.clientHeight
		} : {
			start: fo(e.scrollLeft, t, e),
			end: fo(e.scrollLeft, t, e) + e.clientWidth
		};
		return o;
	}
	function Se(e) {
		const t = ee(), n = wo(t.itemSize);
		if (null !== n) return n;
		const o = ie.value[e];
		return (null == o ? void 0 : o.size) || Number(t.minItemSize) || 0;
	}
	function Te(e) {
		var t;
		const n = ee(), o = n.gridItems || 1, r = wo(n.itemSize);
		return e <= 0 ? 0 : null !== r ? Math.floor(e / o) * r : (null == (t = ie.value[e - 1]) ? void 0 : t.accumulator) || 0;
	}
	function Ie(e) {
		const t = ee(), n = c.value.length, o = t.gridItems || 1, r = wo(t.itemSize);
		if (!n) return 0;
		if (null !== r) {
			const t = Math.floor(e / r) * o;
			return Math.min(Math.max(t, 0), n - 1);
		}
		let i = 0, l = n - 1, a = 0;
		for (; i <= l;) {
			const t = Math.floor((i + l) / 2);
			Te(t) <= e ? (a = t, i = t + 1) : l = t - 1;
		}
		return a;
	}
	function ke() {
		W && (clearTimeout(W), W = null), V = null;
	}
	function Ee(e) {
		if (!V) return !1;
		const t = ee(), n = oo(e ?? c.value, re.value ? null : t.keyField).indexOf(V.key);
		if (-1 === n) return ke(), !1;
		const o = we() + Te(n) + V.offset, r = xe().start;
		return !(Math.abs(o - r) < .5) && (G = !0, Re(o), he(() => {
			G = !1;
		}), !0);
	}
	function _e() {
		if (Ae(), !ne.value) return;
		const e = te() ? oe.value ?? window : s.el.value;
		e && (j = e, j.addEventListener("scroll", be, !!bo && { passive: !0 }), te() && e === window && (B = e, B.addEventListener("resize", ye)));
	}
	function Ae() {
		j && (j.removeEventListener("scroll", be), j = null), B && (B.removeEventListener("resize", ye), B = null);
	}
	function Ne(e, t, n, o) {
		if (1 !== Math.abs(e - t) || t < 0 || t >= n) return e;
		const r = e > t ? Te(t) + Se(t) : Te(t);
		return Math.abs(r - o) <= 8 ? t : e;
	}
	function ze(e, t, n, o, r) {
		if (1 !== Math.abs(e - t)) return e;
		const i = r ? t - 1 : t;
		if (i < 0 || i >= n) return e;
		const l = e > t ? Te(i) + Se(i) : Te(i);
		return Math.abs(l - o) <= 8 ? t : e;
	}
	function Oe(e, t = !1) {
		var n, o, r, i, l, a, h, v, y;
		if (!ne.value) return { continuous: !0 };
		const b = ee(), w = wo(b.itemSize), I = b.gridItems || 1, z = b.itemSecondarySize || w || 0, M = P, L = b.typeField, F = re.value ? null : b.keyField, j = c.value, U = j.length, B = ie.value, H = _, $ = u.value;
		let V, W, G, q, X, K = null, Q = null;
		const Z = null !== w || 0 === U || null != B[U - 1];
		if (U && Z) if (R) V = q = 0, W = X = Math.min(b.prerender, j.length), G = 0;
		else {
			const e = xe(), n = function() {
				const e = s.el.value;
				if (!e) return {
					start: 0,
					end: 0
				};
				if ("vertical" === se(ee())) {
					const t = fo(e.scrollLeft, "horizontal", e);
					return {
						start: t,
						end: t + e.clientWidth
					};
				}
				return {
					start: e.scrollTop,
					end: e.scrollTop + e.clientHeight
				};
			}(), c = O, u = C, d = { ...e }, f = { ...n };
			if (t) {
				let t = e.start - c;
				t < 0 && (t = -t);
				let o = n.start - u;
				o < 0 && (o = -o);
				const r = null === w && function(e, t, n, o) {
					var r, i, l, a;
					const s = we(), c = e.start - o - s, u = e.end + o - s;
					return g > 0 && c <= ((null == (r = n[g - 1]) ? void 0 : r.accumulator) ?? 0) || g < t - 1 && c > ((null == (i = n[g]) ? void 0 : i.accumulator) ?? Number.POSITIVE_INFINITY) || x > 1 && u <= ((null == (l = n[x - 2]) ? void 0 : l.accumulator) ?? 0) || x < t && u > ((null == (a = n[x - 1]) ? void 0 : a.accumulator) ?? Number.POSITIVE_INFINITY);
				}(e, U, B, b.buffer);
				if (!(null === w && (t >= M || r) || null !== w && t >= w || I > 1 && null != w && o >= z)) return { continuous: !0 };
			}
			O = e.start, C = n.start;
			const p = b.buffer;
			d.start -= p, d.end += p, f.start -= p, f.end += p;
			let m = 0;
			const v = s.before.value;
			v && (m = v.scrollHeight, d.start -= m);
			const y = s.after.value;
			if (y) {
				const e = y.scrollHeight;
				d.end += e;
			}
			const _ = "flow" === ce(b) && null === w && !t && k && Math.abs(e.start - c) <= 1 && Math.abs(n.start - u) <= 1;
			if (null === w) {
				let t, n, s = 0, c = U - 1, u = ~~(U / 2);
				do
					n = u, t = (null == (o = B[u]) ? void 0 : o.accumulator) ?? 0, t < d.start ? s = u : u < U - 1 && ((null == (r = B[u + 1]) ? void 0 : r.accumulator) ?? Number.POSITIVE_INFINITY) > d.start && (c = u), u = ~~((s + c) / 2);
				while (u !== n);
				for (u < 0 && (u = 0), V = u, G = (null == (i = B[U - 1]) ? void 0 : i.accumulator) ?? 0, W = u; W < U && ((null == (l = B[W]) ? void 0 : l.accumulator) ?? 0) < d.end; W++);
				for (-1 === W ? W = j.length - 1 : (W++, W > U && (W = U)), q = V; q < U && m + ((null == (a = B[q]) ? void 0 : a.accumulator) ?? Number.POSITIVE_INFINITY) < d.start; q++);
				for (X = q; X < U && m + ((null == (h = B[X]) ? void 0 : h.accumulator) ?? 0) < d.end; X++);
				if (_) {
					const t = function(e, t, n) {
						const o = {
							...e,
							visibleStartIndex: Ne(e.visibleStartIndex, S, t, n.rawViewportStart),
							visibleEndIndex: ze(e.visibleEndIndex, T, t, n.rawViewportEnd, !1),
							startIndex: Ne(e.startIndex, g, t, n.renderStart),
							endIndex: ze(e.endIndex, x, t, n.renderEnd, !0)
						};
						o.startIndex > o.visibleStartIndex && (o.startIndex = o.visibleStartIndex);
						const r = Math.min(t, o.visibleEndIndex + 1);
						return o.endIndex < r && (o.endIndex = r), o.endIndex < o.startIndex && (o.endIndex = o.startIndex), o;
					}({
						startIndex: V,
						endIndex: W,
						visibleStartIndex: q,
						visibleEndIndex: X
					}, U, {
						rawViewportStart: e.start - m,
						rawViewportEnd: e.end - m,
						renderStart: e.start - p - m,
						renderEnd: e.end + p - m
					});
					V = t.startIndex, W = t.endIndex, q = t.visibleStartIndex, X = t.visibleEndIndex;
				}
				E = {
					startIndex: V,
					endIndex: W,
					visibleStartIndex: q,
					visibleEndIndex: X,
					totalSizeValue: G
				};
			} else if (I > 1) {
				const e = function(e, t, n, o, r, i) {
					const l = Math.ceil(e / t) * n, a = Math.max(0, Math.floor(r.start / n)), s = Math.min(Math.ceil(r.end / n), Math.ceil(e / t)), c = Math.max(0, Math.floor(i.start / o)), u = Math.min(Math.ceil(i.end / o), t), d = [];
					for (let m = a; m < s; m++) {
						const n = m * t;
						for (let t = c; t < u; t++) {
							const o = n + t;
							if (o >= e) break;
							d.push(o);
						}
					}
					const f = d[0] ?? 0, p = d.at(-1) ?? -1;
					return {
						renderedIndices: d,
						startIndex: f,
						endIndex: p + 1,
						visibleStartIndex: f,
						visibleEndIndex: p,
						totalSize: l
					};
				}(U, I, w, z, d, f);
				K = e.renderedIndices, Q = new Set(K), V = e.startIndex, W = e.endIndex, q = e.visibleStartIndex, X = e.visibleEndIndex, G = e.totalSize;
			} else {
				V = ~~(d.start / w * I);
				V -= V % I, W = Math.ceil(d.end / w * I), q = Math.max(0, Math.floor((d.start - m) / w * I)), X = Math.floor((d.end - m) / w * I), V < 0 && (V = 0), W > U && (W = U), q < 0 && (q = 0), X > U && (X = U), G = Math.ceil(U / I) * w;
			}
		}
		else U && E ? (V = Math.min(E.startIndex, U), W = Math.min(E.endIndex, U), q = Math.min(E.visibleStartIndex, U), X = Math.min(E.visibleEndIndex, U), G = (null == (n = B[U - 1]) ? void 0 : n.accumulator) ?? E.totalSizeValue) : V = W = q = X = G = 0;
		let J;
		W - V > so && function() {
			throw Y = setTimeout(() => {
				Y = null, console.warn("It seems the scroller element isn't scrolling, so it tries to render all the items at once.", "Scroller:", s.el.value), console.warn("Make sure the scroller has a fixed height (or width) and 'overflow-y' (or 'overflow-x') set to 'auto' so it can scroll correctly and only render the items visible in the scroll viewport.");
			}), /* @__PURE__ */ new Error("Rendered items limit reached");
		}(), d.value = G, f.value = 0, m.value = "flow" === ce(b) ? G : 0;
		const te = V <= x && W >= g, oe = "flow" === ce(b), le = oe && te && !e;
		let ae = null;
		if (!te || e) (function() {
			_.clear(), N.clear();
			for (let e = 0, t = u.value.length; e < t; e++) {
				const t = u.value[e];
				t && me(t);
			}
		})();
		else {
			const e = (e) => {
				const t = $[e];
				t && (J = t, J.nr.used && ((Q ? Q.has(J.nr.index) : J.nr.index >= V && J.nr.index < W) || me(J, le)));
			};
			if (le) {
				for (let t = $.length - 1; t >= 0; t--) e(t);
				ae = function() {
					const e = u.value;
					let t = 0;
					for (; t < e.length && !e[t].nr.used;) t++;
					let n = 0;
					for (let o = t; o < e.length && e[o].nr.used; o++) n++;
					return {
						activeStart: t,
						activeCount: n,
						headInsertCount: 0
					};
				}();
			} else for (let t = 0, n = $.length; t < n; t++) e(t);
		}
		let de, he, ve = null, ge = 0;
		return function(e, t, n, o) {
			if (n) for (const r of n) o(r);
			else for (let r = e; r < t; r++) o(r);
		}(V, W, K, (e) => {
			var t;
			const n = B[e] && B[e].size, o = w || n || P || 1;
			de = j[e];
			const r = F ? to(de, e, F) : e;
			J = H.get(r);
			let i = !1;
			if (J) J.item !== de && (J.item = de), J.nr.used || console.warn(`Expected existing view's used flag to be true, got ${J.nr.used}`);
			else {
				if (he = de[L], J = function(e) {
					const t = fe(e);
					if (t && t.length) {
						const e = t.pop();
						return e.nr.used = !0, ko(e), e;
					}
				}(he), J) {
					const t = J.nr.index !== e || J.nr.key !== r;
					J.item = de, J.nr.index = e, J.nr.key = r, J.nr.type !== he && console.warn("Reused view's type does not match pool's type"), t && function(e) {
						e._vs_styleStamp++;
					}(J);
				} else J = function(e, t, n, o, r) {
					const i = /* @__PURE__ */ shallowReactive({
						item: n,
						position: 0,
						offset: 0,
						nr: markRaw({
							id: So++,
							index: t,
							used: !0,
							key: o,
							type: r
						}),
						_vs_styleStamp: 0,
						_vs_visibilityStamp: 0
					});
					return e.push(i), i;
				}($, e, de, r, he);
				H.set(r, J), i = !0;
			}
			null === w ? (J.position = (null == (t = B[e - 1]) ? void 0 : t.accumulator) || 0, J.offset = 0) : (J.position = Math.floor(e / I) * w, J.offset = e % I * z), ae && i && function(e, t, n) {
				let o = null;
				t < g ? (o = n.activeStart + n.headInsertCount, n.headInsertCount++, n.activeCount++) : t >= x && (o = n.activeStart + n.activeCount, n.activeCount++), null != o && pe(e, o);
			}(J, e, ae), ve ?? (ve = J.position), ge += o;
		}), oe ? (null == ve ? (f.value = 0, m.value = G) : (f.value = ve, m.value = Math.max(0, G - ve - ge)), le || ue()) : (f.value = 0, m.value = 0), g = V, x = W, S = q, T = X, k = !0, b.emitUpdate && (null == (y = (v = s.callbacks).onUpdate) || y.call(v, V, W, q, X)), "flow" !== ce(b) && (D && clearTimeout(D), D = setTimeout(Me, b.updateInterval + 300)), { continuous: te };
	}
	function Ce() {
		if (function() {
			const e = ee(), t = wo(e.itemSize);
			if (!e.gridItems || null == t) return !1;
			const n = s.el.value;
			if (!n) return !1;
			const o = e.itemSecondarySize || t, r = "vertical" === se(e) ? n.clientWidth : n.clientHeight;
			return o * e.gridItems > r;
		}()) return !1;
		const e = u.value.filter(({ nr: e }) => e.used);
		for (let t = 1; t < e.length; t++) if (e[t].nr.index !== e[t - 1].nr.index + 1) return !0;
		return !1;
	}
	function Me() {
		if (ne.value) {
			if ("flow" === ce()) return void ue();
			u.value.sort((e, t) => e.nr.index - t.nr.index), Ce() && (Oe(!1), D && clearTimeout(D));
		}
	}
	function Re(e, t) {
		if (!ne.value) return;
		const n = se(ee()), o = s.el.value;
		if (o) if (te()) {
			const r = oe.value ?? window, i = "vertical" === n ? "top" : "left", l = r === window, a = l ? document.scrollingElement || document.documentElement : r, s = a.getBoundingClientRect(), c = o.getBoundingClientRect(), u = l ? "vertical" === n ? window.scrollY : window.scrollX : fo("vertical" === n ? a.scrollTop : a.scrollLeft, n, a), d = c[i] - s[i];
			po(l ? window : a, n, e + u + d, t);
		} else po(o, n, e, t);
	}
	const Le = ee(), Fe = c.value;
	return H = oo(Fe, Fe.length > 0 && "object" != typeof Fe[0] ? null : Le.keyField), $ = Io(Fe, Le.typeField), Le.cache && de(Le.cache), ne.value && Le.prerender && (R = !0, Oe(!1)), Le.gridItems && null == wo(Le.itemSize) && console.error("[vue-recycle-scroller] You must provide an itemSize when using gridItems"), onMounted(() => {
		ne.value && (_e(), nextTick(() => {
			R = !1, Oe(!0), v.value = !0;
		}));
	}), onActivated(() => {
		if (!ne.value) return;
		const e = O;
		"number" == typeof e && nextTick(() => {
			Re(e);
		});
	}), onBeforeUnmount(() => {
		ge(), ve(), Ae();
	}), watch(ne, (e) => {
		e ? (_e(), nextTick(() => {
			Oe(!0), v.value = !0;
		})) : (Ae(), ge(), ve(), v.value = !1);
	}), watch(() => ee().cache, (e) => {
		ne.value && (de(e), Oe(!0));
	}), watch(() => toValue(ee().items).slice(), (e, t) => {
		if (!ne.value) return;
		const n = ee(), o = re.value ? null : n.keyField, r = oo(e, o), i = Io(e, n.typeField), l = H, a = !function(e, t, n, o) {
			if (e.length !== n.length || t.length !== o.length) return !1;
			for (let r = 0; r < e.length; r++) if (e[r] !== n[r] || t[r] !== o[r]) return !1;
			return !0;
		}(r, i, l, $);
		n.shift && function(e, t) {
			if (!e.length || t.length <= e.length) return 0;
			const n = e[0], o = t.indexOf(n);
			if (o <= 0 || o + e.length < t.length && e.length > t.length - o) return 0;
			for (let r = 0; r < e.length; r++) if (t[o + r] !== e[r]) return 0;
			return o;
		}(l, r) > 0 ? function(e, t) {
			if (!e.length) return void ke();
			const n = Math.max(xe().start - we(), 0), o = Math.min(Ie(n), e.length - 1), r = e[o], i = t ? to(r, o, t) : o, l = we() + Te(o);
			V = {
				key: i,
				offset: xe().start - l
			};
		}(t ?? [], o) : ke(), H = r, $ = i, Ee(e), Oe(a);
	}), watch(() => ee().keyField, () => {
		if (!ne.value) return;
		const e = ee(), t = re.value ? null : e.keyField;
		H = oo(c.value, t), $ = Io(c.value, e.typeField), ke(), Oe(!0);
	}), watch(() => ee().typeField, () => {
		if (!ne.value) return;
		const e = ee();
		$ = Io(c.value, e.typeField), ke(), Oe(!0);
	}), watch(te, () => {
		ne.value && (Ae(), _e(), Oe(!1));
	}), watch(s.el, () => {
		ne.value && (Ae(), _e(), Oe(!1));
	}), watch(oe, () => {
		!ne.value || !te() || (Ae(), _e(), Oe(!1));
	}), watch(ie, () => {
		ne.value && (Ee() && (W && clearTimeout(W), W = setTimeout(() => {
			V = null, W = null;
		}, 150)), Oe(!1));
	}), watch(() => ee().gridItems, () => {
		ne.value && Oe(!0);
	}), watch(() => ee().itemSecondarySize, () => {
		ne.value && Oe(!0);
	}), {
		pool: u,
		visiblePool: le,
		totalSize: d,
		startSpacerSize: f,
		endSpacerSize: m,
		ready: v,
		sizes: ie,
		simpleArray: re,
		scrollToItem: function(e, t) {
			if (!ne.value) return;
			const n = ee(), o = se(n), r = s.el.value;
			if (!r) return;
			const i = Math.max(0, Math.min(e, c.value.length - 1)), l = xe().start, a = function(e, t, n, o) {
				if (n) {
					if (o && o !== window) {
						const e = o;
						return "vertical" === t ? e.clientHeight : e.clientWidth;
					}
					return "vertical" === t ? window.innerHeight : window.innerWidth;
				}
				return "vertical" === t ? e.clientHeight : e.clientWidth;
			}(r, o, n.pageMode, oe.value), u = io(Te(i), Se(i), l, a, null == t ? void 0 : t.align, (null == t ? void 0 : t.offset) ?? 0);
			if (null == u) return;
			Re(u, t);
			const d = wo(n.itemSize);
			if (n.gridItems && null != d) {
				const e = s.el.value;
				if (!e) return;
				const r = n.gridItems, l = n.itemSecondarySize || d, a = "vertical" === o ? "horizontal" : "vertical", c = io(i % r * l, l, "horizontal" === a ? fo(e.scrollLeft, "horizontal", e) : e.scrollTop, "horizontal" === a ? e.clientWidth : e.clientHeight, null == t ? void 0 : t.align, (null == t ? void 0 : t.offset) ?? 0);
				null != c && po(e, a, c, t);
			}
		},
		scrollToPosition: Re,
		getScroll: xe,
		findItemIndex: Ie,
		getItemOffset: Te,
		getItemSize: Se,
		getViewStyle: function(e) {
			const t = ee();
			return function(e, t) {
				const n = "vertical" === t.direction, o = t.mode ?? "transform", r = {
					visibility: e.nr.used ? "visible" : "hidden",
					pointerEvents: e.nr.used ? void 0 : "none"
				};
				if ("flow" === o ? r.display = e.nr.used ? void 0 : "none" : (r.position = "absolute", r.top = "0px", r.left = "0px", r.display = void 0), "position" === o ? (r[n ? "top" : "left"] = `${e.position}px`, r[n ? "left" : "top"] = `${e.offset}px`, r.transform = "none", r.willChange = "unset") : "transform" === o && (r.transform = n ? `translateY(${e.position}px) translateX(${e.offset}px)` : `translateX(${e.position}px) translateY(${e.offset}px)`, r.willChange = "transform"), t.gridItems && null != t.itemSize) {
					const e = t.itemSecondarySize || t.itemSize;
					r.width = `${n ? e : t.itemSize}px`, r.height = `${n ? t.itemSize : e}px`;
				}
				return r;
			}(e, {
				direction: se(t),
				mode: ce(t),
				itemSize: wo(t.itemSize),
				gridItems: t.gridItems,
				itemSecondarySize: t.itemSecondarySize
			});
		},
		cacheSnapshot: ae,
		restoreCache: de,
		updateVisibleItems: Oe,
		handleResize: ye,
		handleVisibilityChange: function(e, t) {
			var n, o, r, i;
			ne.value && v.value && (e || 0 !== t.boundingClientRect.width || 0 !== t.boundingClientRect.height ? (null == (o = (n = s.callbacks).onVisible) || o.call(n), he(() => {
				Oe(!1);
			})) : null == (i = (r = s.callbacks).onHidden) || i.call(r));
		},
		sortViews: Me
	};
}
var _o = /* @__PURE__ */ new WeakMap();
function Ao(e, t) {
	No(e);
	const n = function(e) {
		return "function" == typeof e ? {
			callback: e,
			observer: null,
			intersection: void 0,
			visible: null
		} : {
			callback: e.callback,
			observer: null,
			intersection: e.intersection,
			visible: null
		};
	}(t.value);
	if (_o.set(e, n), typeof IntersectionObserver > "u") {
		const t = e.getBoundingClientRect();
		n.visible = !0, n.callback(!0, { boundingClientRect: t });
		return;
	}
	n.observer = new IntersectionObserver((e) => {
		const t = e[0], o = !(null == t || !t.isIntersecting);
		null !== n.visible && n.visible === o || (n.visible = o, n.callback(o, t));
	}, n.intersection), n.observer.observe(e);
}
function No(e) {
	const t = _o.get(e);
	null != t && t.observer && (t.observer.disconnect(), t.observer = null);
}
var zo = {
	mounted(e, t) {
		Ao(e, t);
	},
	updated(e, t) {
		t.value !== t.oldValue && Ao(e, t);
	},
	unmounted(e) {
		No(e), _o.delete(e);
	}
};
var Oo = /* @__PURE__ */ defineComponent({
	__name: "ItemView",
	props: {
		view: {},
		itemTag: {}
	},
	setup(e) {
		const t = e;
		return (e, n) => (openBlock(), createBlock(resolveDynamicComponent(t.itemTag), { class: "vue-recycle-scroller__item-view" }, {
			default: withCtx(() => [renderSlot(e.$slots, "default", {
				item: t.view.item,
				index: t.view.nr.index,
				active: t.view.nr.used
			})]),
			_: 3
		}));
	}
});
var Co = /* @__PURE__ */ ((e, t) => {
	const n = e.__vccOpts || e;
	for (const [o, r] of t) n[o] = r;
	return n;
})(/* @__PURE__ */ defineComponent({
	__name: "ResizeObserver",
	emits: ["notify"],
	setup(e, { emit: t }) {
		const n = t, o = /* @__PURE__ */ ref();
		let r = null, l = null;
		function a() {
			n("notify");
		}
		return onMounted(() => {
			var e;
			const t = null == (e = o.value) ? void 0 : e.parentElement;
			if (t) {
				if (typeof ResizeObserver < "u") return r = new ResizeObserver(() => {
					a();
				}), void r.observe(t);
				l = () => a(), window.addEventListener("resize", l);
			}
		}), onBeforeUnmount(() => {
			r && (r.disconnect(), r = null), l && (window.removeEventListener("resize", l), l = null);
		}), (e, t) => (openBlock(), createElementBlock("div", {
			ref_key: "el",
			ref: o,
			class: "vue-recycle-scroller__resize-observer",
			"aria-hidden": "true"
		}, null, 512));
	}
}), [["__scopeId", "data-v-08cc04ab"]]);
var Mo = /* @__PURE__ */ defineComponent({
	__name: "RecycleScroller",
	props: {
		items: {},
		keyField: { default: "id" },
		direction: { default: "vertical" },
		listTag: { default: "div" },
		itemTag: { default: "div" },
		itemSize: { default: null },
		gridItems: { default: void 0 },
		itemSecondarySize: { default: void 0 },
		minItemSize: { default: null },
		sizeField: { default: "size" },
		typeField: { default: "type" },
		buffer: { default: 200 },
		pageMode: {
			type: Boolean,
			default: !1
		},
		scrollParent: { default: void 0 },
		shift: {
			type: Boolean,
			default: !1
		},
		cache: { default: void 0 },
		prerender: { default: 0 },
		emitUpdate: {
			type: Boolean,
			default: !1
		},
		disableTransform: {
			type: Boolean,
			default: !1
		},
		flowMode: {
			type: Boolean,
			default: !1
		},
		hiddenPosition: { default: void 0 },
		updateInterval: { default: 0 },
		skipHover: {
			type: Boolean,
			default: !1
		},
		enabled: {
			type: Boolean,
			default: !0
		},
		listClass: { default: "" },
		itemClass: { default: "" }
	},
	emits: [
		"resize",
		"visible",
		"hidden",
		"update",
		"scrollStart",
		"scrollEnd"
	],
	setup(t, { expose: l, emit: s }) {
		const c = t, u = s, d = zo, f = /* @__PURE__ */ ref(), p = /* @__PURE__ */ ref(), h = /* @__PURE__ */ ref(), y = /* @__PURE__ */ ref(null), b = /* @__PURE__ */ toRef(c, "items"), { pool: w, visiblePool: x, totalSize: S, startSpacerSize: A, endSpacerSize: N, ready: z, scrollToItem: M, scrollToPosition: L, getScroll: F, findItemIndex: D, getItemOffset: P, getItemSize: j, getViewStyle: U, cacheSnapshot: $, restoreCache: V, updateVisibleItems: W, handleResize: Y, handleVisibilityChange: G } = Eo(computed(() => ({
			items: b,
			el: f,
			before: p,
			after: h,
			keyField: c.keyField,
			direction: c.direction,
			itemSize: c.itemSize,
			gridItems: c.gridItems,
			itemSecondarySize: c.itemSecondarySize,
			minItemSize: c.minItemSize,
			sizeField: c.sizeField,
			typeField: c.typeField,
			buffer: c.buffer,
			pageMode: c.pageMode,
			scrollParent: c.scrollParent,
			shift: c.shift,
			cache: c.cache,
			prerender: c.prerender,
			emitUpdate: c.emitUpdate,
			disableTransform: c.disableTransform,
			flowMode: c.flowMode,
			hiddenPosition: c.hiddenPosition,
			updateInterval: c.updateInterval,
			enabled: c.enabled,
			onResize: () => u("resize"),
			onVisible: () => u("visible"),
			onHidden: () => u("hidden"),
			onUpdate: (e, t, n, o) => {
				u("update", e, t, n, o), n <= 0 && u("scrollStart"), o >= c.items.length - 1 && u("scrollEnd");
			}
		}))), q = computed(() => "flow" === lo({
			direction: c.direction,
			disableTransform: c.disableTransform,
			flowMode: c.flowMode,
			gridItems: c.gridItems
		})), X = computed(() => ({ height: `${A.value}px` })), K = computed(() => ({ height: `${N.value}px` }));
		const Q = computed(() => {
			const e = { ["vertical" === c.direction ? "minHeight" : "minWidth"]: `${S.value}px` }, t = wo(c.itemSize);
			if (c.gridItems && null != t) {
				const n = (c.itemSecondarySize || t) * c.gridItems;
				e["vertical" === c.direction ? "minWidth" : "minHeight"] = `${n}px`;
			}
			return e;
		});
		return l({
			el: f,
			visiblePool: x,
			startSpacerSize: A,
			endSpacerSize: N,
			scrollToItem: M,
			scrollToPosition: L,
			getScroll: F,
			findItemIndex: D,
			getItemOffset: P,
			getItemSize: j,
			cacheSnapshot: $,
			restoreCache: V,
			updateVisibleItems: W
		}), (t, n) => withDirectives((openBlock(), createElementBlock("div", {
			ref_key: "el",
			ref: f,
			class: normalizeClass(["vue-recycle-scroller", {
				"grid-mode": c.gridItems,
				"flow-mode": q.value,
				ready: unref(z),
				"page-mode": c.pageMode,
				[`direction-${c.direction}`]: !0
			}])
		}, [
			t.$slots.before ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref_key: "before",
				ref: p,
				class: "vue-recycle-scroller__slot"
			}, [renderSlot(t.$slots, "before")], 512)) : createCommentVNode("", !0),
			(openBlock(), createBlock(resolveDynamicComponent(c.listTag), {
				style: normalizeStyle(Q.value),
				class: normalizeClass(["vue-recycle-scroller__item-wrapper", c.listClass])
			}, {
				default: withCtx(() => [
					q.value && unref(A) > 0 ? (openBlock(), createBlock(resolveDynamicComponent(c.itemTag), {
						key: 0,
						"aria-hidden": "true",
						class: "vue-recycle-scroller__item-spacer",
						style: normalizeStyle(X.value)
					}, null, 8, ["style"])) : createCommentVNode("", !0),
					(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(w), (e) => (openBlock(), createBlock(Oo, mergeProps({
						key: e.nr.id,
						view: e,
						"item-tag": c.itemTag,
						style: unref(z) ? unref(U)(e) : null,
						class: ["vue-recycle-scroller__item-view", [c.itemClass, { hover: !c.skipHover && y.value === e.nr.key }]]
					}, toHandlers(c.skipHover ? {} : {
						mouseenter: () => {
							(function(e) {
								y.value = e;
							})(e.nr.key);
						},
						mouseleave: () => {
							y.value = null;
						}
					})), {
						default: withCtx((e) => [renderSlot(t.$slots, "default", mergeProps({ ref_for: !0 }, e))]),
						_: 2
					}, 1040, [
						"view",
						"item-tag",
						"style",
						"class"
					]))), 128)),
					q.value && unref(N) > 0 ? (openBlock(), createBlock(resolveDynamicComponent(c.itemTag), {
						key: 1,
						"aria-hidden": "true",
						class: "vue-recycle-scroller__item-spacer",
						style: normalizeStyle(K.value)
					}, null, 8, ["style"])) : createCommentVNode("", !0),
					0 === c.items.length ? renderSlot(t.$slots, "empty", { key: 2 }) : createCommentVNode("", !0)
				]),
				_: 3
			}, 8, ["style", "class"])),
			t.$slots.after ? (openBlock(), createElementBlock("div", {
				key: 1,
				ref_key: "after",
				ref: h,
				class: "vue-recycle-scroller__slot"
			}, [renderSlot(t.$slots, "after")], 512)) : createCommentVNode("", !0),
			createVNode(Co, { onNotify: unref(Y) }, null, 8, ["onNotify"])
		], 2)), [[unref(d), unref(G)]]);
	}
});
var Ro = [
	"aria-expanded",
	"tabindex",
	"onKeydown"
];
var Lo = {
	key: 0,
	class: "multiple"
};
var Fo = {
	key: 0,
	class: "v3ip__badge"
};
var Do = ["onClick"];
var Po = {
	key: 0,
	class: "item"
};
var jo = {
	key: 1,
	class: "v3ip__badge v3ip__badge--single"
};
var Uo = {
	key: 1,
	class: "placeholder"
};
var Bo = { class: "v3ip__panel" };
var Ho = { class: "v3ip__search" };
var $o = ["placeholder"];
var Vo = {
	key: 0,
	class: "v3ip__meta"
};
var Wo = [
	"title",
	"aria-pressed",
	"onClick"
];
var Yo = {
	key: 2,
	class: "v3ip__empty"
};
var Go = {
	key: 1,
	class: "default-text"
};
var Xo = /*#__PURE__*/ Fn(/* @__PURE__ */ defineComponent({
	__name: "Picker",
	props: {
		searchPlaceholder: { default: "Search" },
		placeholder: { default: void 0 },
		modelValue: {},
		multiple: {
			type: Boolean,
			default: !1
		},
		iconLibrary: { default: void 0 },
		selectedIconBgColor: { default: "transparent" },
		selectedIconColor: { default: "#2b5fe0" },
		displaySearch: {
			type: Boolean,
			default: !0
		},
		multipleLimit: { default: 1 / 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		selectedItemsToDisplay: { default: 9 },
		clearable: {
			type: Boolean,
			default: !1
		},
		valueType: { default: "name" },
		includeIcons: { default: () => [] },
		excludeIcons: { default: () => [] },
		emptyText: { default: "Nothing to show" },
		inputSize: { default: "medium" },
		theme: { default: "light" }
	},
	emits: ["change", "update:modelValue"],
	setup(s, { emit: c }) {
		useCssVars((e) => ({ e8dae32e: unref(p) }));
		const u = s, d = c, p = /* @__PURE__ */ ref(u.selectedIconBgColor), m = /* @__PURE__ */ ref(""), h = /* @__PURE__ */ ref(!1), g = /* @__PURE__ */ ref([]), y = /* @__PURE__ */ ref(!1), b = /* @__PURE__ */ ref(0), w = computed(() => {
			if (!u.iconLibrary) return;
			const e = Array.isArray(u.iconLibrary) ? u.iconLibrary : [u.iconLibrary];
			return e.length ? e : void 0;
		}), x = /* @__PURE__ */ ref(), S = async () => {
			const e = w.value;
			return e ? 1 === e.length ? q(e[0]) : async function(e, t = {}) {
				if (!e.length) return [];
				const n = "number" == typeof t.limit ? Math.max(1, Math.floor(t.limit / e.length)) : void 0;
				return (await Promise.all(e.map((e) => q(e, {
					...t,
					limit: n
				})))).flat();
			}(e) : (x.value || (x.value = function(e = Y) {
				return e[Math.floor(Math.random() * e.length)];
			}()), q(x.value));
		};
		let _ = 0;
		const A = async (e) => {
			const t = ++_;
			y.value = !0;
			try {
				const n = e.trim() ? await async function(e, t = {}) {
					const n = e.trim();
					if (!n) return [];
					const { prefixes: o, limit: r = G, apiBase: i = W } = t, l = new URLSearchParams({
						query: n,
						limit: String(r)
					});
					o && o.length && l.set("prefixes", o.join(","));
					try {
						return ((await (await fetch(`${i}/search?${l.toString()}`)).json()).icons ?? []).flatMap((e) => {
							const [t, n] = e.split(":");
							return t && n ? [{
								name: e,
								prefix: t,
								icon: n
							}] : [];
						});
					} catch (a) {
						return console.error("Failed to search icons", a), [];
					}
				}(e, { prefixes: w.value }) : await S();
				if (t !== _) return;
				g.value = ((e) => e.filter((e) => {
					const t = !u.includeIcons || !u.includeIcons.length || u.includeIcons.includes(e.name), n = !u.excludeIcons || !u.excludeIcons.length || !u.excludeIcons.includes(e.name);
					return t && n;
				}))(n), b.value++;
			} finally {
				t === _ && (y.value = !1);
			}
		}, O = function(e, t) {
			let n;
			return (...o) => {
				n && clearTimeout(n), n = setTimeout(() => e(...o), t);
			};
		}(A, 300);
		watch(m, (e) => O(e)), watch(w, () => {
			m.value.trim() || A("");
		}, {
			immediate: !0,
			deep: !0
		});
		const C = computed(() => y.value ? "Loading…" : ""), M = () => {
			m.value = "";
		}, K = async (e) => "name" === u.valueType ? e.name : async function(e, { loadIcon: t, buildIcon: n }) {
			const o = vt(e);
			if (o) return o;
			try {
				const o = n(await t(e));
				return gt(e, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.attributes.viewBox}">${o.body}</svg>`);
			} catch (r) {
				console.error(`Failed to load icon ${e}`, r);
				return;
			}
		}(e.name, {
			loadIcon: gn,
			buildIcon: $t
		}), Q = (e) => {
			const t = function(e, t, { multiple: n, multipleLimit: o, clearable: r }) {
				if (n) {
					const n = Array.isArray(e) ? e : [], r = n.indexOf(t);
					if (r > -1) {
						const e = [...n];
						return e.splice(r, 1), e;
					}
					if (n.length >= o) return;
					return [...n, t];
				}
				return e === t ? r ? null : void 0 : t;
			}(u.modelValue, e, {
				multiple: u.multiple,
				multipleLimit: u.multipleLimit,
				clearable: u.clearable
			});
			void 0 !== t && (d("update:modelValue", t), d("change", t));
		}, Z = (e) => {
			Q(e);
		}, J = () => {
			const e = u.multiple ? [] : null;
			d("update:modelValue", e), d("change", e);
		}, ee = (e) => {
			if ("name" === u.valueType) return X(u.modelValue, e.name, u.multiple);
			const t = vt(e.name);
			return !!t && X(u.modelValue, t, u.multiple);
		}, te = useTemplateRef("picker");
		Zn(te, () => h.value = !1);
		const ne = () => {
			u.disabled || (h.value = !h.value);
		}, oe = (e) => {
			"Escape" === e.key && h.value && (e.stopPropagation(), h.value = !1);
		}, re = useTemplateRef("scroller"), { width: ie } = function(e, t = {
			width: 0,
			height: 0
		}, o = {}) {
			const { window: r = qn, box: i = "content-box" } = o, l = computed(() => {
				var t;
				return null === (t = Xn(e)) || void 0 === t || null === (t = t.namespaceURI) || void 0 === t ? void 0 : t.includes("svg");
			}), a = /* @__PURE__ */ shallowRef(t.width), s = /* @__PURE__ */ shallowRef(t.height), { stop: c } = eo(e, ([t]) => {
				const n = "border-box" === i ? t.borderBoxSize : "content-box" === i ? t.contentBoxSize : t.devicePixelContentBoxSize;
				if (r && l.value) {
					const t = Xn(e);
					if (t) {
						const e = t.getBoundingClientRect();
						a.value = e.width, s.value = e.height;
					}
				} else if (n) {
					const e = $n(n);
					a.value = e.reduce((e, { inlineSize: t }) => e + t, 0), s.value = e.reduce((e, { blockSize: t }) => e + t, 0);
				} else a.value = t.contentRect.width, s.value = t.contentRect.height;
			}, o);
			Gn(() => {
				const n = Xn(e);
				if (n && "offsetWidth" in n) if ("content-box" === i && r) {
					const e = r.getComputedStyle(n), t = Number.parseFloat(e.paddingLeft) + Number.parseFloat(e.paddingRight), o = Number.parseFloat(e.paddingTop) + Number.parseFloat(e.paddingBottom), i = Number.parseFloat(e.borderLeftWidth) + Number.parseFloat(e.borderRightWidth), l = Number.parseFloat(e.borderTopWidth) + Number.parseFloat(e.borderBottomWidth);
					a.value = n.offsetWidth - t - i, s.value = n.offsetHeight - o - l;
				} else a.value = n.offsetWidth, s.value = n.offsetHeight;
				else n && (a.value = t.width, s.value = t.height);
			});
			const u = watch(() => Xn(e), (e) => {
				a.value = e ? t.width : 0, s.value = e ? t.height : 0;
			});
			return {
				width: a,
				height: s,
				stop: function() {
					c(), u();
				}
			};
		}(re), le = computed(() => ie.value ? Math.max(3, Math.min(6, Math.floor(ie.value / 50))) : 6), ae = computed(() => le.value ? ie.value / le.value : 0), se = useSlots();
		return (n, s) => (openBlock(), createElementBlock("div", {
			ref_key: "picker",
			ref: te,
			class: normalizeClass(`v3ip__custom-select v3ip__${u.inputSize} v3ip__${u.theme}`),
			onKeydown: oe
		}, [createBaseVNode("div", {
			class: normalizeClass(["v3ip__selected", {
				open: unref(h),
				disabled: u.disabled
			}]),
			role: "button",
			"aria-expanded": unref(h),
			tabindex: u.disabled ? -1 : 0,
			onClick: ne,
			onKeydown: [withKeys(withModifiers(ne, ["prevent"]), ["enter"]), withKeys(withModifiers(ne, ["prevent"]), ["space"])]
		}, [!u.multiple && u.modelValue || u.multiple && u.modelValue?.length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [u.multiple ? (openBlock(), createElementBlock("div", Lo, [Array.isArray(u.modelValue) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(u.modelValue || [], (t, n) => (openBlock(), createElementBlock(Fragment, { key: n }, [n < u.selectedItemsToDisplay ? (openBlock(), createElementBlock("span", Fo, [createVNode(Dn, {
			class: "v3ip__badge-icon",
			data: t,
			size: 12,
			color: "dark" == u.theme ? "#f2f2f3" : "#111114"
		}, null, 8, ["data", "color"]), createBaseVNode("button", {
			type: "button",
			class: "v3ip__badge-remove",
			title: "Remove",
			onClick: withModifiers((e) => Z(t), ["stop"])
		}, [...s[2] || (s[2] = [createBaseVNode("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.4",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, [createBaseVNode("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), createBaseVNode("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})], -1)])], 8, Do)])) : createCommentVNode("", !0)], 64))), 128)), u.modelValue?.length > u.selectedItemsToDisplay ? (openBlock(), createElementBlock("div", Po, [createBaseVNode("b", null, " +" + toDisplayString(u.modelValue?.length - u.selectedItemsToDisplay), 1)])) : createCommentVNode("", !0)], 64)) : createCommentVNode("", !0), Array.isArray(u.modelValue) && u.modelValue.length ? (openBlock(), createElementBlock("button", {
			key: 1,
			type: "button",
			class: "v3ip__clear-all",
			title: "Clear all",
			onClick: withModifiers(J, ["stop"])
		}, [...s[3] || (s[3] = [createBaseVNode("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, [createBaseVNode("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), createBaseVNode("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})], -1)])])) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("span", jo, [createVNode(Dn, {
			class: "v3ip__badge-icon",
			data: u.modelValue,
			size: 12,
			color: "dark" == u.theme ? "#f2f2f3" : "#111114"
		}, null, 8, ["data", "color"]), u.clearable ? (openBlock(), createElementBlock("button", {
			key: 0,
			type: "button",
			class: "v3ip__badge-remove",
			title: "Remove",
			onClick: s[0] || (s[0] = withModifiers((e) => Z(u.modelValue), ["stop"]))
		}, [...s[4] || (s[4] = [createBaseVNode("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.4",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, [createBaseVNode("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), createBaseVNode("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})], -1)])])) : createCommentVNode("", !0)]))], 64)) : (openBlock(), createElementBlock("span", Uo, toDisplayString(u.placeholder), 1)), createBaseVNode("span", { class: normalizeClass(["v3ip__chevron", { open: unref(h) }]) }, [...s[5] || (s[5] = [createBaseVNode("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, [createBaseVNode("polyline", { points: "6 9 12 15 18 9" })], -1)])], 2)], 42, Ro), createVNode(Transition, { name: "fade" }, {
			default: withCtx(() => {
				return [withDirectives(createBaseVNode("div", Bo, [
					withDirectives(createBaseVNode("div", Ho, [
						s[7] || (s[7] = createBaseVNode("svg", {
							class: "v3ip__search-icon",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round"
						}, [createBaseVNode("circle", {
							cx: "11",
							cy: "11",
							r: "7"
						}), createBaseVNode("line", {
							x1: "21",
							y1: "21",
							x2: "16.65",
							y2: "16.65"
						})], -1)),
						withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": s[1] || (s[1] = (e) => /* @__PURE__ */ isRef(m) ? m.value = e : null),
							type: "text",
							name: "search",
							"aria-label": "Search icons",
							placeholder: u.searchPlaceholder
						}, null, 8, $o), [[vModelText, unref(m)]]),
						unref(m) ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: "v3ip__clear",
							title: "Clear search",
							onClick: M
						}, [...s[6] || (s[6] = [createBaseVNode("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round"
						}, [createBaseVNode("line", {
							x1: "18",
							y1: "6",
							x2: "6",
							y2: "18"
						}), createBaseVNode("line", {
							x1: "6",
							y1: "6",
							x2: "18",
							y2: "18"
						})], -1)])])) : createCommentVNode("", !0)
					], 512), [[vShow, u.displaySearch]]),
					unref(C) ? (openBlock(), createElementBlock("div", Vo, toDisplayString(unref(C)), 1)) : createCommentVNode("", !0),
					unref(g) && unref(g).length ? (openBlock(), createBlock(unref(Mo), {
						key: unref(b),
						ref_key: "scroller",
						ref: re,
						class: "v3ip__items",
						"key-field": "name",
						items: unref(g),
						"item-size": 30,
						"grid-items": unref(le),
						"item-secondary-size": unref(ae)
					}, {
						default: withCtx(({ item: e }) => [createBaseVNode("button", {
							type: "button",
							class: normalizeClass({ active: ee(e) }),
							title: e.name,
							"aria-pressed": ee(e),
							onClick: (t) => (async (e) => {
								const t = await K(e);
								void 0 !== t && Q(t);
							})(e)
						}, [createVNode(Dn, {
							data: e.name,
							size: 14,
							color: ee(e) ? u.selectedIconColor : "dark" == u.theme ? "#f2f2f3" : "#111114"
						}, null, 8, ["data", "color"])], 10, Wo)]),
						_: 1
					}, 8, [
						"items",
						"grid-items",
						"item-secondary-size"
					])) : (openBlock(), createElementBlock("div", Yo, [(e = "empty", se[e] ? renderSlot(n.$slots, "empty", {}, void 0, !0, 0) : (openBlock(), createElementBlock("div", Go, [createBaseVNode("small", null, toDisplayString(u.emptyText), 1)])))]))
				], 512), [[vShow, unref(h)]])];
				var e;
			}),
			_: 3
		})], 34));
	}
}), [["__scopeId", "data-v-8c18f1e3"]]);
var Ko = { install(e, t) {
	e.component(t?.name || "Vue3IconPicker", Xo);
} };
//#endregion
//#region src/App.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "playground-card" };
var _hoisted_2 = { class: "control-group" };
var _hoisted_3 = { class: "chips" };
var _hoisted_4 = ["onClick"];
var _hoisted_5 = { class: "control-row" };
var _hoisted_6 = { class: "control-group" };
var _hoisted_7 = { class: "chips" };
var _hoisted_8 = { class: "control-group" };
var _hoisted_9 = { class: "chips" };
var _hoisted_10 = ["disabled"];
var _hoisted_11 = { class: "picker-stage" };
//#endregion
//#region src/App.vue
var App_default = /* @__PURE__ */ defineComponent({
	__name: "App",
	setup(__props) {
		const selection = /* @__PURE__ */ ref(null);
		const darkMode = /* @__PURE__ */ ref(false);
		const clearable = /* @__PURE__ */ ref(false);
		const multipleSelection = /* @__PURE__ */ ref(false);
		const selectedLibraries = /* @__PURE__ */ ref(["tabler"]);
		const inputSize = /* @__PURE__ */ ref("medium");
		const iconLibraries = [
			"ant-design",
			"carbon",
			"fa",
			"fluent",
			"ion",
			"material-symbols",
			"tabler"
		];
		const isSelected = (lib) => {
			return selectedLibraries.value.find((l) => l == lib);
		};
		const toggleSelectedLibraries = (lib) => {
			const index = selectedLibraries.value.findIndex((l) => l == lib);
			if (index > -1) selectedLibraries.value.splice(index, 1);
			else selectedLibraries.value.push(lib);
		};
		const toggleMultipleSelection = () => {
			selection.value = null;
			multipleSelection.value = !multipleSelection.value;
			if (multipleSelection.value) clearable.value = false;
		};
		const toggleDarkMode = () => {
			darkMode.value = !darkMode.value;
		};
		const toggleClearable = () => {
			if (multipleSelection.value) return;
			clearable.value = !clearable.value;
		};
		return (_ctx, _cache) => {
			const _component_Vue3IconPicker = resolveComponent("Vue3IconPicker");
			return openBlock(), createElementBlock("div", { class: normalizeClass(["playground", { dark: unref(darkMode) }]) }, [createBaseVNode("section", _hoisted_1, [
				_cache[10] || (_cache[10] = createBaseVNode("p", { class: "eyebrow" }, "vue3-icon-picker", -1)),
				_cache[11] || (_cache[11] = createBaseVNode("h1", null, "Playground", -1)),
				createBaseVNode("div", _hoisted_2, [_cache[7] || (_cache[7] = createBaseVNode("p", { class: "control-label" }, "Libraries", -1)), createBaseVNode("div", _hoisted_3, [(openBlock(), createElementBlock(Fragment, null, renderList(iconLibraries, (lib) => {
					return createBaseVNode("button", {
						key: lib,
						type: "button",
						class: normalizeClass(["chip", { selected: isSelected(lib) }]),
						onClick: ($event) => toggleSelectedLibraries(lib)
					}, toDisplayString(lib), 11, _hoisted_4);
				}), 64))])]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [_cache[8] || (_cache[8] = createBaseVNode("p", { class: "control-label" }, "Size", -1)), createBaseVNode("div", _hoisted_7, [
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(["chip", { selected: unref(inputSize) == "small" }]),
						onClick: _cache[0] || (_cache[0] = ($event) => inputSize.value = "small")
					}, " Small ", 2),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(["chip", { selected: unref(inputSize) == "medium" }]),
						onClick: _cache[1] || (_cache[1] = ($event) => inputSize.value = "medium")
					}, " Medium ", 2),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(["chip", { selected: unref(inputSize) == "large" }]),
						onClick: _cache[2] || (_cache[2] = ($event) => inputSize.value = "large")
					}, " Large ", 2)
				])]), createBaseVNode("div", _hoisted_8, [_cache[9] || (_cache[9] = createBaseVNode("p", { class: "control-label" }, "Options", -1)), createBaseVNode("div", _hoisted_9, [
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(["chip", { selected: unref(multipleSelection) }]),
						onClick: _cache[3] || (_cache[3] = ($event) => toggleMultipleSelection())
					}, " Multiple ", 2),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(["chip", { selected: unref(darkMode) }]),
						onClick: _cache[4] || (_cache[4] = ($event) => toggleDarkMode())
					}, " Dark mode ", 2),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(["chip", {
							selected: unref(clearable),
							disabled: unref(multipleSelection)
						}]),
						disabled: unref(multipleSelection),
						onClick: _cache[5] || (_cache[5] = ($event) => toggleClearable())
					}, " Clearable ", 10, _hoisted_10)
				])])]),
				createBaseVNode("div", _hoisted_11, [createVNode(_component_Vue3IconPicker, {
					modelValue: unref(selection),
					"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => /* @__PURE__ */ isRef(selection) ? selection.value = $event : null),
					"icon-library": unref(selectedLibraries),
					multiple: unref(multipleSelection),
					clearable: unref(clearable),
					placeholder: "Select icon(s)",
					style: {
						"width": "100%",
						"max-width": "320px"
					},
					"input-size": unref(inputSize),
					theme: unref(darkMode) ? "dark" : "light"
				}, null, 8, [
					"modelValue",
					"icon-library",
					"multiple",
					"clearable",
					"input-size",
					"theme"
				])])
			])], 2);
		};
	}
});
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/icon-picker/" + dep;
};
var seen = {};
//#endregion
//#region src/main.ts
(function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return import.meta.resolve(specifier);
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			).href;
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			dep = importMetaResolve(dep);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
})(() => Promise.resolve({}), __vite__mapDeps([0]));
createApp(App_default).use(Ko).mount("#app");
//#endregion
