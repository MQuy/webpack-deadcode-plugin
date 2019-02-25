/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "753c3a2ce59f934694a9";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.css":
/*!*****************!*\
  !*** ./app.css ***!
  \*****************/
/*! exports provided: abcdef, xxx */
/*! exports used: notExist, xxx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export abcdef */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return xxx; });

var _content = __webpack_require__(/*! !./node_modules/css-loader??ref--5-1!./app.css */ "./node_modules/css-loader/index.js?!./app.css");

if(typeof _content === 'string') _content = [[module.i, _content, '']];

var _transform;
var _insertInto;



var _options = {"hmr":true}

_options.transform = _transform
_options.insertInto = undefined;

var _update = __webpack_require__(/*! ./node_modules/es6-css-loader/src/style-loader/lib/addStyles.js */ "./node_modules/es6-css-loader/src/style-loader/lib/addStyles.js")(_content, _options);

if(true) {
	module.hot.accept(/*! !./node_modules/css-loader??ref--5-1!./app.css */ "./node_modules/css-loader/index.js?!./app.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !./node_modules/css-loader??ref--5-1!./app.css */ "./node_modules/css-loader/index.js?!./app.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(_content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		_update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { _update(); });
}
// extracted by style-loader
const abcdef = "_1DbMug7DVSpXvNLyPQ-kjP";
const xxx = "GlPQplUrnlvsck4QEoOs4 gkFEy45fBh7FLpvCb4CV3";

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! exports provided: reload */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reload", function() { return reload; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _unused__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unused */ "./unused.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.css */ "./app.css");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





Object(_unused__WEBPACK_IMPORTED_MODULE_2__[/* demo */ "a"])();
Object(_unused__WEBPACK_IMPORTED_MODULE_2__[/* xyz */ "b"])();

class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "removeStory", story => () => {
      const {
        stories
      } = this.state;
      const index = stories.findIndex(s => s.id == story.id);
      stories.splice(index, 1);
      this.setState(stories);
    });

    this.state = {
      stories: [{
        id: 1,
        name: "[Webpack] — Smart Loading Assets For Production",
        url: "https://hackernoon.com/webpack-smart-loading-assets-for-production-3571e0a29c2e"
      }, {
        id: 2,
        name: "V8 Engine Overview",
        url: "https://medium.com/@MQuy90/v8-engine-overview-7c965731ced4"
      }]
    };
  }

  render() {
    const {
      stories
    } = this.state;
    return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("ul", null, stories.map((story, index) => Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Story, {
      key: index,
      story: story,
      onRemove: this.removeStory
    }))));
  }

}

class Story extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClick", () => {
      this.setState({
        likes: this.state.likes + 1
      });
    });

    this.state = {
      likes: Math.ceil(Math.random() * 100)
    };
  }

  render() {
    const {
      story,
      onRemove
    } = this.props;
    const {
      likes
    } = this.state;
    return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("li", {
      className: _app_css__WEBPACK_IMPORTED_MODULE_3__["notExist"]
    }, Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
      onClick: this.handleClick
    }, likes, "\u2764\uFE0F"), Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      className: _app_css__WEBPACK_IMPORTED_MODULE_3__[/* xxx */ "b"],
      href: story.url
    }, story.name), Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
      onClick: onRemove(story)
    }, "Remove"));
  }

}

function reload() {
  Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(App, null), document.getElementById("root"));
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./app.js");

Object(_app__WEBPACK_IMPORTED_MODULE_0__["reload"])();

if (true) {
  module.hot.accept(/*! ./app */ "./app.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./app.js");
(() => Object(_app__WEBPACK_IMPORTED_MODULE_0__["reload"])())(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML; // Reference to https://github.com/sindresorhus/ansi-regex

var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete

};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete

};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});
/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */

function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  } // Cache opened sequence.


  var ansiCodes = []; // Replace with markup.

  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq];

    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      } // Open tag.


      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }

    var ct = _closeTags[seq];

    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }

    return '';
  }); // Make sure tags are closed.

  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}
/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */


ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }

  var _finalColors = {};

  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;

    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }

    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }

      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }

      var defHexColor = _defColors[key];

      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }

      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }

      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }

    _finalColors[key] = hex;
  }

  _setTags(_finalColors);
};
/**
 * Reset colors.
 */


ansiHTML.reset = function () {
  _setTags(_defColors);
};
/**
 * Expose tags, including open and close.
 * @type {Object}
 */


ansiHTML.tags = {};

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}

function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]; // inverse

  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]; // dark grey

  _openTags['90'] = 'color:#' + colors.darkgrey;

  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}

ansiHTML.reset();

/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./app.css":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./app.css ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!./node_modules/css-loader??ref--5-1!./vendor.css */ "./node_modules/css-loader/index.js?!./vendor.css"), undefined);

// module
exports.push([module.i, "._1DbMug7DVSpXvNLyPQ-kjP {\r\n  display: inline;\r\n}\r\n\r\n.GlPQplUrnlvsck4QEoOs4 {\r\n  float: left;\r\n}", ""]);

// exports
exports.locals = {
	"abcdef": "_1DbMug7DVSpXvNLyPQ-kjP",
	"xxx": "GlPQplUrnlvsck4QEoOs4 " + __webpack_require__(/*! -!./node_modules/css-loader??ref--5-1!./vendor.css */ "./node_modules/css-loader/index.js?!./vendor.css").locals["zzzz"] + ""
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./vendor.css":
/*!********************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./vendor.css ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".gkFEy45fBh7FLpvCb4CV3 {\r\n  margin: auto;\r\n}\r\n\r\n._3D_Pdj4iGUsoIk5UUgtjZp {\r\n  padding: auto;\r\n}", ""]);

// exports
exports.locals = {
	"zzzz": "gkFEy45fBh7FLpvCb4CV3",
	"kkkk": "_3D_Pdj4iGUsoIk5UUgtjZp"
};

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media " + item[2] + "{" + content + "}";
      } else {
        return content;
      }
    }).join("");
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === "string") modules = [[null, modules, ""]];
    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];
      if (typeof id === "number") alreadyImportedModules[id] = true;
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      //  when a module is imported multiple times with different media queries.
      //  I hope this will never occur (Hey this way we have smaller bundles)

      if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/es6-css-loader/src/style-loader/lib/addStyles.js":
/*!***********************************************************************!*\
  !*** ./node_modules/es6-css-loader/src/style-loader/lib/addStyles.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/es6-css-loader/src/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}

/***/ }),

/***/ "./node_modules/es6-css-loader/src/style-loader/lib/urls.js":
/*!******************************************************************!*\
  !*** ./node_modules/es6-css-loader/src/style-loader/lib/urls.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),

/***/ "./node_modules/html-entities/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-entities/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ "./node_modules/html-entities/lib/xml-entities.js"),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ "./node_modules/html-entities/lib/html4-entities.js"),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js"),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js")
};

/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
var alphaIndex = {};
var numIndex = {};
var i = 0;
var length = HTML_ALPHA.length;

while (i < length) {
  var a = HTML_ALPHA[i];
  var c = HTML_CODES[i];
  alphaIndex[a] = String.fromCharCode(c);
  numIndex[c] = a;
  i++;
}
/**
 * @constructor
 */


function Html4Entities() {}
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.prototype.decode = function (str) {
  if (!str || !str.length) {
    return '';
  }

  return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
    var chr;

    if (entity.charAt(0) === "#") {
      var code = entity.charAt(1).toLowerCase() === 'x' ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1));

      if (!(isNaN(code) || code < -32768 || code > 65535)) {
        chr = String.fromCharCode(code);
      }
    } else {
      chr = alphaIndex[entity];
    }

    return chr || s;
  });
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.decode = function (str) {
  return new Html4Entities().decode(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.prototype.encode = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var alpha = numIndex[str.charCodeAt(i)];
    result += alpha ? "&" + alpha + ";" : str.charAt(i);
    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.encode = function (str) {
  return new Html4Entities().encode(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.prototype.encodeNonUTF = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var cc = str.charCodeAt(i);
    var alpha = numIndex[cc];

    if (alpha) {
      result += "&" + alpha + ";";
    } else if (cc < 32 || cc > 126) {
      result += "&#" + cc + ";";
    } else {
      result += str.charAt(i);
    }

    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.encodeNonUTF = function (str) {
  return new Html4Entities().encodeNonUTF(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.prototype.encodeNonASCII = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var c = str.charCodeAt(i);

    if (c <= 255) {
      result += str[i++];
      continue;
    }

    result += '&#' + c + ';';
    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


Html4Entities.encodeNonASCII = function (str) {
  return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;

/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
var alphaIndex = {};
var charIndex = {};
createIndexes(alphaIndex, charIndex);
/**
 * @constructor
 */

function Html5Entities() {}
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.prototype.decode = function (str) {
  if (!str || !str.length) {
    return '';
  }

  return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
    var chr;

    if (entity.charAt(0) === "#") {
      var code = entity.charAt(1) === 'x' ? parseInt(entity.substr(2).toLowerCase(), 16) : parseInt(entity.substr(1));

      if (!(isNaN(code) || code < -32768 || code > 65535)) {
        chr = String.fromCharCode(code);
      }
    } else {
      chr = alphaIndex[entity];
    }

    return chr || s;
  });
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.decode = function (str) {
  return new Html5Entities().decode(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.prototype.encode = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var charInfo = charIndex[str.charCodeAt(i)];

    if (charInfo) {
      var alpha = charInfo[str.charCodeAt(i + 1)];

      if (alpha) {
        i++;
      } else {
        alpha = charInfo[''];
      }

      if (alpha) {
        result += "&" + alpha + ";";
        i++;
        continue;
      }
    }

    result += str.charAt(i);
    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.encode = function (str) {
  return new Html5Entities().encode(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.prototype.encodeNonUTF = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var c = str.charCodeAt(i);
    var charInfo = charIndex[c];

    if (charInfo) {
      var alpha = charInfo[str.charCodeAt(i + 1)];

      if (alpha) {
        i++;
      } else {
        alpha = charInfo[''];
      }

      if (alpha) {
        result += "&" + alpha + ";";
        i++;
        continue;
      }
    }

    if (c < 32 || c > 126) {
      result += '&#' + c + ';';
    } else {
      result += str.charAt(i);
    }

    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.encodeNonUTF = function (str) {
  return new Html5Entities().encodeNonUTF(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.prototype.encodeNonASCII = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var c = str.charCodeAt(i);

    if (c <= 255) {
      result += str[i++];
      continue;
    }

    result += '&#' + c + ';';
    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


Html5Entities.encodeNonASCII = function (str) {
  return new Html5Entities().encodeNonASCII(str);
};
/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */


function createIndexes(alphaIndex, charIndex) {
  var i = ENTITIES.length;
  var _results = [];

  while (i--) {
    var e = ENTITIES[i];
    var alpha = e[0];
    var chars = e[1];
    var chr = chars[0];
    var addChar = chr < 32 || chr > 126 || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
    var charInfo;

    if (addChar) {
      charInfo = charIndex[chr] = charIndex[chr] || {};
    }

    if (chars[1]) {
      var chr2 = chars[1];
      alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);

      _results.push(addChar && (charInfo[chr2] = alpha));
    } else {
      alphaIndex[alpha] = String.fromCharCode(chr);

      _results.push(addChar && (charInfo[''] = alpha));
    }
  }
}

module.exports = Html5Entities;

/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
  '&lt': '<',
  '&gt': '>',
  '&quot': '"',
  '&apos': '\'',
  '&amp': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': '\'',
  '&amp;': '&'
};
var CHAR_INDEX = {
  60: 'lt',
  62: 'gt',
  34: 'quot',
  39: 'apos',
  38: 'amp'
};
var CHAR_S_INDEX = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
  '&': '&amp;'
};
/**
 * @constructor
 */

function XmlEntities() {}
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.prototype.encode = function (str) {
  if (!str || !str.length) {
    return '';
  }

  return str.replace(/<|>|"|'|&/g, function (s) {
    return CHAR_S_INDEX[s];
  });
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.encode = function (str) {
  return new XmlEntities().encode(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.prototype.decode = function (str) {
  if (!str || !str.length) {
    return '';
  }

  return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
    if (s.charAt(1) === '#') {
      var code = s.charAt(2).toLowerCase() === 'x' ? parseInt(s.substr(3), 16) : parseInt(s.substr(2));

      if (isNaN(code) || code < -32768 || code > 65535) {
        return '';
      }

      return String.fromCharCode(code);
    }

    return ALPHA_INDEX[s] || s;
  });
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.decode = function (str) {
  return new XmlEntities().decode(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.prototype.encodeNonUTF = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLength = str.length;
  var result = '';
  var i = 0;

  while (i < strLength) {
    var c = str.charCodeAt(i);
    var alpha = CHAR_INDEX[c];

    if (alpha) {
      result += "&" + alpha + ";";
      i++;
      continue;
    }

    if (c < 32 || c > 126) {
      result += '&#' + c + ';';
    } else {
      result += str.charAt(i);
    }

    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.encodeNonUTF = function (str) {
  return new XmlEntities().encodeNonUTF(str);
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.prototype.encodeNonASCII = function (str) {
  if (!str || !str.length) {
    return '';
  }

  var strLenght = str.length;
  var result = '';
  var i = 0;

  while (i < strLenght) {
    var c = str.charCodeAt(i);

    if (c <= 255) {
      result += str[i++];
      continue;
    }

    result += '&#' + c + ';';
    i++;
  }

  return result;
};
/**
 * @param {String} str
 * @returns {String}
 */


XmlEntities.encodeNonASCII = function (str) {
  return new XmlEntities().encodeNonASCII(str);
};

module.exports = XmlEntities;

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var printWarning = function () {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");

  var loggedTypeFailures = {};

  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
 // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};

/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");

/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.development.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.5.2
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */if(true){(function(){'use strict';var React=__webpack_require__(/*! react */ "./node_modules/react/index.js");var _assign=__webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");var checkPropTypes=__webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");var schedule=__webpack_require__(/*! schedule */ "./node_modules/schedule/index.js");var tracing=__webpack_require__(/*! schedule/tracing */ "./node_modules/schedule/tracing.js");/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */var validateFormat=function(){};{validateFormat=function(format){if(format===undefined){throw new Error('invariant requires an error message argument');}};}function invariant(condition,format,a,b,c,d,e,f){validateFormat(format);if(!condition){var error=void 0;if(format===undefined){error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else{var args=[a,b,c,d,e,f];var argIndex=0;error=new Error(format.replace(/%s/g,function(){return args[argIndex++];}));error.name='Invariant Violation';}error.framesToPop=1;// we don't care about invariant's own frame
throw error;}}// Relying on the `invariant()` implementation lets us
// preserve the format and params in the www builds.
!React?invariant(false,'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.'):void 0;var invokeGuardedCallbackImpl=function(name,func,context,a,b,c,d,e,f){var funcArgs=Array.prototype.slice.call(arguments,3);try{func.apply(context,funcArgs);}catch(error){this.onError(error);}};{// In DEV mode, we swap out invokeGuardedCallback for a special version
// that plays more nicely with the browser's DevTools. The idea is to preserve
// "Pause on exceptions" behavior. Because React wraps all user-provided
// functions in invokeGuardedCallback, and the production version of
// invokeGuardedCallback uses a try-catch, all user exceptions are treated
// like caught exceptions, and the DevTools won't pause unless the developer
// takes the extra step of enabling pause on caught exceptions. This is
// untintuitive, though, because even though React has caught the error, from
// the developer's perspective, the error is uncaught.
//
// To preserve the expected "Pause on exceptions" behavior, we don't use a
// try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
// DOM node, and call the user-provided callback from inside an event handler
// for that fake event. If the callback throws, the error is "captured" using
// a global event handler. But because the error happens in a different
// event loop context, it does not interrupt the normal program flow.
// Effectively, this gives us try-catch behavior without actually using
// try-catch. Neat!
// Check that the browser supports the APIs we need to implement our special
// DEV version of invokeGuardedCallback
if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){var fakeNode=document.createElement('react');var invokeGuardedCallbackDev=function(name,func,context,a,b,c,d,e,f){// If document doesn't exist we know for sure we will crash in this method
// when we call document.createEvent(). However this can cause confusing
// errors: https://github.com/facebookincubator/create-react-app/issues/3482
// So we preemptively throw with a better message instead.
!(typeof document!=='undefined')?invariant(false,'The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.'):void 0;var evt=document.createEvent('Event');// Keeps track of whether the user-provided callback threw an error. We
// set this to true at the beginning, then set it to false right after
// calling the function. If the function errors, `didError` will never be
// set to false. This strategy works even if the browser is flaky and
// fails to call our global error handler, because it doesn't rely on
// the error event at all.
var didError=true;// Keeps track of the value of window.event so that we can reset it
// during the callback to let user code access window.event in the
// browsers that support it.
var windowEvent=window.event;// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var funcArgs=Array.prototype.slice.call(arguments,3);function callCallback(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
fakeNode.removeEventListener(evtType,callCallback,false);// We check for window.hasOwnProperty('event') to prevent the
// window.event assignment in both IE <= 10 as they throw an error
// "Member not found" in strict mode, and in Firefox which does not
// support window.event.
if(typeof window.event!=='undefined'&&window.hasOwnProperty('event')){window.event=windowEvent;}func.apply(context,funcArgs);didError=false;}// Create a global error event handler. We use this to capture the value
// that was thrown. It's possible that this error handler will fire more
// than once; for example, if non-React code also calls `dispatchEvent`
// and a handler for that event throws. We should be resilient to most of
// those cases. Even if our error event handler fires more than once, the
// last error event is always used. If the callback actually does error,
// we know that the last error event is the correct one, because it's not
// possible for anything else to have happened in between our callback
// erroring and the code that follows the `dispatchEvent` call below. If
// the callback doesn't error, but the error event was fired, we know to
// ignore it because `didError` will be false, as described above.
var error=void 0;// Use this to track whether the error event is ever called.
var didSetError=false;var isCrossOriginError=false;function handleWindowError(event){error=event.error;didSetError=true;if(error===null&&event.colno===0&&event.lineno===0){isCrossOriginError=true;}if(event.defaultPrevented){// Some other error handler has prevented default.
// Browsers silence the error report if this happens.
// We'll remember this to later decide whether to log it or not.
if(error!=null&&typeof error==='object'){try{error._suppressLogging=true;}catch(inner){// Ignore.
}}}}// Create a fake event type.
var evtType='react-'+(name?name:'invokeguardedcallback');// Attach our event handlers
window.addEventListener('error',handleWindowError);fakeNode.addEventListener(evtType,callCallback,false);// Synchronously dispatch our fake event. If the user-provided function
// errors, it will trigger our global error handler.
evt.initEvent(evtType,false,false);fakeNode.dispatchEvent(evt);if(didError){if(!didSetError){// The callback errored, but the error event never fired.
error=new Error('An error was thrown inside one of your components, but React '+"doesn't know what it was. This is likely due to browser "+'flakiness. React does its best to preserve the "Pause on '+'exceptions" behavior of the DevTools, which requires some '+"DEV-mode only tricks. It's possible that these don't work in "+'your browser. Try triggering the error in production mode, '+'or switching to a modern browser. If you suspect that this is '+'actually an issue with React, please file an issue.');}else if(isCrossOriginError){error=new Error("A cross-origin error was thrown. React doesn't have access to "+'the actual error object in development. '+'See https://fb.me/react-crossorigin-error for more information.');}this.onError(error);}// Remove our event listeners
window.removeEventListener('error',handleWindowError);};invokeGuardedCallbackImpl=invokeGuardedCallbackDev;}}var invokeGuardedCallbackImpl$1=invokeGuardedCallbackImpl;// Used by Fiber to simulate a try-catch.
var hasError=false;var caughtError=null;// Used by event system to capture/rethrow the first error.
var hasRethrowError=false;var rethrowError=null;var reporter={onError:function(error){hasError=true;caughtError=error;}};/**
 * Call a function while guarding against errors that happens within it.
 * Returns an error if it throws, otherwise null.
 *
 * In production, this is implemented using a try-catch. The reason we don't
 * use a try-catch directly is so that we can swap out a different
 * implementation in DEV mode.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */function invokeGuardedCallback(name,func,context,a,b,c,d,e,f){hasError=false;caughtError=null;invokeGuardedCallbackImpl$1.apply(reporter,arguments);}/**
 * Same as invokeGuardedCallback, but instead of returning an error, it stores
 * it in a global so it can be rethrown by `rethrowCaughtError` later.
 * TODO: See if caughtError and rethrowError can be unified.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */function invokeGuardedCallbackAndCatchFirstError(name,func,context,a,b,c,d,e,f){invokeGuardedCallback.apply(this,arguments);if(hasError){var error=clearCaughtError();if(!hasRethrowError){hasRethrowError=true;rethrowError=error;}}}/**
 * During execution of guarded functions we will capture the first error which
 * we will rethrow to be handled by the top level error handler.
 */function rethrowCaughtError(){if(hasRethrowError){var error=rethrowError;hasRethrowError=false;rethrowError=null;throw error;}}function hasCaughtError(){return hasError;}function clearCaughtError(){if(hasError){var error=caughtError;hasError=false;caughtError=null;return error;}else{invariant(false,'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');}}/**
 * Injectable ordering of event plugins.
 */var eventPluginOrder=null;/**
 * Injectable mapping from names to event plugin modules.
 */var namesToPlugins={};/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */function recomputePluginOrdering(){if(!eventPluginOrder){// Wait until an `eventPluginOrder` is injected.
return;}for(var pluginName in namesToPlugins){var pluginModule=namesToPlugins[pluginName];var pluginIndex=eventPluginOrder.indexOf(pluginName);!(pluginIndex>-1)?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.',pluginName):void 0;if(plugins[pluginIndex]){continue;}!pluginModule.extractEvents?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.',pluginName):void 0;plugins[pluginIndex]=pluginModule;var publishedEvents=pluginModule.eventTypes;for(var eventName in publishedEvents){!publishEventForPlugin(publishedEvents[eventName],pluginModule,eventName)?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):void 0;}}}/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */function publishEventForPlugin(dispatchConfig,pluginModule,eventName){!!eventNameDispatchConfigs.hasOwnProperty(eventName)?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.',eventName):void 0;eventNameDispatchConfigs[eventName]=dispatchConfig;var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;if(phasedRegistrationNames){for(var phaseName in phasedRegistrationNames){if(phasedRegistrationNames.hasOwnProperty(phaseName)){var phasedRegistrationName=phasedRegistrationNames[phaseName];publishRegistrationName(phasedRegistrationName,pluginModule,eventName);}}return true;}else if(dispatchConfig.registrationName){publishRegistrationName(dispatchConfig.registrationName,pluginModule,eventName);return true;}return false;}/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */function publishRegistrationName(registrationName,pluginModule,eventName){!!registrationNameModules[registrationName]?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.',registrationName):void 0;registrationNameModules[registrationName]=pluginModule;registrationNameDependencies[registrationName]=pluginModule.eventTypes[eventName].dependencies;{var lowerCasedName=registrationName.toLowerCase();possibleRegistrationNames[lowerCasedName]=registrationName;if(registrationName==='onDoubleClick'){possibleRegistrationNames.ondblclick=registrationName;}}}/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */ /**
 * Ordered list of injected plugins.
 */var plugins=[];/**
 * Mapping from event name to dispatch config
 */var eventNameDispatchConfigs={};/**
 * Mapping from registration name to plugin module
 */var registrationNameModules={};/**
 * Mapping from registration name to event name
 */var registrationNameDependencies={};/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */var possibleRegistrationNames={};// Trust the developer to only use possibleRegistrationNames in true
/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */function injectEventPluginOrder(injectedEventPluginOrder){!!eventPluginOrder?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.'):void 0;// Clone the ordering so it cannot be dynamically mutated.
eventPluginOrder=Array.prototype.slice.call(injectedEventPluginOrder);recomputePluginOrdering();}/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */function injectEventPluginsByName(injectedNamesToPlugins){var isOrderingDirty=false;for(var pluginName in injectedNamesToPlugins){if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){continue;}var pluginModule=injectedNamesToPlugins[pluginName];if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==pluginModule){!!namesToPlugins[pluginName]?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.',pluginName):void 0;namesToPlugins[pluginName]=pluginModule;isOrderingDirty=true;}}if(isOrderingDirty){recomputePluginOrdering();}}/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var warningWithoutStack=function(){};{warningWithoutStack=function(condition,format){for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}if(format===undefined){throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning '+'message argument');}if(args.length>8){// Check before the condition to catch violations early.
throw new Error('warningWithoutStack() currently supports at most 8 arguments.');}if(condition){return;}if(typeof console!=='undefined'){var _args$map=args.map(function(item){return''+item;}),a=_args$map[0],b=_args$map[1],c=_args$map[2],d=_args$map[3],e=_args$map[4],f=_args$map[5],g=_args$map[6],h=_args$map[7];var message='Warning: '+format;// We intentionally don't use spread (or .apply) because it breaks IE9:
// https://github.com/facebook/react/issues/13610
switch(args.length){case 0:console.error(message);break;case 1:console.error(message,a);break;case 2:console.error(message,a,b);break;case 3:console.error(message,a,b,c);break;case 4:console.error(message,a,b,c,d);break;case 5:console.error(message,a,b,c,d,e);break;case 6:console.error(message,a,b,c,d,e,f);break;case 7:console.error(message,a,b,c,d,e,f,g);break;case 8:console.error(message,a,b,c,d,e,f,g,h);break;default:throw new Error('warningWithoutStack() currently supports at most 8 arguments.');}}try{// --- Welcome to debugging React ---
// This error was thrown as a convenience so that you can use this stack
// to find the callsite that caused this warning to fire.
var argIndex=0;var _message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});throw new Error(_message);}catch(x){}};}var warningWithoutStack$1=warningWithoutStack;var getFiberCurrentPropsFromNode=null;var getInstanceFromNode=null;var getNodeFromInstance=null;function setComponentTree(getFiberCurrentPropsFromNodeImpl,getInstanceFromNodeImpl,getNodeFromInstanceImpl){getFiberCurrentPropsFromNode=getFiberCurrentPropsFromNodeImpl;getInstanceFromNode=getInstanceFromNodeImpl;getNodeFromInstance=getNodeFromInstanceImpl;{!(getNodeFromInstance&&getInstanceFromNode)?warningWithoutStack$1(false,'EventPluginUtils.setComponentTree(...): Injected '+'module is missing getNodeFromInstance or getInstanceFromNode.'):void 0;}}var validateEventDispatches=void 0;{validateEventDispatches=function(event){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;var listenersIsArr=Array.isArray(dispatchListeners);var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;var instancesIsArr=Array.isArray(dispatchInstances);var instancesLen=instancesIsArr?dispatchInstances.length:dispatchInstances?1:0;!(instancesIsArr===listenersIsArr&&instancesLen===listenersLen)?warningWithoutStack$1(false,'EventPluginUtils: Invalid `event`.'):void 0;};}/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */function executeDispatch(event,simulated,listener,inst){var type=event.type||'unknown-event';event.currentTarget=getNodeFromInstance(inst);invokeGuardedCallbackAndCatchFirstError(type,listener,undefined,event);event.currentTarget=null;}/**
 * Standard/simple iteration through an event's collected dispatches.
 */function executeDispatchesInOrder(event,simulated){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;{validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;}// Listeners and Instances are two parallel arrays that are always in sync.
executeDispatch(event,simulated,dispatchListeners[i],dispatchInstances[i]);}}else if(dispatchListeners){executeDispatch(event,simulated,dispatchListeners,dispatchInstances);}event._dispatchListeners=null;event._dispatchInstances=null;}/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */ /**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */ /**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */ /**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */function accumulateInto(current,next){!(next!=null)?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):void 0;if(current==null){return next;}// Both are not empty. Warning: Never call x.concat(y) when you are not
// certain that x is an Array (x could be a string with concat method).
if(Array.isArray(current)){if(Array.isArray(next)){current.push.apply(current,next);return current;}current.push(next);return current;}if(Array.isArray(next)){// A bit too dangerous to mutate `next`.
return[current].concat(next);}return[current,next];}/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */function forEachAccumulated(arr,cb,scope){if(Array.isArray(arr)){arr.forEach(cb,scope);}else if(arr){cb.call(scope,arr);}}/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */var eventQueue=null;/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */var executeDispatchesAndRelease=function(event,simulated){if(event){executeDispatchesInOrder(event,simulated);if(!event.isPersistent()){event.constructor.release(event);}}};var executeDispatchesAndReleaseSimulated=function(e){return executeDispatchesAndRelease(e,true);};var executeDispatchesAndReleaseTopLevel=function(e){return executeDispatchesAndRelease(e,false);};function isInteractive(tag){return tag==='button'||tag==='input'||tag==='select'||tag==='textarea';}function shouldPreventMouseEvent(name,type,props){switch(name){case'onClick':case'onClickCapture':case'onDoubleClick':case'onDoubleClickCapture':case'onMouseDown':case'onMouseDownCapture':case'onMouseMove':case'onMouseMoveCapture':case'onMouseUp':case'onMouseUpCapture':return!!(props.disabled&&isInteractive(type));default:return false;}}/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */ /**
 * Methods for injecting dependencies.
 */var injection={/**
   * @param {array} InjectedEventPluginOrder
   * @public
   */injectEventPluginOrder:injectEventPluginOrder,/**
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   */injectEventPluginsByName:injectEventPluginsByName};/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */function getListener(inst,registrationName){var listener=void 0;// TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
// live here; needs to be moved to a better place soon
var stateNode=inst.stateNode;if(!stateNode){// Work in progress (ex: onload events in incremental mode).
return null;}var props=getFiberCurrentPropsFromNode(stateNode);if(!props){// Work in progress.
return null;}listener=props[registrationName];if(shouldPreventMouseEvent(registrationName,inst.type,props)){return null;}!(!listener||typeof listener==='function')?invariant(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.',registrationName,typeof listener):void 0;return listener;}/**
 * Allows registered plugins an opportunity to extract events from top-level
 * native browser events.
 *
 * @return {*} An accumulation of synthetic events.
 * @internal
 */function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events=null;for(var i=0;i<plugins.length;i++){// Not every plugin in the ordering may be loaded at runtime.
var possiblePlugin=plugins[i];if(possiblePlugin){var extractedEvents=possiblePlugin.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);if(extractedEvents){events=accumulateInto(events,extractedEvents);}}}return events;}function runEventsInBatch(events,simulated){if(events!==null){eventQueue=accumulateInto(eventQueue,events);}// Set `eventQueue` to null before processing it so that we can tell if more
// events get enqueued while processing.
var processingEventQueue=eventQueue;eventQueue=null;if(!processingEventQueue){return;}if(simulated){forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseSimulated);}else{forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseTopLevel);}!!eventQueue?invariant(false,'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.'):void 0;// This would be a good time to rethrow if any of the event handlers threw.
rethrowCaughtError();}function runExtractedEventsInBatch(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events=extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);runEventsInBatch(events,false);}var FunctionalComponent=0;var FunctionalComponentLazy=1;var ClassComponent=2;var ClassComponentLazy=3;var IndeterminateComponent=4;// Before we know whether it is functional or class
var HostRoot=5;// Root of a host tree. Could be nested inside another node.
var HostPortal=6;// A subtree. Could be an entry point to a different renderer.
var HostComponent=7;var HostText=8;var Fragment=9;var Mode=10;var ContextConsumer=11;var ContextProvider=12;var ForwardRef=13;var ForwardRefLazy=14;var Profiler=15;var PlaceholderComponent=16;var randomKey=Math.random().toString(36).slice(2);var internalInstanceKey='__reactInternalInstance$'+randomKey;var internalEventHandlersKey='__reactEventHandlers$'+randomKey;function precacheFiberNode(hostInst,node){node[internalInstanceKey]=hostInst;}/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */function getClosestInstanceFromNode(node){if(node[internalInstanceKey]){return node[internalInstanceKey];}while(!node[internalInstanceKey]){if(node.parentNode){node=node.parentNode;}else{// Top of the tree. This node must not be part of a React tree (or is
// unmounted, potentially).
return null;}}var inst=node[internalInstanceKey];if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber, this will always be the deepest root.
return inst;}return null;}/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */function getInstanceFromNode$1(node){var inst=node[internalInstanceKey];if(inst){if(inst.tag===HostComponent||inst.tag===HostText){return inst;}else{return null;}}return null;}/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */function getNodeFromInstance$1(inst){if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber this, is just the state node right now. We assume it will be
// a host component or host text.
return inst.stateNode;}// Without this first invariant, passing a non-DOM-component triggers the next
// invariant for a missing parent, which is super confusing.
invariant(false,'getNodeFromInstance: Invalid argument.');}function getFiberCurrentPropsFromNode$1(node){return node[internalEventHandlersKey]||null;}function updateFiberProps(node,props){node[internalEventHandlersKey]=props;}function getParent(inst){do{inst=inst.return;// TODO: If this is a HostRoot we might want to bail out.
// That is depending on if we want nested subtrees (layers) to bubble
// events to their parent. We could also go through parentNode on the
// host node but that wouldn't work for React Native and doesn't let us
// do the portal feature.
}while(inst&&inst.tag!==HostComponent);if(inst){return inst;}return null;}/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */function getLowestCommonAncestor(instA,instB){var depthA=0;for(var tempA=instA;tempA;tempA=getParent(tempA)){depthA++;}var depthB=0;for(var tempB=instB;tempB;tempB=getParent(tempB)){depthB++;}// If A is deeper, crawl up.
while(depthA-depthB>0){instA=getParent(instA);depthA--;}// If B is deeper, crawl up.
while(depthB-depthA>0){instB=getParent(instB);depthB--;}// Walk in lockstep until we find a match.
var depth=depthA;while(depth--){if(instA===instB||instA===instB.alternate){return instA;}instA=getParent(instA);instB=getParent(instB);}return null;}/**
 * Return if A is an ancestor of B.
 */ /**
 * Return the parent instance of the passed-in instance.
 */ /**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */function traverseTwoPhase(inst,fn,arg){var path=[];while(inst){path.push(inst);inst=getParent(inst);}var i=void 0;for(i=path.length;i-->0;){fn(path[i],'captured',arg);}for(i=0;i<path.length;i++){fn(path[i],'bubbled',arg);}}/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */function traverseEnterLeave(from,to,fn,argFrom,argTo){var common=from&&to?getLowestCommonAncestor(from,to):null;var pathFrom=[];while(true){if(!from){break;}if(from===common){break;}var alternate=from.alternate;if(alternate!==null&&alternate===common){break;}pathFrom.push(from);from=getParent(from);}var pathTo=[];while(true){if(!to){break;}if(to===common){break;}var _alternate=to.alternate;if(_alternate!==null&&_alternate===common){break;}pathTo.push(to);to=getParent(to);}for(var i=0;i<pathFrom.length;i++){fn(pathFrom[i],'bubbled',argFrom);}for(var _i=pathTo.length;_i-->0;){fn(pathTo[_i],'captured',argTo);}}/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */function listenerAtPhase(inst,event,propagationPhase){var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];return getListener(inst,registrationName);}/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 */ /**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */function accumulateDirectionalDispatches(inst,phase,event){{!inst?warningWithoutStack$1(false,'Dispatching inst must not be null'):void 0;}var listener=listenerAtPhase(inst,event,phase);if(listener){event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */function accumulateTwoPhaseDispatchesSingle(event){if(event&&event.dispatchConfig.phasedRegistrationNames){traverseTwoPhase(event._targetInst,accumulateDirectionalDispatches,event);}}/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */function accumulateDispatches(inst,ignoredDirection,event){if(inst&&event&&event.dispatchConfig.registrationName){var registrationName=event.dispatchConfig.registrationName;var listener=getListener(inst,registrationName);if(listener){event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}}/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */function accumulateDirectDispatchesSingle(event){if(event&&event.dispatchConfig.registrationName){accumulateDispatches(event._targetInst,null,event);}}function accumulateTwoPhaseDispatches(events){forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}function accumulateEnterLeaveDispatches(leave,enter,from,to){traverseEnterLeave(from,to,accumulateDispatches,leave,enter);}function accumulateDirectDispatches(events){forEachAccumulated(events,accumulateDirectDispatchesSingle);}var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);// Do not uses the below two methods directly!
// Instead use constants exported from DOMTopLevelEventTypes in ReactDOM.
// (It is the only module that is allowed to access these methods.)
function unsafeCastStringToDOMTopLevelType(topLevelType){return topLevelType;}function unsafeCastDOMTopLevelTypeToString(topLevelType){return topLevelType;}/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */function makePrefixMap(styleProp,eventName){var prefixes={};prefixes[styleProp.toLowerCase()]=eventName.toLowerCase();prefixes['Webkit'+styleProp]='webkit'+eventName;prefixes['Moz'+styleProp]='moz'+eventName;return prefixes;}/**
 * A list of event names to a configurable list of vendor prefixes.
 */var vendorPrefixes={animationend:makePrefixMap('Animation','AnimationEnd'),animationiteration:makePrefixMap('Animation','AnimationIteration'),animationstart:makePrefixMap('Animation','AnimationStart'),transitionend:makePrefixMap('Transition','TransitionEnd')};/**
 * Event names that have already been detected and prefixed (if applicable).
 */var prefixedEventNames={};/**
 * Element to check for prefixes on.
 */var style={};/**
 * Bootstrap if a DOM exists.
 */if(canUseDOM){style=document.createElement('div').style;// On some platforms, in particular some releases of Android 4.x,
// the un-prefixed "animation" and "transition" properties are defined on the
// style object but the events that fire will still be prefixed, so we need
// to check if the un-prefixed events are usable, and if not remove them from the map.
if(!('AnimationEvent'in window)){delete vendorPrefixes.animationend.animation;delete vendorPrefixes.animationiteration.animation;delete vendorPrefixes.animationstart.animation;}// Same as above
if(!('TransitionEvent'in window)){delete vendorPrefixes.transitionend.transition;}}/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */function getVendorPrefixedEventName(eventName){if(prefixedEventNames[eventName]){return prefixedEventNames[eventName];}else if(!vendorPrefixes[eventName]){return eventName;}var prefixMap=vendorPrefixes[eventName];for(var styleProp in prefixMap){if(prefixMap.hasOwnProperty(styleProp)&&styleProp in style){return prefixedEventNames[eventName]=prefixMap[styleProp];}}return eventName;}/**
 * To identify top level events in ReactDOM, we use constants defined by this
 * module. This is the only module that uses the unsafe* methods to express
 * that the constants actually correspond to the browser event names. This lets
 * us save some bundle size by avoiding a top level type -> event name map.
 * The rest of ReactDOM code should import top level types from this file.
 */var TOP_ABORT=unsafeCastStringToDOMTopLevelType('abort');var TOP_ANIMATION_END=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));var TOP_ANIMATION_ITERATION=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));var TOP_ANIMATION_START=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));var TOP_BLUR=unsafeCastStringToDOMTopLevelType('blur');var TOP_CAN_PLAY=unsafeCastStringToDOMTopLevelType('canplay');var TOP_CAN_PLAY_THROUGH=unsafeCastStringToDOMTopLevelType('canplaythrough');var TOP_CANCEL=unsafeCastStringToDOMTopLevelType('cancel');var TOP_CHANGE=unsafeCastStringToDOMTopLevelType('change');var TOP_CLICK=unsafeCastStringToDOMTopLevelType('click');var TOP_CLOSE=unsafeCastStringToDOMTopLevelType('close');var TOP_COMPOSITION_END=unsafeCastStringToDOMTopLevelType('compositionend');var TOP_COMPOSITION_START=unsafeCastStringToDOMTopLevelType('compositionstart');var TOP_COMPOSITION_UPDATE=unsafeCastStringToDOMTopLevelType('compositionupdate');var TOP_CONTEXT_MENU=unsafeCastStringToDOMTopLevelType('contextmenu');var TOP_COPY=unsafeCastStringToDOMTopLevelType('copy');var TOP_CUT=unsafeCastStringToDOMTopLevelType('cut');var TOP_DOUBLE_CLICK=unsafeCastStringToDOMTopLevelType('dblclick');var TOP_AUX_CLICK=unsafeCastStringToDOMTopLevelType('auxclick');var TOP_DRAG=unsafeCastStringToDOMTopLevelType('drag');var TOP_DRAG_END=unsafeCastStringToDOMTopLevelType('dragend');var TOP_DRAG_ENTER=unsafeCastStringToDOMTopLevelType('dragenter');var TOP_DRAG_EXIT=unsafeCastStringToDOMTopLevelType('dragexit');var TOP_DRAG_LEAVE=unsafeCastStringToDOMTopLevelType('dragleave');var TOP_DRAG_OVER=unsafeCastStringToDOMTopLevelType('dragover');var TOP_DRAG_START=unsafeCastStringToDOMTopLevelType('dragstart');var TOP_DROP=unsafeCastStringToDOMTopLevelType('drop');var TOP_DURATION_CHANGE=unsafeCastStringToDOMTopLevelType('durationchange');var TOP_EMPTIED=unsafeCastStringToDOMTopLevelType('emptied');var TOP_ENCRYPTED=unsafeCastStringToDOMTopLevelType('encrypted');var TOP_ENDED=unsafeCastStringToDOMTopLevelType('ended');var TOP_ERROR=unsafeCastStringToDOMTopLevelType('error');var TOP_FOCUS=unsafeCastStringToDOMTopLevelType('focus');var TOP_GOT_POINTER_CAPTURE=unsafeCastStringToDOMTopLevelType('gotpointercapture');var TOP_INPUT=unsafeCastStringToDOMTopLevelType('input');var TOP_INVALID=unsafeCastStringToDOMTopLevelType('invalid');var TOP_KEY_DOWN=unsafeCastStringToDOMTopLevelType('keydown');var TOP_KEY_PRESS=unsafeCastStringToDOMTopLevelType('keypress');var TOP_KEY_UP=unsafeCastStringToDOMTopLevelType('keyup');var TOP_LOAD=unsafeCastStringToDOMTopLevelType('load');var TOP_LOAD_START=unsafeCastStringToDOMTopLevelType('loadstart');var TOP_LOADED_DATA=unsafeCastStringToDOMTopLevelType('loadeddata');var TOP_LOADED_METADATA=unsafeCastStringToDOMTopLevelType('loadedmetadata');var TOP_LOST_POINTER_CAPTURE=unsafeCastStringToDOMTopLevelType('lostpointercapture');var TOP_MOUSE_DOWN=unsafeCastStringToDOMTopLevelType('mousedown');var TOP_MOUSE_MOVE=unsafeCastStringToDOMTopLevelType('mousemove');var TOP_MOUSE_OUT=unsafeCastStringToDOMTopLevelType('mouseout');var TOP_MOUSE_OVER=unsafeCastStringToDOMTopLevelType('mouseover');var TOP_MOUSE_UP=unsafeCastStringToDOMTopLevelType('mouseup');var TOP_PASTE=unsafeCastStringToDOMTopLevelType('paste');var TOP_PAUSE=unsafeCastStringToDOMTopLevelType('pause');var TOP_PLAY=unsafeCastStringToDOMTopLevelType('play');var TOP_PLAYING=unsafeCastStringToDOMTopLevelType('playing');var TOP_POINTER_CANCEL=unsafeCastStringToDOMTopLevelType('pointercancel');var TOP_POINTER_DOWN=unsafeCastStringToDOMTopLevelType('pointerdown');var TOP_POINTER_MOVE=unsafeCastStringToDOMTopLevelType('pointermove');var TOP_POINTER_OUT=unsafeCastStringToDOMTopLevelType('pointerout');var TOP_POINTER_OVER=unsafeCastStringToDOMTopLevelType('pointerover');var TOP_POINTER_UP=unsafeCastStringToDOMTopLevelType('pointerup');var TOP_PROGRESS=unsafeCastStringToDOMTopLevelType('progress');var TOP_RATE_CHANGE=unsafeCastStringToDOMTopLevelType('ratechange');var TOP_RESET=unsafeCastStringToDOMTopLevelType('reset');var TOP_SCROLL=unsafeCastStringToDOMTopLevelType('scroll');var TOP_SEEKED=unsafeCastStringToDOMTopLevelType('seeked');var TOP_SEEKING=unsafeCastStringToDOMTopLevelType('seeking');var TOP_SELECTION_CHANGE=unsafeCastStringToDOMTopLevelType('selectionchange');var TOP_STALLED=unsafeCastStringToDOMTopLevelType('stalled');var TOP_SUBMIT=unsafeCastStringToDOMTopLevelType('submit');var TOP_SUSPEND=unsafeCastStringToDOMTopLevelType('suspend');var TOP_TEXT_INPUT=unsafeCastStringToDOMTopLevelType('textInput');var TOP_TIME_UPDATE=unsafeCastStringToDOMTopLevelType('timeupdate');var TOP_TOGGLE=unsafeCastStringToDOMTopLevelType('toggle');var TOP_TOUCH_CANCEL=unsafeCastStringToDOMTopLevelType('touchcancel');var TOP_TOUCH_END=unsafeCastStringToDOMTopLevelType('touchend');var TOP_TOUCH_MOVE=unsafeCastStringToDOMTopLevelType('touchmove');var TOP_TOUCH_START=unsafeCastStringToDOMTopLevelType('touchstart');var TOP_TRANSITION_END=unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));var TOP_VOLUME_CHANGE=unsafeCastStringToDOMTopLevelType('volumechange');var TOP_WAITING=unsafeCastStringToDOMTopLevelType('waiting');var TOP_WHEEL=unsafeCastStringToDOMTopLevelType('wheel');// List of events that need to be individually attached to media elements.
// Note that events in this list will *not* be listened to at the top level
// unless they're explicitly whitelisted in `ReactBrowserEventEmitter.listenTo`.
var mediaEventTypes=[TOP_ABORT,TOP_CAN_PLAY,TOP_CAN_PLAY_THROUGH,TOP_DURATION_CHANGE,TOP_EMPTIED,TOP_ENCRYPTED,TOP_ENDED,TOP_ERROR,TOP_LOADED_DATA,TOP_LOADED_METADATA,TOP_LOAD_START,TOP_PAUSE,TOP_PLAY,TOP_PLAYING,TOP_PROGRESS,TOP_RATE_CHANGE,TOP_SEEKED,TOP_SEEKING,TOP_STALLED,TOP_SUSPEND,TOP_TIME_UPDATE,TOP_VOLUME_CHANGE,TOP_WAITING];function getRawEventName(topLevelType){return unsafeCastDOMTopLevelTypeToString(topLevelType);}/**
 * These variables store information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */var root=null;var startText=null;var fallbackText=null;function initialize(nativeEventTarget){root=nativeEventTarget;startText=getText();return true;}function reset(){root=null;startText=null;fallbackText=null;}function getData(){if(fallbackText){return fallbackText;}var start=void 0;var startValue=startText;var startLength=startValue.length;var end=void 0;var endValue=getText();var endLength=endValue.length;for(start=0;start<startLength;start++){if(startValue[start]!==endValue[start]){break;}}var minEnd=startLength-start;for(end=1;end<=minEnd;end++){if(startValue[startLength-end]!==endValue[endLength-end]){break;}}var sliceTail=end>1?1-end:undefined;fallbackText=endValue.slice(start,sliceTail);return fallbackText;}function getText(){if('value'in root){return root.value;}return root.textContent;}/* eslint valid-typeof: 0 */var EVENT_POOL_SIZE=10;/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var EventInterface={type:null,target:null,// currentTarget is set when dispatching; no use in copying it here
currentTarget:function(){return null;},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(event){return event.timeStamp||Date.now();},defaultPrevented:null,isTrusted:null};function functionThatReturnsTrue(){return true;}function functionThatReturnsFalse(){return false;}/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */function SyntheticEvent(dispatchConfig,targetInst,nativeEvent,nativeEventTarget){{// these have a getter/setter for warnings
delete this.nativeEvent;delete this.preventDefault;delete this.stopPropagation;delete this.isDefaultPrevented;delete this.isPropagationStopped;}this.dispatchConfig=dispatchConfig;this._targetInst=targetInst;this.nativeEvent=nativeEvent;var Interface=this.constructor.Interface;for(var propName in Interface){if(!Interface.hasOwnProperty(propName)){continue;}{delete this[propName];// this has a getter/setter for warnings
}var normalize=Interface[propName];if(normalize){this[propName]=normalize(nativeEvent);}else{if(propName==='target'){this.target=nativeEventTarget;}else{this[propName]=nativeEvent[propName];}}}var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;if(defaultPrevented){this.isDefaultPrevented=functionThatReturnsTrue;}else{this.isDefaultPrevented=functionThatReturnsFalse;}this.isPropagationStopped=functionThatReturnsFalse;return this;}_assign(SyntheticEvent.prototype,{preventDefault:function(){this.defaultPrevented=true;var event=this.nativeEvent;if(!event){return;}if(event.preventDefault){event.preventDefault();}else if(typeof event.returnValue!=='unknown'){event.returnValue=false;}this.isDefaultPrevented=functionThatReturnsTrue;},stopPropagation:function(){var event=this.nativeEvent;if(!event){return;}if(event.stopPropagation){event.stopPropagation();}else if(typeof event.cancelBubble!=='unknown'){// The ChangeEventPlugin registers a "propertychange" event for
// IE. This event does not support bubbling or cancelling, and
// any references to cancelBubble throw "Member not found".  A
// typeof check of "unknown" circumvents this issue (and is also
// IE specific).
event.cancelBubble=true;}this.isPropagationStopped=functionThatReturnsTrue;},/**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */persist:function(){this.isPersistent=functionThatReturnsTrue;},/**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */isPersistent:functionThatReturnsFalse,/**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */destructor:function(){var Interface=this.constructor.Interface;for(var propName in Interface){{Object.defineProperty(this,propName,getPooledWarningPropertyDefinition(propName,Interface[propName]));}}this.dispatchConfig=null;this._targetInst=null;this.nativeEvent=null;this.isDefaultPrevented=functionThatReturnsFalse;this.isPropagationStopped=functionThatReturnsFalse;this._dispatchListeners=null;this._dispatchInstances=null;{Object.defineProperty(this,'nativeEvent',getPooledWarningPropertyDefinition('nativeEvent',null));Object.defineProperty(this,'isDefaultPrevented',getPooledWarningPropertyDefinition('isDefaultPrevented',functionThatReturnsFalse));Object.defineProperty(this,'isPropagationStopped',getPooledWarningPropertyDefinition('isPropagationStopped',functionThatReturnsFalse));Object.defineProperty(this,'preventDefault',getPooledWarningPropertyDefinition('preventDefault',function(){}));Object.defineProperty(this,'stopPropagation',getPooledWarningPropertyDefinition('stopPropagation',function(){}));}}});SyntheticEvent.Interface=EventInterface;/**
 * Helper to reduce boilerplate when creating subclasses.
 */SyntheticEvent.extend=function(Interface){var Super=this;var E=function(){};E.prototype=Super.prototype;var prototype=new E();function Class(){return Super.apply(this,arguments);}_assign(prototype,Class.prototype);Class.prototype=prototype;Class.prototype.constructor=Class;Class.Interface=_assign({},Super.Interface,Interface);Class.extend=Super.extend;addEventPoolingTo(Class);return Class;};addEventPoolingTo(SyntheticEvent);/**
 * Helper to nullify syntheticEvent instance properties when destructing
 *
 * @param {String} propName
 * @param {?object} getVal
 * @return {object} defineProperty object
 */function getPooledWarningPropertyDefinition(propName,getVal){var isFunction=typeof getVal==='function';return{configurable:true,set:set,get:get};function set(val){var action=isFunction?'setting the method':'setting the property';warn(action,'This is effectively a no-op');return val;}function get(){var action=isFunction?'accessing the method':'accessing the property';var result=isFunction?'This is a no-op function':'This is set to null';warn(action,result);return getVal;}function warn(action,result){var warningCondition=false;!warningCondition?warningWithoutStack$1(false,"This synthetic event is reused for performance reasons. If you're seeing this, "+"you're %s `%s` on a released/nullified synthetic event. %s. "+'If you must keep the original synthetic event around, use event.persist(). '+'See https://fb.me/react-event-pooling for more information.',action,propName,result):void 0;}}function getPooledEvent(dispatchConfig,targetInst,nativeEvent,nativeInst){var EventConstructor=this;if(EventConstructor.eventPool.length){var instance=EventConstructor.eventPool.pop();EventConstructor.call(instance,dispatchConfig,targetInst,nativeEvent,nativeInst);return instance;}return new EventConstructor(dispatchConfig,targetInst,nativeEvent,nativeInst);}function releasePooledEvent(event){var EventConstructor=this;!(event instanceof EventConstructor)?invariant(false,'Trying to release an event instance into a pool of a different type.'):void 0;event.destructor();if(EventConstructor.eventPool.length<EVENT_POOL_SIZE){EventConstructor.eventPool.push(event);}}function addEventPoolingTo(EventConstructor){EventConstructor.eventPool=[];EventConstructor.getPooled=getPooledEvent;EventConstructor.release=releasePooledEvent;}/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */var SyntheticCompositionEvent=SyntheticEvent.extend({data:null});/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */var SyntheticInputEvent=SyntheticEvent.extend({data:null});var END_KEYCODES=[9,13,27,32];// Tab, Return, Esc, Space
var START_KEYCODE=229;var canUseCompositionEvent=canUseDOM&&'CompositionEvent'in window;var documentMode=null;if(canUseDOM&&'documentMode'in document){documentMode=document.documentMode;}// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent=canUseDOM&&'TextEvent'in window&&!documentMode;// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData=canUseDOM&&(!canUseCompositionEvent||documentMode&&documentMode>8&&documentMode<=11);var SPACEBAR_CODE=32;var SPACEBAR_CHAR=String.fromCharCode(SPACEBAR_CODE);// Events and their corresponding property names.
var eventTypes={beforeInput:{phasedRegistrationNames:{bubbled:'onBeforeInput',captured:'onBeforeInputCapture'},dependencies:[TOP_COMPOSITION_END,TOP_KEY_PRESS,TOP_TEXT_INPUT,TOP_PASTE]},compositionEnd:{phasedRegistrationNames:{bubbled:'onCompositionEnd',captured:'onCompositionEndCapture'},dependencies:[TOP_BLUR,TOP_COMPOSITION_END,TOP_KEY_DOWN,TOP_KEY_PRESS,TOP_KEY_UP,TOP_MOUSE_DOWN]},compositionStart:{phasedRegistrationNames:{bubbled:'onCompositionStart',captured:'onCompositionStartCapture'},dependencies:[TOP_BLUR,TOP_COMPOSITION_START,TOP_KEY_DOWN,TOP_KEY_PRESS,TOP_KEY_UP,TOP_MOUSE_DOWN]},compositionUpdate:{phasedRegistrationNames:{bubbled:'onCompositionUpdate',captured:'onCompositionUpdateCapture'},dependencies:[TOP_BLUR,TOP_COMPOSITION_UPDATE,TOP_KEY_DOWN,TOP_KEY_PRESS,TOP_KEY_UP,TOP_MOUSE_DOWN]}};// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress=false;/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */function isKeypressCommand(nativeEvent){return(nativeEvent.ctrlKey||nativeEvent.altKey||nativeEvent.metaKey)&&// ctrlKey && altKey is equivalent to AltGr, and is not a command.
!(nativeEvent.ctrlKey&&nativeEvent.altKey);}/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */function getCompositionEventType(topLevelType){switch(topLevelType){case TOP_COMPOSITION_START:return eventTypes.compositionStart;case TOP_COMPOSITION_END:return eventTypes.compositionEnd;case TOP_COMPOSITION_UPDATE:return eventTypes.compositionUpdate;}}/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionStart(topLevelType,nativeEvent){return topLevelType===TOP_KEY_DOWN&&nativeEvent.keyCode===START_KEYCODE;}/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionEnd(topLevelType,nativeEvent){switch(topLevelType){case TOP_KEY_UP:// Command keys insert or clear IME input.
return END_KEYCODES.indexOf(nativeEvent.keyCode)!==-1;case TOP_KEY_DOWN:// Expect IME keyCode on each keydown. If we get any other
// code we must have exited earlier.
return nativeEvent.keyCode!==START_KEYCODE;case TOP_KEY_PRESS:case TOP_MOUSE_DOWN:case TOP_BLUR:// Events are not possible without cancelling IME.
return true;default:return false;}}/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */function getDataFromCustomEvent(nativeEvent){var detail=nativeEvent.detail;if(typeof detail==='object'&&'data'in detail){return detail.data;}return null;}/**
 * Check if a composition event was triggered by Korean IME.
 * Our fallback mode does not work well with IE's Korean IME,
 * so just use native composition events when Korean IME is used.
 * Although CompositionEvent.locale property is deprecated,
 * it is available in IE, where our fallback mode is enabled.
 *
 * @param {object} nativeEvent
 * @return {boolean}
 */function isUsingKoreanIME(nativeEvent){return nativeEvent.locale==='ko';}// Track the current IME composition status, if any.
var isComposing=false;/**
 * @return {?object} A SyntheticCompositionEvent.
 */function extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var eventType=void 0;var fallbackData=void 0;if(canUseCompositionEvent){eventType=getCompositionEventType(topLevelType);}else if(!isComposing){if(isFallbackCompositionStart(topLevelType,nativeEvent)){eventType=eventTypes.compositionStart;}}else if(isFallbackCompositionEnd(topLevelType,nativeEvent)){eventType=eventTypes.compositionEnd;}if(!eventType){return null;}if(useFallbackCompositionData&&!isUsingKoreanIME(nativeEvent)){// The current composition is stored statically and must not be
// overwritten while composition continues.
if(!isComposing&&eventType===eventTypes.compositionStart){isComposing=initialize(nativeEventTarget);}else if(eventType===eventTypes.compositionEnd){if(isComposing){fallbackData=getData();}}}var event=SyntheticCompositionEvent.getPooled(eventType,targetInst,nativeEvent,nativeEventTarget);if(fallbackData){// Inject data generated from fallback path into the synthetic event.
// This matches the property of native CompositionEventInterface.
event.data=fallbackData;}else{var customData=getDataFromCustomEvent(nativeEvent);if(customData!==null){event.data=customData;}}accumulateTwoPhaseDispatches(event);return event;}/**
 * @param {TopLevelType} topLevelType Number from `TopLevelType`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */function getNativeBeforeInputChars(topLevelType,nativeEvent){switch(topLevelType){case TOP_COMPOSITION_END:return getDataFromCustomEvent(nativeEvent);case TOP_KEY_PRESS:/**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */var which=nativeEvent.which;if(which!==SPACEBAR_CODE){return null;}hasSpaceKeypress=true;return SPACEBAR_CHAR;case TOP_TEXT_INPUT:// Record the characters to be added to the DOM.
var chars=nativeEvent.data;// If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately. Android Chrome
// doesn't give us keycodes, so we need to ignore it.
if(chars===SPACEBAR_CHAR&&hasSpaceKeypress){return null;}return chars;default:// For other native event types, do nothing.
return null;}}/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */function getFallbackBeforeInputChars(topLevelType,nativeEvent){// If we are currently composing (IME) and using a fallback to do so,
// try to extract the composed characters from the fallback object.
// If composition event is available, we extract a string only at
// compositionevent, otherwise extract it at fallback events.
if(isComposing){if(topLevelType===TOP_COMPOSITION_END||!canUseCompositionEvent&&isFallbackCompositionEnd(topLevelType,nativeEvent)){var chars=getData();reset();isComposing=false;return chars;}return null;}switch(topLevelType){case TOP_PASTE:// If a paste event occurs after a keypress, throw out the input
// chars. Paste events should not lead to BeforeInput events.
return null;case TOP_KEY_PRESS:/**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */if(!isKeypressCommand(nativeEvent)){// IE fires the `keypress` event when a user types an emoji via
// Touch keyboard of Windows.  In such a case, the `char` property
// holds an emoji character like `\uD83D\uDE0A`.  Because its length
// is 2, the property `which` does not represent an emoji correctly.
// In such a case, we directly return the `char` property instead of
// using `which`.
if(nativeEvent.char&&nativeEvent.char.length>1){return nativeEvent.char;}else if(nativeEvent.which){return String.fromCharCode(nativeEvent.which);}}return null;case TOP_COMPOSITION_END:return useFallbackCompositionData&&!isUsingKoreanIME(nativeEvent)?null:nativeEvent.data;default:return null;}}/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */function extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var chars=void 0;if(canUseTextInputEvent){chars=getNativeBeforeInputChars(topLevelType,nativeEvent);}else{chars=getFallbackBeforeInputChars(topLevelType,nativeEvent);}// If no characters are being inserted, no BeforeInput event should
// be fired.
if(!chars){return null;}var event=SyntheticInputEvent.getPooled(eventTypes.beforeInput,targetInst,nativeEvent,nativeEventTarget);event.data=chars;accumulateTwoPhaseDispatches(event);return event;}/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */var BeforeInputEventPlugin={eventTypes:eventTypes,extractEvents:function(topLevelType,targetInst,nativeEvent,nativeEventTarget){var composition=extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget);var beforeInput=extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget);if(composition===null){return beforeInput;}if(beforeInput===null){return composition;}return[composition,beforeInput];}};// Use to restore controlled state after a change event has fired.
var restoreImpl=null;var restoreTarget=null;var restoreQueue=null;function restoreStateOfTarget(target){// We perform this translation at the end of the event loop so that we
// always receive the correct fiber here
var internalInstance=getInstanceFromNode(target);if(!internalInstance){// Unmounted
return;}!(typeof restoreImpl==='function')?invariant(false,'setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.'):void 0;var props=getFiberCurrentPropsFromNode(internalInstance.stateNode);restoreImpl(internalInstance.stateNode,internalInstance.type,props);}function setRestoreImplementation(impl){restoreImpl=impl;}function enqueueStateRestore(target){if(restoreTarget){if(restoreQueue){restoreQueue.push(target);}else{restoreQueue=[target];}}else{restoreTarget=target;}}function needsStateRestore(){return restoreTarget!==null||restoreQueue!==null;}function restoreStateIfNeeded(){if(!restoreTarget){return;}var target=restoreTarget;var queuedTargets=restoreQueue;restoreTarget=null;restoreQueue=null;restoreStateOfTarget(target);if(queuedTargets){for(var i=0;i<queuedTargets.length;i++){restoreStateOfTarget(queuedTargets[i]);}}}// Used as a way to call batchedUpdates when we don't have a reference to
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults
var _batchedUpdatesImpl=function(fn,bookkeeping){return fn(bookkeeping);};var _interactiveUpdatesImpl=function(fn,a,b){return fn(a,b);};var _flushInteractiveUpdatesImpl=function(){};var isBatching=false;function batchedUpdates(fn,bookkeeping){if(isBatching){// If we are currently inside another batch, we need to wait until it
// fully completes before restoring state.
return fn(bookkeeping);}isBatching=true;try{return _batchedUpdatesImpl(fn,bookkeeping);}finally{// Here we wait until all updates have propagated, which is important
// when using controlled components within layers:
// https://github.com/facebook/react/issues/1698
// Then we restore state of any controlled component.
isBatching=false;var controlledComponentsHavePendingUpdates=needsStateRestore();if(controlledComponentsHavePendingUpdates){// If a controlled event was fired, we may need to restore the state of
// the DOM node back to the controlled value. This is necessary when React
// bails out of the update without touching the DOM.
_flushInteractiveUpdatesImpl();restoreStateIfNeeded();}}}function interactiveUpdates(fn,a,b){return _interactiveUpdatesImpl(fn,a,b);}function setBatchingImplementation(batchedUpdatesImpl,interactiveUpdatesImpl,flushInteractiveUpdatesImpl){_batchedUpdatesImpl=batchedUpdatesImpl;_interactiveUpdatesImpl=interactiveUpdatesImpl;_flushInteractiveUpdatesImpl=flushInteractiveUpdatesImpl;}/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */var supportedInputTypes={color:true,date:true,datetime:true,'datetime-local':true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function isTextInputElement(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();if(nodeName==='input'){return!!supportedInputTypes[elem.type];}if(nodeName==='textarea'){return true;}return false;}/**
 * HTML nodeType values that represent the type of the node
 */var ELEMENT_NODE=1;var TEXT_NODE=3;var COMMENT_NODE=8;var DOCUMENT_NODE=9;var DOCUMENT_FRAGMENT_NODE=11;/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */function getEventTarget(nativeEvent){// Fallback to nativeEvent.srcElement for IE9
// https://github.com/facebook/react/issues/12506
var target=nativeEvent.target||nativeEvent.srcElement||window;// Normalize SVG <use> element events #4963
if(target.correspondingUseElement){target=target.correspondingUseElement;}// Safari may fire events on text nodes (Node.TEXT_NODE is 3).
// @see http://www.quirksmode.org/js/events_properties.html
return target.nodeType===TEXT_NODE?target.parentNode:target;}/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function isEventSupported(eventNameSuffix){if(!canUseDOM){return false;}var eventName='on'+eventNameSuffix;var isSupported=eventName in document;if(!isSupported){var element=document.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}return isSupported;}function isCheckable(elem){var type=elem.type;var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(type==='checkbox'||type==='radio');}function getTracker(node){return node._valueTracker;}function detachTracker(node){node._valueTracker=null;}function getValueFromNode(node){var value='';if(!node){return value;}if(isCheckable(node)){value=node.checked?'true':'false';}else{value=node.value;}return value;}function trackValueOnNode(node){var valueField=isCheckable(node)?'checked':'value';var descriptor=Object.getOwnPropertyDescriptor(node.constructor.prototype,valueField);var currentValue=''+node[valueField];// if someone has already defined a value or Safari, then bail
// and don't track value will cause over reporting of changes,
// but it's better then a hard failure
// (needed for certain tests that spyOn input values and Safari)
if(node.hasOwnProperty(valueField)||typeof descriptor==='undefined'||typeof descriptor.get!=='function'||typeof descriptor.set!=='function'){return;}var get=descriptor.get,set=descriptor.set;Object.defineProperty(node,valueField,{configurable:true,get:function(){return get.call(this);},set:function(value){currentValue=''+value;set.call(this,value);}});// We could've passed this the first time
// but it triggers a bug in IE11 and Edge 14/15.
// Calling defineProperty() again should be equivalent.
// https://github.com/facebook/react/issues/11768
Object.defineProperty(node,valueField,{enumerable:descriptor.enumerable});var tracker={getValue:function(){return currentValue;},setValue:function(value){currentValue=''+value;},stopTracking:function(){detachTracker(node);delete node[valueField];}};return tracker;}function track(node){if(getTracker(node)){return;}// TODO: Once it's just Fiber we can move this to node._wrapperState
node._valueTracker=trackValueOnNode(node);}function updateValueIfChanged(node){if(!node){return false;}var tracker=getTracker(node);// if there is no tracker at this point it's unlikely
// that trying again will succeed
if(!tracker){return true;}var lastValue=tracker.getValue();var nextValue=getValueFromNode(node);if(nextValue!==lastValue){tracker.setValue(nextValue);return true;}return false;}var ReactSharedInternals=React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;var BEFORE_SLASH_RE=/^(.*)[\\\/]/;var describeComponentFrame=function(name,source,ownerName){var sourceInfo='';if(source){var path=source.fileName;var fileName=path.replace(BEFORE_SLASH_RE,'');{// In DEV, include code for a common special case:
// prefer "folder/index.js" instead of just "index.js".
if(/^index\./.test(fileName)){var match=path.match(BEFORE_SLASH_RE);if(match){var pathBeforeSlash=match[1];if(pathBeforeSlash){var folderName=pathBeforeSlash.replace(BEFORE_SLASH_RE,'');fileName=folderName+'/'+fileName;}}}}sourceInfo=' (at '+fileName+':'+source.lineNumber+')';}else if(ownerName){sourceInfo=' (created by '+ownerName+')';}return'\n    in '+(name||'Unknown')+sourceInfo;};// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol=typeof Symbol==='function'&&Symbol.for;var REACT_ELEMENT_TYPE=hasSymbol?Symbol.for('react.element'):0xeac7;var REACT_PORTAL_TYPE=hasSymbol?Symbol.for('react.portal'):0xeaca;var REACT_FRAGMENT_TYPE=hasSymbol?Symbol.for('react.fragment'):0xeacb;var REACT_STRICT_MODE_TYPE=hasSymbol?Symbol.for('react.strict_mode'):0xeacc;var REACT_PROFILER_TYPE=hasSymbol?Symbol.for('react.profiler'):0xead2;var REACT_PROVIDER_TYPE=hasSymbol?Symbol.for('react.provider'):0xeacd;var REACT_CONTEXT_TYPE=hasSymbol?Symbol.for('react.context'):0xeace;var REACT_ASYNC_MODE_TYPE=hasSymbol?Symbol.for('react.async_mode'):0xeacf;var REACT_FORWARD_REF_TYPE=hasSymbol?Symbol.for('react.forward_ref'):0xead0;var REACT_PLACEHOLDER_TYPE=hasSymbol?Symbol.for('react.placeholder'):0xead1;var MAYBE_ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';function getIteratorFn(maybeIterable){if(maybeIterable===null||typeof maybeIterable!=='object'){return null;}var maybeIterator=MAYBE_ITERATOR_SYMBOL&&maybeIterable[MAYBE_ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL];if(typeof maybeIterator==='function'){return maybeIterator;}return null;}var Pending=0;var Resolved=1;var Rejected=2;function getResultFromResolvedThenable(thenable){return thenable._reactResult;}function refineResolvedThenable(thenable){return thenable._reactStatus===Resolved?thenable._reactResult:null;}function getComponentName(type){if(type==null){// Host root, text node or just invalid type.
return null;}{if(typeof type.tag==='number'){warningWithoutStack$1(false,'Received an unexpected object in getComponentName(). '+'This is likely a bug in React. Please file an issue.');}}if(typeof type==='function'){return type.displayName||type.name||null;}if(typeof type==='string'){return type;}switch(type){case REACT_ASYNC_MODE_TYPE:return'AsyncMode';case REACT_FRAGMENT_TYPE:return'Fragment';case REACT_PORTAL_TYPE:return'Portal';case REACT_PROFILER_TYPE:return'Profiler';case REACT_STRICT_MODE_TYPE:return'StrictMode';case REACT_PLACEHOLDER_TYPE:return'Placeholder';}if(typeof type==='object'){switch(type.$$typeof){case REACT_CONTEXT_TYPE:return'Context.Consumer';case REACT_PROVIDER_TYPE:return'Context.Provider';case REACT_FORWARD_REF_TYPE:var renderFn=type.render;var functionName=renderFn.displayName||renderFn.name||'';return type.displayName||(functionName!==''?'ForwardRef('+functionName+')':'ForwardRef');}if(typeof type.then==='function'){var thenable=type;var resolvedThenable=refineResolvedThenable(thenable);if(resolvedThenable){return getComponentName(resolvedThenable);}}}return null;}var ReactDebugCurrentFrame=ReactSharedInternals.ReactDebugCurrentFrame;function describeFiber(fiber){switch(fiber.tag){case IndeterminateComponent:case FunctionalComponent:case FunctionalComponentLazy:case ClassComponent:case ClassComponentLazy:case HostComponent:case Mode:var owner=fiber._debugOwner;var source=fiber._debugSource;var name=getComponentName(fiber.type);var ownerName=null;if(owner){ownerName=getComponentName(owner.type);}return describeComponentFrame(name,source,ownerName);default:return'';}}function getStackByFiberInDevAndProd(workInProgress){var info='';var node=workInProgress;do{info+=describeFiber(node);node=node.return;}while(node);return info;}var current=null;var phase=null;function getCurrentFiberOwnerNameInDevOrNull(){{if(current===null){return null;}var owner=current._debugOwner;if(owner!==null&&typeof owner!=='undefined'){return getComponentName(owner.type);}}return null;}function getCurrentFiberStackInDev(){{if(current===null){return'';}// Safe because if current fiber exists, we are reconciling,
// and it is guaranteed to be the work-in-progress version.
return getStackByFiberInDevAndProd(current);}return'';}function resetCurrentFiber(){{ReactDebugCurrentFrame.getCurrentStack=null;current=null;phase=null;}}function setCurrentFiber(fiber){{ReactDebugCurrentFrame.getCurrentStack=getCurrentFiberStackInDev;current=fiber;phase=null;}}function setCurrentPhase(lifeCyclePhase){{phase=lifeCyclePhase;}}/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var warning=warningWithoutStack$1;{warning=function(condition,format){if(condition){return;}var ReactDebugCurrentFrame=ReactSharedInternals.ReactDebugCurrentFrame;var stack=ReactDebugCurrentFrame.getStackAddendum();// eslint-disable-next-line react-internal/warning-and-invariant-args
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}warningWithoutStack$1.apply(undefined,[false,format+'%s'].concat(args,[stack]));};}var warning$1=warning;// A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.
var RESERVED=0;// A simple string attribute.
// Attributes that aren't in the whitelist are presumed to have this type.
var STRING=1;// A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.
var BOOLEANISH_STRING=2;// A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
var BOOLEAN=3;// An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.
var OVERLOADED_BOOLEAN=4;// An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.
var NUMERIC=5;// An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.
var POSITIVE_NUMERIC=6;/* eslint-disable max-len */var ATTRIBUTE_NAME_START_CHAR=':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';/* eslint-enable max-len */var ATTRIBUTE_NAME_CHAR=ATTRIBUTE_NAME_START_CHAR+'\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';var ROOT_ATTRIBUTE_NAME='data-reactroot';var VALID_ATTRIBUTE_NAME_REGEX=new RegExp('^['+ATTRIBUTE_NAME_START_CHAR+']['+ATTRIBUTE_NAME_CHAR+']*$');var hasOwnProperty=Object.prototype.hasOwnProperty;var illegalAttributeNameCache={};var validatedAttributeNameCache={};function isAttributeNameSafe(attributeName){if(hasOwnProperty.call(validatedAttributeNameCache,attributeName)){return true;}if(hasOwnProperty.call(illegalAttributeNameCache,attributeName)){return false;}if(VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)){validatedAttributeNameCache[attributeName]=true;return true;}illegalAttributeNameCache[attributeName]=true;{warning$1(false,'Invalid attribute name: `%s`',attributeName);}return false;}function shouldIgnoreAttribute(name,propertyInfo,isCustomComponentTag){if(propertyInfo!==null){return propertyInfo.type===RESERVED;}if(isCustomComponentTag){return false;}if(name.length>2&&(name[0]==='o'||name[0]==='O')&&(name[1]==='n'||name[1]==='N')){return true;}return false;}function shouldRemoveAttributeWithWarning(name,value,propertyInfo,isCustomComponentTag){if(propertyInfo!==null&&propertyInfo.type===RESERVED){return false;}switch(typeof value){case'function':// $FlowIssue symbol is perfectly valid here
case'symbol':// eslint-disable-line
return true;case'boolean':{if(isCustomComponentTag){return false;}if(propertyInfo!==null){return!propertyInfo.acceptsBooleans;}else{var prefix=name.toLowerCase().slice(0,5);return prefix!=='data-'&&prefix!=='aria-';}}default:return false;}}function shouldRemoveAttribute(name,value,propertyInfo,isCustomComponentTag){if(value===null||typeof value==='undefined'){return true;}if(shouldRemoveAttributeWithWarning(name,value,propertyInfo,isCustomComponentTag)){return true;}if(isCustomComponentTag){return false;}if(propertyInfo!==null){switch(propertyInfo.type){case BOOLEAN:return!value;case OVERLOADED_BOOLEAN:return value===false;case NUMERIC:return isNaN(value);case POSITIVE_NUMERIC:return isNaN(value)||value<1;}}return false;}function getPropertyInfo(name){return properties.hasOwnProperty(name)?properties[name]:null;}function PropertyInfoRecord(name,type,mustUseProperty,attributeName,attributeNamespace){this.acceptsBooleans=type===BOOLEANISH_STRING||type===BOOLEAN||type===OVERLOADED_BOOLEAN;this.attributeName=attributeName;this.attributeNamespace=attributeNamespace;this.mustUseProperty=mustUseProperty;this.propertyName=name;this.type=type;}// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
var properties={};// These props are reserved by React. They shouldn't be written to the DOM.
['children','dangerouslySetInnerHTML',// TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue','defaultChecked','innerHTML','suppressContentEditableWarning','suppressHydrationWarning','style'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,RESERVED,false,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.
[['acceptCharset','accept-charset'],['className','class'],['htmlFor','for'],['httpEquiv','http-equiv']].forEach(function(_ref){var name=_ref[0],attributeName=_ref[1];properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,// attributeName
null);}// attributeNamespace
);// These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
['contentEditable','draggable','spellCheck','value'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEANISH_STRING,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.
['autoReverse','externalResourcesRequired','focusable','preserveAlpha'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEANISH_STRING,false,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// These are HTML boolean attributes.
['allowFullScreen','async',// Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus','autoPlay','controls','default','defer','disabled','formNoValidate','hidden','loop','noModule','noValidate','open','playsInline','readOnly','required','reversed','scoped','seamless',// Microdata
'itemScope'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEAN,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);// These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.
['checked',// Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple','muted','selected'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,BOOLEAN,true,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.
['capture','download'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,OVERLOADED_BOOLEAN,false,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// These are HTML attributes that must be positive numbers.
['cols','rows','size','span'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,POSITIVE_NUMERIC,false,// mustUseProperty
name,// attributeName
null);}// attributeNamespace
);// These are HTML attributes that must be numbers.
['rowSpan','start'].forEach(function(name){properties[name]=new PropertyInfoRecord(name,NUMERIC,false,// mustUseProperty
name.toLowerCase(),// attributeName
null);}// attributeNamespace
);var CAMELIZE=/[\-\:]([a-z])/g;var capitalize=function(token){return token[1].toUpperCase();};// This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML whitelist.
// Some of these attributes can be hard to find. This list was created by
// scrapping the MDN documentation.
['accent-height','alignment-baseline','arabic-form','baseline-shift','cap-height','clip-path','clip-rule','color-interpolation','color-interpolation-filters','color-profile','color-rendering','dominant-baseline','enable-background','fill-opacity','fill-rule','flood-color','flood-opacity','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','glyph-name','glyph-orientation-horizontal','glyph-orientation-vertical','horiz-adv-x','horiz-origin-x','image-rendering','letter-spacing','lighting-color','marker-end','marker-mid','marker-start','overline-position','overline-thickness','paint-order','panose-1','pointer-events','rendering-intent','shape-rendering','stop-color','stop-opacity','strikethrough-position','strikethrough-thickness','stroke-dasharray','stroke-dashoffset','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-opacity','stroke-width','text-anchor','text-decoration','text-rendering','underline-position','underline-thickness','unicode-bidi','unicode-range','units-per-em','v-alphabetic','v-hanging','v-ideographic','v-mathematical','vector-effect','vert-adv-y','vert-origin-x','vert-origin-y','word-spacing','writing-mode','xmlns:xlink','x-height'].forEach(function(attributeName){var name=attributeName.replace(CAMELIZE,capitalize);properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,null);}// attributeNamespace
);// String SVG attributes with the xlink namespace.
['xlink:actuate','xlink:arcrole','xlink:href','xlink:role','xlink:show','xlink:title','xlink:type'].forEach(function(attributeName){var name=attributeName.replace(CAMELIZE,capitalize);properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,'http://www.w3.org/1999/xlink');});// String SVG attributes with the xml namespace.
['xml:base','xml:lang','xml:space'].forEach(function(attributeName){var name=attributeName.replace(CAMELIZE,capitalize);properties[name]=new PropertyInfoRecord(name,STRING,false,// mustUseProperty
attributeName,'http://www.w3.org/XML/1998/namespace');});// Special case: this attribute exists both in HTML and SVG.
// Its "tabindex" attribute name is case-sensitive in SVG so we can't just use
// its React `tabIndex` name, like we do for attributes that exist only in HTML.
properties.tabIndex=new PropertyInfoRecord('tabIndex',STRING,false,// mustUseProperty
'tabindex',// attributeName
null);/**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */function getValueForProperty(node,name,expected,propertyInfo){{if(propertyInfo.mustUseProperty){var propertyName=propertyInfo.propertyName;return node[propertyName];}else{var attributeName=propertyInfo.attributeName;var stringValue=null;if(propertyInfo.type===OVERLOADED_BOOLEAN){if(node.hasAttribute(attributeName)){var value=node.getAttribute(attributeName);if(value===''){return true;}if(shouldRemoveAttribute(name,expected,propertyInfo,false)){return value;}if(value===''+expected){return expected;}return value;}}else if(node.hasAttribute(attributeName)){if(shouldRemoveAttribute(name,expected,propertyInfo,false)){// We had an attribute but shouldn't have had one, so read it
// for the error message.
return node.getAttribute(attributeName);}if(propertyInfo.type===BOOLEAN){// If this was a boolean, it doesn't matter what the value is
// the fact that we have it is the same as the expected.
return expected;}// Even if this property uses a namespace we use getAttribute
// because we assume its namespaced name is the same as our config.
// To use getAttributeNS we need the local name which we don't have
// in our config atm.
stringValue=node.getAttribute(attributeName);}if(shouldRemoveAttribute(name,expected,propertyInfo,false)){return stringValue===null?expected:stringValue;}else if(stringValue===''+expected){return expected;}else{return stringValue;}}}}/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */function getValueForAttribute(node,name,expected){{if(!isAttributeNameSafe(name)){return;}if(!node.hasAttribute(name)){return expected===undefined?undefined:null;}var value=node.getAttribute(name);if(value===''+expected){return expected;}return value;}}/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */function setValueForProperty(node,name,value,isCustomComponentTag){var propertyInfo=getPropertyInfo(name);if(shouldIgnoreAttribute(name,propertyInfo,isCustomComponentTag)){return;}if(shouldRemoveAttribute(name,value,propertyInfo,isCustomComponentTag)){value=null;}// If the prop isn't in the special list, treat it as a simple attribute.
if(isCustomComponentTag||propertyInfo===null){if(isAttributeNameSafe(name)){var _attributeName=name;if(value===null){node.removeAttribute(_attributeName);}else{node.setAttribute(_attributeName,''+value);}}return;}var mustUseProperty=propertyInfo.mustUseProperty;if(mustUseProperty){var propertyName=propertyInfo.propertyName;if(value===null){var type=propertyInfo.type;node[propertyName]=type===BOOLEAN?false:'';}else{// Contrary to `setAttribute`, object properties are properly
// `toString`ed by IE8/9.
node[propertyName]=value;}return;}// The rest are treated as attributes with special cases.
var attributeName=propertyInfo.attributeName,attributeNamespace=propertyInfo.attributeNamespace;if(value===null){node.removeAttribute(attributeName);}else{var _type=propertyInfo.type;var attributeValue=void 0;if(_type===BOOLEAN||_type===OVERLOADED_BOOLEAN&&value===true){attributeValue='';}else{// `setAttribute` with objects becomes only `[object]` in IE8/9,
// ('' + value) makes it output the correct toString()-value.
attributeValue=''+value;}if(attributeNamespace){node.setAttributeNS(attributeNamespace,attributeName,attributeValue);}else{node.setAttribute(attributeName,attributeValue);}}}// Flow does not allow string concatenation of most non-string types. To work
// around this limitation, we use an opaque type that can only be obtained by
// passing the value through getToStringValue first.
function toString(value){return''+value;}function getToStringValue(value){switch(typeof value){case'boolean':case'number':case'object':case'string':case'undefined':return value;default:// function, symbol are assigned as empty strings
return'';}}var ReactDebugCurrentFrame$1=null;var ReactControlledValuePropTypes={checkPropTypes:null};{ReactDebugCurrentFrame$1=ReactSharedInternals.ReactDebugCurrentFrame;var hasReadOnlyValue={button:true,checkbox:true,image:true,hidden:true,radio:true,reset:true,submit:true};var propTypes={value:function(props,propName,componentName){if(hasReadOnlyValue[props.type]||props.onChange||props.readOnly||props.disabled||props[propName]==null){return null;}return new Error('You provided a `value` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultValue`. Otherwise, '+'set either `onChange` or `readOnly`.');},checked:function(props,propName,componentName){if(props.onChange||props.readOnly||props.disabled||props[propName]==null){return null;}return new Error('You provided a `checked` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultChecked`. Otherwise, '+'set either `onChange` or `readOnly`.');}};/**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */ReactControlledValuePropTypes.checkPropTypes=function(tagName,props){checkPropTypes(propTypes,props,'prop',tagName,ReactDebugCurrentFrame$1.getStackAddendum);};}// Exports ReactDOM.createRoot
var enableUserTimingAPI=true;// Experimental error-boundary API that can recover from errors within a single
// render phase
var enableGetDerivedStateFromCatch=false;// Suspense
var enableSuspense=false;// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
var debugRenderPhaseSideEffects=false;// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:
var debugRenderPhaseSideEffectsForStrictMode=true;// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.
var replayFailedUnitOfWorkWithInvokeGuardedCallback=true;// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
var warnAboutDeprecatedLifecycles=false;// Warn about legacy context API
var warnAboutLegacyContextAPI=false;// Gather advanced timing metrics for Profiler subtrees.
var enableProfilerTimer=true;// Trace which interactions trigger each commit.
var enableSchedulerTracing=true;// Only used in www builds.
// Only used in www builds.
// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties
var disableInputAttributeSyncing=false;// TODO: direct imports like some-package/src/* are bad. Fix me.
var didWarnValueDefaultValue=false;var didWarnCheckedDefaultChecked=false;var didWarnControlledToUncontrolled=false;var didWarnUncontrolledToControlled=false;function isControlled(props){var usesChecked=props.type==='checkbox'||props.type==='radio';return usesChecked?props.checked!=null:props.value!=null;}/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */function getHostProps(element,props){var node=element;var checked=props.checked;var hostProps=_assign({},props,{defaultChecked:undefined,defaultValue:undefined,value:undefined,checked:checked!=null?checked:node._wrapperState.initialChecked});return hostProps;}function initWrapperState(element,props){{ReactControlledValuePropTypes.checkPropTypes('input',props);if(props.checked!==undefined&&props.defaultChecked!==undefined&&!didWarnCheckedDefaultChecked){warning$1(false,'%s contains an input of type %s with both checked and defaultChecked props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the checked prop, or the defaultChecked prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerNameInDevOrNull()||'A component',props.type);didWarnCheckedDefaultChecked=true;}if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue){warning$1(false,'%s contains an input of type %s with both value and defaultValue props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerNameInDevOrNull()||'A component',props.type);didWarnValueDefaultValue=true;}}var node=element;var defaultValue=props.defaultValue==null?'':props.defaultValue;node._wrapperState={initialChecked:props.checked!=null?props.checked:props.defaultChecked,initialValue:getToStringValue(props.value!=null?props.value:defaultValue),controlled:isControlled(props)};}function updateChecked(element,props){var node=element;var checked=props.checked;if(checked!=null){setValueForProperty(node,'checked',checked,false);}}function updateWrapper(element,props){var node=element;{var _controlled=isControlled(props);if(!node._wrapperState.controlled&&_controlled&&!didWarnUncontrolledToControlled){warning$1(false,'A component is changing an uncontrolled input of type %s to be controlled. '+'Input elements should not switch from uncontrolled to controlled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components',props.type);didWarnUncontrolledToControlled=true;}if(node._wrapperState.controlled&&!_controlled&&!didWarnControlledToUncontrolled){warning$1(false,'A component is changing a controlled input of type %s to be uncontrolled. '+'Input elements should not switch from controlled to uncontrolled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components',props.type);didWarnControlledToUncontrolled=true;}}updateChecked(element,props);var value=getToStringValue(props.value);var type=props.type;if(value!=null){if(type==='number'){if(value===0&&node.value===''||// We explicitly want to coerce to number here if possible.
// eslint-disable-next-line
node.value!=value){node.value=toString(value);}}else if(node.value!==toString(value)){node.value=toString(value);}}else if(type==='submit'||type==='reset'){// Submit/reset inputs need the attribute removed completely to avoid
// blank-text buttons.
node.removeAttribute('value');return;}if(disableInputAttributeSyncing){// When not syncing the value attribute, React only assigns a new value
// whenever the defaultValue React prop has changed. When not present,
// React does nothing
if(props.hasOwnProperty('defaultValue')){setDefaultValue(node,props.type,getToStringValue(props.defaultValue));}}else{// When syncing the value attribute, the value comes from a cascade of
// properties:
//  1. The value React property
//  2. The defaultValue React property
//  3. Otherwise there should be no change
if(props.hasOwnProperty('value')){setDefaultValue(node,props.type,value);}else if(props.hasOwnProperty('defaultValue')){setDefaultValue(node,props.type,getToStringValue(props.defaultValue));}}if(disableInputAttributeSyncing){// When not syncing the checked attribute, the attribute is directly
// controllable from the defaultValue React property. It needs to be
// updated as new props come in.
if(props.defaultChecked==null){node.removeAttribute('checked');}else{node.defaultChecked=!!props.defaultChecked;}}else{// When syncing the checked attribute, it only changes when it needs
// to be removed, such as transitioning from a checkbox into a text input
if(props.checked==null&&props.defaultChecked!=null){node.defaultChecked=!!props.defaultChecked;}}}function postMountWrapper(element,props,isHydrating){var node=element;// Do not assign value if it is already set. This prevents user text input
// from being lost during SSR hydration.
if(props.hasOwnProperty('value')||props.hasOwnProperty('defaultValue')){var type=props.type;var isButton=type==='submit'||type==='reset';// Avoid setting value attribute on submit/reset inputs as it overrides the
// default value provided by the browser. See: #12872
if(isButton&&(props.value===undefined||props.value===null)){return;}var _initialValue=toString(node._wrapperState.initialValue);// Do not assign value if it is already set. This prevents user text input
// from being lost during SSR hydration.
if(!isHydrating){if(disableInputAttributeSyncing){var value=getToStringValue(props.value);// When not syncing the value attribute, the value property points
// directly to the React prop. Only assign it if it exists.
if(value!=null){// Always assign on buttons so that it is possible to assign an
// empty string to clear button text.
//
// Otherwise, do not re-assign the value property if is empty. This
// potentially avoids a DOM write and prevents Firefox (~60.0.1) from
// prematurely marking required inputs as invalid. Equality is compared
// to the current value in case the browser provided value is not an
// empty string.
if(isButton||value!==node.value){node.value=toString(value);}}}else{// When syncing the value attribute, the value property should use
// the the wrapperState._initialValue property. This uses:
//
//   1. The value React property when present
//   2. The defaultValue React property when present
//   3. An empty string
if(_initialValue!==node.value){node.value=_initialValue;}}}if(disableInputAttributeSyncing){// When not syncing the value attribute, assign the value attribute
// directly from the defaultValue React property (when present)
var defaultValue=getToStringValue(props.defaultValue);if(defaultValue!=null){node.defaultValue=toString(defaultValue);}}else{// Otherwise, the value attribute is synchronized to the property,
// so we assign defaultValue to the same thing as the value property
// assignment step above.
node.defaultValue=_initialValue;}}// Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
// this is needed to work around a chrome bug where setting defaultChecked
// will sometimes influence the value of checked (even after detachment).
// Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
// We need to temporarily unset name to avoid disrupting radio button groups.
var name=node.name;if(name!==''){node.name='';}if(disableInputAttributeSyncing){// When not syncing the checked attribute, the checked property
// never gets assigned. It must be manually set. We don't want
// to do this when hydrating so that existing user input isn't
// modified
if(!isHydrating){updateChecked(element,props);}// Only assign the checked attribute if it is defined. This saves
// a DOM write when controlling the checked attribute isn't needed
// (text inputs, submit/reset)
if(props.hasOwnProperty('defaultChecked')){node.defaultChecked=!node.defaultChecked;node.defaultChecked=!!props.defaultChecked;}}else{// When syncing the checked attribute, both the the checked property and
// attribute are assigned at the same time using defaultChecked. This uses:
//
//   1. The checked React property when present
//   2. The defaultChecked React property when present
//   3. Otherwise, false
node.defaultChecked=!node.defaultChecked;node.defaultChecked=!!node._wrapperState.initialChecked;}if(name!==''){node.name=name;}}function restoreControlledState(element,props){var node=element;updateWrapper(node,props);updateNamedCousins(node,props);}function updateNamedCousins(rootNode,props){var name=props.name;if(props.type==='radio'&&name!=null){var queryRoot=rootNode;while(queryRoot.parentNode){queryRoot=queryRoot.parentNode;}// If `rootNode.form` was non-null, then we could try `form.elements`,
// but that sometimes behaves strangely in IE8. We could also try using
// `form.getElementsByName`, but that will only return direct children
// and won't include inputs that use the HTML5 `form=` attribute. Since
// the input might not even be in a form. It might not even be in the
// document. Let's just use the local `querySelectorAll` to ensure we don't
// miss anything.
var group=queryRoot.querySelectorAll('input[name='+JSON.stringify(''+name)+'][type="radio"]');for(var i=0;i<group.length;i++){var otherNode=group[i];if(otherNode===rootNode||otherNode.form!==rootNode.form){continue;}// This will throw if radio buttons rendered by different copies of React
// and the same name are rendered into the same form (same as #1939).
// That's probably okay; we don't support it just as we don't support
// mixing React radio buttons with non-React ones.
var otherProps=getFiberCurrentPropsFromNode$1(otherNode);!otherProps?invariant(false,'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.'):void 0;// We need update the tracked value on the named cousin since the value
// was changed but the input saw no event or value set
updateValueIfChanged(otherNode);// If this is a controlled radio button group, forcing the input that
// was previously checked to update will cause it to be come re-checked
// as appropriate.
updateWrapper(otherNode,otherProps);}}}// In Chrome, assigning defaultValue to certain input types triggers input validation.
// For number inputs, the display value loses trailing decimal points. For email inputs,
// Chrome raises "The specified value <x> is not a valid email address".
//
// Here we check to see if the defaultValue has actually changed, avoiding these problems
// when the user is inputting text
//
// https://github.com/facebook/react/issues/7253
function setDefaultValue(node,type,value){if(// Focused number inputs synchronize on blur. See ChangeEventPlugin.js
type!=='number'||node.ownerDocument.activeElement!==node){if(value==null){node.defaultValue=toString(node._wrapperState.initialValue);}else if(node.defaultValue!==toString(value)){node.defaultValue=toString(value);}}}var eventTypes$1={change:{phasedRegistrationNames:{bubbled:'onChange',captured:'onChangeCapture'},dependencies:[TOP_BLUR,TOP_CHANGE,TOP_CLICK,TOP_FOCUS,TOP_INPUT,TOP_KEY_DOWN,TOP_KEY_UP,TOP_SELECTION_CHANGE]}};function createAndAccumulateChangeEvent(inst,nativeEvent,target){var event=SyntheticEvent.getPooled(eventTypes$1.change,inst,nativeEvent,target);event.type='change';// Flag this event loop as needing state restore.
enqueueStateRestore(target);accumulateTwoPhaseDispatches(event);return event;}/**
 * For IE shims
 */var activeElement=null;var activeElementInst=null;/**
 * SECTION: handle `change` event
 */function shouldUseChangeEvent(elem){var nodeName=elem.nodeName&&elem.nodeName.toLowerCase();return nodeName==='select'||nodeName==='input'&&elem.type==='file';}function manualDispatchChangeEvent(nativeEvent){var event=createAndAccumulateChangeEvent(activeElementInst,nativeEvent,getEventTarget(nativeEvent));// If change and propertychange bubbled, we'd just bind to it like all the
// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
batchedUpdates(runEventInBatch,event);}function runEventInBatch(event){runEventsInBatch(event,false);}function getInstIfValueChanged(targetInst){var targetNode=getNodeFromInstance$1(targetInst);if(updateValueIfChanged(targetNode)){return targetInst;}}function getTargetInstForChangeEvent(topLevelType,targetInst){if(topLevelType===TOP_CHANGE){return targetInst;}}/**
 * SECTION: handle `input` event
 */var isInputEventSupported=false;if(canUseDOM){// IE9 claims to support the input event but fails to trigger it when
// deleting text, so we ignore its input events.
isInputEventSupported=isEventSupported('input')&&(!document.documentMode||document.documentMode>9);}/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */function startWatchingForValueChange(target,targetInst){activeElement=target;activeElementInst=targetInst;activeElement.attachEvent('onpropertychange',handlePropertyChange);}/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function stopWatchingForValueChange(){if(!activeElement){return;}activeElement.detachEvent('onpropertychange',handlePropertyChange);activeElement=null;activeElementInst=null;}/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function handlePropertyChange(nativeEvent){if(nativeEvent.propertyName!=='value'){return;}if(getInstIfValueChanged(activeElementInst)){manualDispatchChangeEvent(nativeEvent);}}function handleEventsForInputEventPolyfill(topLevelType,target,targetInst){if(topLevelType===TOP_FOCUS){// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
stopWatchingForValueChange();startWatchingForValueChange(target,targetInst);}else if(topLevelType===TOP_BLUR){stopWatchingForValueChange();}}// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType,targetInst){if(topLevelType===TOP_SELECTION_CHANGE||topLevelType===TOP_KEY_UP||topLevelType===TOP_KEY_DOWN){// On the selectionchange event, the target is just document which isn't
// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
return getInstIfValueChanged(activeElementInst);}}/**
 * SECTION: handle `click` event
 */function shouldUseClickEvent(elem){// Use the `click` event to detect changes to checkbox and radio inputs.
// This approach works across all browsers, whereas `change` does not fire
// until `blur` in IE8.
var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(elem.type==='checkbox'||elem.type==='radio');}function getTargetInstForClickEvent(topLevelType,targetInst){if(topLevelType===TOP_CLICK){return getInstIfValueChanged(targetInst);}}function getTargetInstForInputOrChangeEvent(topLevelType,targetInst){if(topLevelType===TOP_INPUT||topLevelType===TOP_CHANGE){return getInstIfValueChanged(targetInst);}}function handleControlledInputBlur(node){var state=node._wrapperState;if(!state||!state.controlled||node.type!=='number'){return;}if(!disableInputAttributeSyncing){// If controlled, assign the value attribute to the current value on blur
setDefaultValue(node,'number',node.value);}}/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */var ChangeEventPlugin={eventTypes:eventTypes$1,_isInputEventSupported:isInputEventSupported,extractEvents:function(topLevelType,targetInst,nativeEvent,nativeEventTarget){var targetNode=targetInst?getNodeFromInstance$1(targetInst):window;var getTargetInstFunc=void 0,handleEventFunc=void 0;if(shouldUseChangeEvent(targetNode)){getTargetInstFunc=getTargetInstForChangeEvent;}else if(isTextInputElement(targetNode)){if(isInputEventSupported){getTargetInstFunc=getTargetInstForInputOrChangeEvent;}else{getTargetInstFunc=getTargetInstForInputEventPolyfill;handleEventFunc=handleEventsForInputEventPolyfill;}}else if(shouldUseClickEvent(targetNode)){getTargetInstFunc=getTargetInstForClickEvent;}if(getTargetInstFunc){var inst=getTargetInstFunc(topLevelType,targetInst);if(inst){var event=createAndAccumulateChangeEvent(inst,nativeEvent,nativeEventTarget);return event;}}if(handleEventFunc){handleEventFunc(topLevelType,targetNode,targetInst);}// When blurring, set the value attribute for number inputs
if(topLevelType===TOP_BLUR){handleControlledInputBlur(targetNode);}}};/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */var DOMEventPluginOrder=['ResponderEventPlugin','SimpleEventPlugin','EnterLeaveEventPlugin','ChangeEventPlugin','SelectEventPlugin','BeforeInputEventPlugin'];var SyntheticUIEvent=SyntheticEvent.extend({view:null,detail:null});/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */var modifierKeyToProp={Alt:'altKey',Control:'ctrlKey',Meta:'metaKey',Shift:'shiftKey'};// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg){var syntheticEvent=this;var nativeEvent=syntheticEvent.nativeEvent;if(nativeEvent.getModifierState){return nativeEvent.getModifierState(keyArg);}var keyProp=modifierKeyToProp[keyArg];return keyProp?!!nativeEvent[keyProp]:false;}function getEventModifierState(nativeEvent){return modifierStateGetter;}var previousScreenX=0;var previousScreenY=0;// Use flags to signal movementX/Y has already been set
var isMovementXSet=false;var isMovementYSet=false;/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticMouseEvent=SyntheticUIEvent.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:getEventModifierState,button:null,buttons:null,relatedTarget:function(event){return event.relatedTarget||(event.fromElement===event.srcElement?event.toElement:event.fromElement);},movementX:function(event){if('movementX'in event){return event.movementX;}var screenX=previousScreenX;previousScreenX=event.screenX;if(!isMovementXSet){isMovementXSet=true;return 0;}return event.type==='mousemove'?event.screenX-screenX:0;},movementY:function(event){if('movementY'in event){return event.movementY;}var screenY=previousScreenY;previousScreenY=event.screenY;if(!isMovementYSet){isMovementYSet=true;return 0;}return event.type==='mousemove'?event.screenY-screenY:0;}});/**
 * @interface PointerEvent
 * @see http://www.w3.org/TR/pointerevents/
 */var SyntheticPointerEvent=SyntheticMouseEvent.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null});var eventTypes$2={mouseEnter:{registrationName:'onMouseEnter',dependencies:[TOP_MOUSE_OUT,TOP_MOUSE_OVER]},mouseLeave:{registrationName:'onMouseLeave',dependencies:[TOP_MOUSE_OUT,TOP_MOUSE_OVER]},pointerEnter:{registrationName:'onPointerEnter',dependencies:[TOP_POINTER_OUT,TOP_POINTER_OVER]},pointerLeave:{registrationName:'onPointerLeave',dependencies:[TOP_POINTER_OUT,TOP_POINTER_OVER]}};var EnterLeaveEventPlugin={eventTypes:eventTypes$2,/**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */extractEvents:function(topLevelType,targetInst,nativeEvent,nativeEventTarget){var isOverEvent=topLevelType===TOP_MOUSE_OVER||topLevelType===TOP_POINTER_OVER;var isOutEvent=topLevelType===TOP_MOUSE_OUT||topLevelType===TOP_POINTER_OUT;if(isOverEvent&&(nativeEvent.relatedTarget||nativeEvent.fromElement)){return null;}if(!isOutEvent&&!isOverEvent){// Must not be a mouse or pointer in or out - ignoring.
return null;}var win=void 0;if(nativeEventTarget.window===nativeEventTarget){// `nativeEventTarget` is probably a window object.
win=nativeEventTarget;}else{// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var doc=nativeEventTarget.ownerDocument;if(doc){win=doc.defaultView||doc.parentWindow;}else{win=window;}}var from=void 0;var to=void 0;if(isOutEvent){from=targetInst;var related=nativeEvent.relatedTarget||nativeEvent.toElement;to=related?getClosestInstanceFromNode(related):null;}else{// Moving to a node from outside the window.
from=null;to=targetInst;}if(from===to){// Nothing pertains to our managed components.
return null;}var eventInterface=void 0,leaveEventType=void 0,enterEventType=void 0,eventTypePrefix=void 0;if(topLevelType===TOP_MOUSE_OUT||topLevelType===TOP_MOUSE_OVER){eventInterface=SyntheticMouseEvent;leaveEventType=eventTypes$2.mouseLeave;enterEventType=eventTypes$2.mouseEnter;eventTypePrefix='mouse';}else if(topLevelType===TOP_POINTER_OUT||topLevelType===TOP_POINTER_OVER){eventInterface=SyntheticPointerEvent;leaveEventType=eventTypes$2.pointerLeave;enterEventType=eventTypes$2.pointerEnter;eventTypePrefix='pointer';}var fromNode=from==null?win:getNodeFromInstance$1(from);var toNode=to==null?win:getNodeFromInstance$1(to);var leave=eventInterface.getPooled(leaveEventType,from,nativeEvent,nativeEventTarget);leave.type=eventTypePrefix+'leave';leave.target=fromNode;leave.relatedTarget=toNode;var enter=eventInterface.getPooled(enterEventType,to,nativeEvent,nativeEventTarget);enter.type=eventTypePrefix+'enter';enter.target=toNode;enter.relatedTarget=fromNode;accumulateEnterLeaveDispatches(leave,enter,from,to);return[leave,enter];}};/*eslint-disable no-self-compare */var hasOwnProperty$1=Object.prototype.hasOwnProperty;/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */function is(x,y){// SameValue algorithm
if(x===y){// Steps 1-5, 7-10
// Steps 6.b-6.e: +0 != -0
// Added the nonzero y check to make Flow happy, but it is redundant
return x!==0||y!==0||1/x===1/y;}else{// Step 6.a: NaN == NaN
return x!==x&&y!==y;}}/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */function shallowEqual(objA,objB){if(is(objA,objB)){return true;}if(typeof objA!=='object'||objA===null||typeof objB!=='object'||objB===null){return false;}var keysA=Object.keys(objA);var keysB=Object.keys(objB);if(keysA.length!==keysB.length){return false;}// Test for A's keys different from B.
for(var i=0;i<keysA.length;i++){if(!hasOwnProperty$1.call(objB,keysA[i])||!is(objA[keysA[i]],objB[keysA[i]])){return false;}}return true;}/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */ /**
 * This API should be called `delete` but we'd have to make sure to always
 * transform these to strings for IE support. When this transform is fully
 * supported we can rename it.
 */function get(key){return key._reactInternalFiber;}function has(key){return key._reactInternalFiber!==undefined;}function set(key,value){key._reactInternalFiber=value;}// Don't change these two values. They're used by React Dev Tools.
var NoEffect=/*              */0;var PerformedWork=/*         */1;// You can change the rest (and add more).
var Placement=/*             */2;var Update=/*                */4;var PlacementAndUpdate=/*    */6;var Deletion=/*              */8;var ContentReset=/*          */16;var Callback=/*              */32;var DidCapture=/*            */64;var Ref=/*                   */128;var Snapshot=/*              */256;// Update & Callback & Ref & Snapshot
var LifecycleEffectMask=/*   */420;// Union of all host effects
var HostEffectMask=/*        */511;var Incomplete=/*            */512;var ShouldCapture=/*         */1024;var ReactCurrentOwner$1=ReactSharedInternals.ReactCurrentOwner;var MOUNTING=1;var MOUNTED=2;var UNMOUNTED=3;function isFiberMountedImpl(fiber){var node=fiber;if(!fiber.alternate){// If there is no alternate, this might be a new tree that isn't inserted
// yet. If it is, then it will have a pending insertion effect on it.
if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}while(node.return){node=node.return;if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}}}else{while(node.return){node=node.return;}}if(node.tag===HostRoot){// TODO: Check if this was a nested HostRoot when used with
// renderContainerIntoSubtree.
return MOUNTED;}// If we didn't hit the root, that means that we're in an disconnected tree
// that has been unmounted.
return UNMOUNTED;}function isFiberMounted(fiber){return isFiberMountedImpl(fiber)===MOUNTED;}function isMounted(component){{var owner=ReactCurrentOwner$1.current;if(owner!==null&&(owner.tag===ClassComponent||owner.tag===ClassComponentLazy)){var ownerFiber=owner;var instance=ownerFiber.stateNode;!instance._warnedAboutRefsInRender?warningWithoutStack$1(false,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(ownerFiber.type)||'A component'):void 0;instance._warnedAboutRefsInRender=true;}}var fiber=get(component);if(!fiber){return false;}return isFiberMountedImpl(fiber)===MOUNTED;}function assertIsMounted(fiber){!(isFiberMountedImpl(fiber)===MOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;}function findCurrentFiberUsingSlowPath(fiber){var alternate=fiber.alternate;if(!alternate){// If there is no alternate, then we only need to check if it is mounted.
var state=isFiberMountedImpl(fiber);!(state!==UNMOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(state===MOUNTING){return null;}return fiber;}// If we have two possible branches, we'll walk backwards up to the root
// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var a=fiber;var b=alternate;while(true){var parentA=a.return;var parentB=parentA?parentA.alternate:null;if(!parentA||!parentB){// We're at the root.
break;}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(parentA.child===parentB.child){var child=parentA.child;while(child){if(child===a){// We've determined that A is the current branch.
assertIsMounted(parentA);return fiber;}if(child===b){// We've determined that B is the current branch.
assertIsMounted(parentA);return alternate;}child=child.sibling;}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
invariant(false,'Unable to find node on an unmounted component.');}if(a.return!==b.return){// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
a=parentA;b=parentB;}else{// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var didFindChild=false;var _child=parentA.child;while(_child){if(_child===a){didFindChild=true;a=parentA;b=parentB;break;}if(_child===b){didFindChild=true;b=parentA;a=parentB;break;}_child=_child.sibling;}if(!didFindChild){// Search parent B's child set
_child=parentB.child;while(_child){if(_child===a){didFindChild=true;a=parentB;b=parentA;break;}if(_child===b){didFindChild=true;b=parentB;a=parentA;break;}_child=_child.sibling;}!didFindChild?invariant(false,'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.'):void 0;}}!(a.alternate===b)?invariant(false,'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.'):void 0;}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
!(a.tag===HostRoot)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(a.stateNode.current===a){// We've determined that A is the current branch.
return fiber;}// Otherwise B has to be current branch.
return alternate;}function findCurrentHostFiber(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child){node.child.return=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node.return||node.return===currentParent){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function findCurrentHostFiberWithNoPortals(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child&&node.tag!==HostPortal){node.child.return=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node.return||node.return===currentParent){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function addEventBubbleListener(element,eventType,listener){element.addEventListener(eventType,listener,false);}function addEventCaptureListener(element,eventType,listener){element.addEventListener(eventType,listener,true);}/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */var SyntheticAnimationEvent=SyntheticEvent.extend({animationName:null,elapsedTime:null,pseudoElement:null});/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */var SyntheticClipboardEvent=SyntheticEvent.extend({clipboardData:function(event){return'clipboardData'in event?event.clipboardData:window.clipboardData;}});/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticFocusEvent=SyntheticUIEvent.extend({relatedTarget:null});/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */function getEventCharCode(nativeEvent){var charCode=void 0;var keyCode=nativeEvent.keyCode;if('charCode'in nativeEvent){charCode=nativeEvent.charCode;// FF does not set `charCode` for the Enter-key, check against `keyCode`.
if(charCode===0&&keyCode===13){charCode=13;}}else{// IE8 does not implement `charCode`, but `keyCode` has the correct value.
charCode=keyCode;}// IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
// report Enter as charCode 10 when ctrl is pressed.
if(charCode===10){charCode=13;}// Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
// Must not discard the (non-)printable Enter-key.
if(charCode>=32||charCode===13){return charCode;}return 0;}/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var normalizeKey={Esc:'Escape',Spacebar:' ',Left:'ArrowLeft',Up:'ArrowUp',Right:'ArrowRight',Down:'ArrowDown',Del:'Delete',Win:'OS',Menu:'ContextMenu',Apps:'ContextMenu',Scroll:'ScrollLock',MozPrintableKey:'Unidentified'};/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var translateToKey={'8':'Backspace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Control','18':'Alt','19':'Pause','20':'CapsLock','27':'Escape','32':' ','33':'PageUp','34':'PageDown','35':'End','36':'Home','37':'ArrowLeft','38':'ArrowUp','39':'ArrowRight','40':'ArrowDown','45':'Insert','46':'Delete','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','144':'NumLock','145':'ScrollLock','224':'Meta'};/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function getEventKey(nativeEvent){if(nativeEvent.key){// Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var key=normalizeKey[nativeEvent.key]||nativeEvent.key;if(key!=='Unidentified'){return key;}}// Browser does not implement `key`, polyfill as much of it as we can.
if(nativeEvent.type==='keypress'){var charCode=getEventCharCode(nativeEvent);// The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return charCode===13?'Enter':String.fromCharCode(charCode);}if(nativeEvent.type==='keydown'||nativeEvent.type==='keyup'){// While user keyboard layout determines the actual meaning of each
// `keyCode` value, almost all function keys have a universal value.
return translateToKey[nativeEvent.keyCode]||'Unidentified';}return'';}/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticKeyboardEvent=SyntheticUIEvent.extend({key:getEventKey,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:getEventModifierState,// Legacy Interface
charCode:function(event){// `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated, but its replacement is not yet final and not
// implemented in any major browser. Only KeyPress has charCode.
if(event.type==='keypress'){return getEventCharCode(event);}return 0;},keyCode:function(event){// `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;},which:function(event){// `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event.
if(event.type==='keypress'){return getEventCharCode(event);}if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;}});/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticDragEvent=SyntheticMouseEvent.extend({dataTransfer:null});/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */var SyntheticTouchEvent=SyntheticUIEvent.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:getEventModifierState});/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */var SyntheticTransitionEvent=SyntheticEvent.extend({propertyName:null,elapsedTime:null,pseudoElement:null});/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var SyntheticWheelEvent=SyntheticMouseEvent.extend({deltaX:function(event){return'deltaX'in event?event.deltaX:// Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
'wheelDeltaX'in event?-event.wheelDeltaX:0;},deltaY:function(event){return'deltaY'in event?event.deltaY:// Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
'wheelDeltaY'in event?-event.wheelDeltaY:// Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
'wheelDelta'in event?-event.wheelDelta:0;},deltaZ:null,// Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:null});/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: [TOP_ABORT],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = new Map([
 *   [TOP_ABORT, { sameConfig }],
 * ]);
 */var interactiveEventTypeNames=[[TOP_BLUR,'blur'],[TOP_CANCEL,'cancel'],[TOP_CLICK,'click'],[TOP_CLOSE,'close'],[TOP_CONTEXT_MENU,'contextMenu'],[TOP_COPY,'copy'],[TOP_CUT,'cut'],[TOP_AUX_CLICK,'auxClick'],[TOP_DOUBLE_CLICK,'doubleClick'],[TOP_DRAG_END,'dragEnd'],[TOP_DRAG_START,'dragStart'],[TOP_DROP,'drop'],[TOP_FOCUS,'focus'],[TOP_INPUT,'input'],[TOP_INVALID,'invalid'],[TOP_KEY_DOWN,'keyDown'],[TOP_KEY_PRESS,'keyPress'],[TOP_KEY_UP,'keyUp'],[TOP_MOUSE_DOWN,'mouseDown'],[TOP_MOUSE_UP,'mouseUp'],[TOP_PASTE,'paste'],[TOP_PAUSE,'pause'],[TOP_PLAY,'play'],[TOP_POINTER_CANCEL,'pointerCancel'],[TOP_POINTER_DOWN,'pointerDown'],[TOP_POINTER_UP,'pointerUp'],[TOP_RATE_CHANGE,'rateChange'],[TOP_RESET,'reset'],[TOP_SEEKED,'seeked'],[TOP_SUBMIT,'submit'],[TOP_TOUCH_CANCEL,'touchCancel'],[TOP_TOUCH_END,'touchEnd'],[TOP_TOUCH_START,'touchStart'],[TOP_VOLUME_CHANGE,'volumeChange']];var nonInteractiveEventTypeNames=[[TOP_ABORT,'abort'],[TOP_ANIMATION_END,'animationEnd'],[TOP_ANIMATION_ITERATION,'animationIteration'],[TOP_ANIMATION_START,'animationStart'],[TOP_CAN_PLAY,'canPlay'],[TOP_CAN_PLAY_THROUGH,'canPlayThrough'],[TOP_DRAG,'drag'],[TOP_DRAG_ENTER,'dragEnter'],[TOP_DRAG_EXIT,'dragExit'],[TOP_DRAG_LEAVE,'dragLeave'],[TOP_DRAG_OVER,'dragOver'],[TOP_DURATION_CHANGE,'durationChange'],[TOP_EMPTIED,'emptied'],[TOP_ENCRYPTED,'encrypted'],[TOP_ENDED,'ended'],[TOP_ERROR,'error'],[TOP_GOT_POINTER_CAPTURE,'gotPointerCapture'],[TOP_LOAD,'load'],[TOP_LOADED_DATA,'loadedData'],[TOP_LOADED_METADATA,'loadedMetadata'],[TOP_LOAD_START,'loadStart'],[TOP_LOST_POINTER_CAPTURE,'lostPointerCapture'],[TOP_MOUSE_MOVE,'mouseMove'],[TOP_MOUSE_OUT,'mouseOut'],[TOP_MOUSE_OVER,'mouseOver'],[TOP_PLAYING,'playing'],[TOP_POINTER_MOVE,'pointerMove'],[TOP_POINTER_OUT,'pointerOut'],[TOP_POINTER_OVER,'pointerOver'],[TOP_PROGRESS,'progress'],[TOP_SCROLL,'scroll'],[TOP_SEEKING,'seeking'],[TOP_STALLED,'stalled'],[TOP_SUSPEND,'suspend'],[TOP_TIME_UPDATE,'timeUpdate'],[TOP_TOGGLE,'toggle'],[TOP_TOUCH_MOVE,'touchMove'],[TOP_TRANSITION_END,'transitionEnd'],[TOP_WAITING,'waiting'],[TOP_WHEEL,'wheel']];var eventTypes$4={};var topLevelEventsToDispatchConfig={};function addEventTypeNameToConfig(_ref,isInteractive){var topEvent=_ref[0],event=_ref[1];var capitalizedEvent=event[0].toUpperCase()+event.slice(1);var onEvent='on'+capitalizedEvent;var type={phasedRegistrationNames:{bubbled:onEvent,captured:onEvent+'Capture'},dependencies:[topEvent],isInteractive:isInteractive};eventTypes$4[event]=type;topLevelEventsToDispatchConfig[topEvent]=type;}interactiveEventTypeNames.forEach(function(eventTuple){addEventTypeNameToConfig(eventTuple,true);});nonInteractiveEventTypeNames.forEach(function(eventTuple){addEventTypeNameToConfig(eventTuple,false);});// Only used in DEV for exhaustiveness validation.
var knownHTMLTopLevelTypes=[TOP_ABORT,TOP_CANCEL,TOP_CAN_PLAY,TOP_CAN_PLAY_THROUGH,TOP_CLOSE,TOP_DURATION_CHANGE,TOP_EMPTIED,TOP_ENCRYPTED,TOP_ENDED,TOP_ERROR,TOP_INPUT,TOP_INVALID,TOP_LOAD,TOP_LOADED_DATA,TOP_LOADED_METADATA,TOP_LOAD_START,TOP_PAUSE,TOP_PLAY,TOP_PLAYING,TOP_PROGRESS,TOP_RATE_CHANGE,TOP_RESET,TOP_SEEKED,TOP_SEEKING,TOP_STALLED,TOP_SUBMIT,TOP_SUSPEND,TOP_TIME_UPDATE,TOP_TOGGLE,TOP_VOLUME_CHANGE,TOP_WAITING];var SimpleEventPlugin={eventTypes:eventTypes$4,isInteractiveTopLevelEventType:function(topLevelType){var config=topLevelEventsToDispatchConfig[topLevelType];return config!==undefined&&config.isInteractive===true;},extractEvents:function(topLevelType,targetInst,nativeEvent,nativeEventTarget){var dispatchConfig=topLevelEventsToDispatchConfig[topLevelType];if(!dispatchConfig){return null;}var EventConstructor=void 0;switch(topLevelType){case TOP_KEY_PRESS:// Firefox creates a keypress event for function keys too. This removes
// the unwanted keypress events. Enter is however both printable and
// non-printable. One would expect Tab to be as well (but it isn't).
if(getEventCharCode(nativeEvent)===0){return null;}/* falls through */case TOP_KEY_DOWN:case TOP_KEY_UP:EventConstructor=SyntheticKeyboardEvent;break;case TOP_BLUR:case TOP_FOCUS:EventConstructor=SyntheticFocusEvent;break;case TOP_CLICK:// Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(nativeEvent.button===2){return null;}/* falls through */case TOP_AUX_CLICK:case TOP_DOUBLE_CLICK:case TOP_MOUSE_DOWN:case TOP_MOUSE_MOVE:case TOP_MOUSE_UP:// TODO: Disabled elements should not respond to mouse events
/* falls through */case TOP_MOUSE_OUT:case TOP_MOUSE_OVER:case TOP_CONTEXT_MENU:EventConstructor=SyntheticMouseEvent;break;case TOP_DRAG:case TOP_DRAG_END:case TOP_DRAG_ENTER:case TOP_DRAG_EXIT:case TOP_DRAG_LEAVE:case TOP_DRAG_OVER:case TOP_DRAG_START:case TOP_DROP:EventConstructor=SyntheticDragEvent;break;case TOP_TOUCH_CANCEL:case TOP_TOUCH_END:case TOP_TOUCH_MOVE:case TOP_TOUCH_START:EventConstructor=SyntheticTouchEvent;break;case TOP_ANIMATION_END:case TOP_ANIMATION_ITERATION:case TOP_ANIMATION_START:EventConstructor=SyntheticAnimationEvent;break;case TOP_TRANSITION_END:EventConstructor=SyntheticTransitionEvent;break;case TOP_SCROLL:EventConstructor=SyntheticUIEvent;break;case TOP_WHEEL:EventConstructor=SyntheticWheelEvent;break;case TOP_COPY:case TOP_CUT:case TOP_PASTE:EventConstructor=SyntheticClipboardEvent;break;case TOP_GOT_POINTER_CAPTURE:case TOP_LOST_POINTER_CAPTURE:case TOP_POINTER_CANCEL:case TOP_POINTER_DOWN:case TOP_POINTER_MOVE:case TOP_POINTER_OUT:case TOP_POINTER_OVER:case TOP_POINTER_UP:EventConstructor=SyntheticPointerEvent;break;default:{if(knownHTMLTopLevelTypes.indexOf(topLevelType)===-1){warningWithoutStack$1(false,'SimpleEventPlugin: Unhandled event type, `%s`. This warning '+'is likely caused by a bug in React. Please file an issue.',topLevelType);}}// HTML Events
// @see http://www.w3.org/TR/html5/index.html#events-0
EventConstructor=SyntheticEvent;break;}var event=EventConstructor.getPooled(dispatchConfig,targetInst,nativeEvent,nativeEventTarget);accumulateTwoPhaseDispatches(event);return event;}};var isInteractiveTopLevelEventType=SimpleEventPlugin.isInteractiveTopLevelEventType;var CALLBACK_BOOKKEEPING_POOL_SIZE=10;var callbackBookkeepingPool=[];/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */function findRootContainerNode(inst){// TODO: It may be a good idea to cache this to prevent unnecessary DOM
// traversal, but caching is difficult to do correctly without using a
// mutation observer to listen for all DOM changes.
while(inst.return){inst=inst.return;}if(inst.tag!==HostRoot){// This can happen if we're in a detached tree.
return null;}return inst.stateNode.containerInfo;}// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst){if(callbackBookkeepingPool.length){var instance=callbackBookkeepingPool.pop();instance.topLevelType=topLevelType;instance.nativeEvent=nativeEvent;instance.targetInst=targetInst;return instance;}return{topLevelType:topLevelType,nativeEvent:nativeEvent,targetInst:targetInst,ancestors:[]};}function releaseTopLevelCallbackBookKeeping(instance){instance.topLevelType=null;instance.nativeEvent=null;instance.targetInst=null;instance.ancestors.length=0;if(callbackBookkeepingPool.length<CALLBACK_BOOKKEEPING_POOL_SIZE){callbackBookkeepingPool.push(instance);}}function handleTopLevel(bookKeeping){var targetInst=bookKeeping.targetInst;// Loop through the hierarchy, in case there's any nested components.
// It's important that we build the array of ancestors before calling any
// event handlers, because event handlers can modify the DOM, leading to
// inconsistencies with ReactMount's node cache. See #1105.
var ancestor=targetInst;do{if(!ancestor){bookKeeping.ancestors.push(ancestor);break;}var root=findRootContainerNode(ancestor);if(!root){break;}bookKeeping.ancestors.push(ancestor);ancestor=getClosestInstanceFromNode(root);}while(ancestor);for(var i=0;i<bookKeeping.ancestors.length;i++){targetInst=bookKeeping.ancestors[i];runExtractedEventsInBatch(bookKeeping.topLevelType,targetInst,bookKeeping.nativeEvent,getEventTarget(bookKeeping.nativeEvent));}}// TODO: can we stop exporting these?
var _enabled=true;function setEnabled(enabled){_enabled=!!enabled;}function isEnabled(){return _enabled;}/**
 * Traps top-level events by using event bubbling.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */function trapBubbledEvent(topLevelType,element){if(!element){return null;}var dispatch=isInteractiveTopLevelEventType(topLevelType)?dispatchInteractiveEvent:dispatchEvent;addEventBubbleListener(element,getRawEventName(topLevelType),// Check if interactive and wrap in interactiveUpdates
dispatch.bind(null,topLevelType));}/**
 * Traps a top-level event by using event capturing.
 *
 * @param {number} topLevelType Number from `TopLevelEventTypes`.
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */function trapCapturedEvent(topLevelType,element){if(!element){return null;}var dispatch=isInteractiveTopLevelEventType(topLevelType)?dispatchInteractiveEvent:dispatchEvent;addEventCaptureListener(element,getRawEventName(topLevelType),// Check if interactive and wrap in interactiveUpdates
dispatch.bind(null,topLevelType));}function dispatchInteractiveEvent(topLevelType,nativeEvent){interactiveUpdates(dispatchEvent,topLevelType,nativeEvent);}function dispatchEvent(topLevelType,nativeEvent){if(!_enabled){return;}var nativeEventTarget=getEventTarget(nativeEvent);var targetInst=getClosestInstanceFromNode(nativeEventTarget);if(targetInst!==null&&typeof targetInst.tag==='number'&&!isFiberMounted(targetInst)){// If we get an event (ex: img onload) before committing that
// component's mount, ignore it for now (that is, treat it as if it was an
// event on a non-React tree). We might also consider queueing events and
// dispatching them after the mount.
targetInst=null;}var bookKeeping=getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst);try{// Event queue being processed in the same cycle allows
// `preventDefault`.
batchedUpdates(handleTopLevel,bookKeeping);}finally{releaseTopLevelCallbackBookKeeping(bookKeeping);}}/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */var alreadyListeningTo={};var reactTopListenersCounter=0;/**
 * To ensure no conflicts with other potential React instances on the page
 */var topListenersIDKey='_reactListenersID'+(''+Math.random()).slice(2);function getListeningForDocument(mountAt){// In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
// directly.
if(!Object.prototype.hasOwnProperty.call(mountAt,topListenersIDKey)){mountAt[topListenersIDKey]=reactTopListenersCounter++;alreadyListeningTo[mountAt[topListenersIDKey]]={};}return alreadyListeningTo[mountAt[topListenersIDKey]];}/**
 * We listen for bubbled touch events on the document object.
 *
 * Firefox v8.01 (and possibly others) exhibited strange behavior when
 * mounting `onmousemove` events at some node that was not the document
 * element. The symptoms were that if your mouse is not moving over something
 * contained within that mount point (for example on the background) the
 * top-level listeners for `onmousemove` won't be called. However, if you
 * register the `mousemove` on the document object, then it will of course
 * catch all `mousemove`s. This along with iOS quirks, justifies restricting
 * top-level listeners to the document object only, at least for these
 * movement types of events and possibly all events.
 *
 * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
 *
 * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
 * they bubble to document.
 *
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @param {object} mountAt Container where to mount the listener
 */function listenTo(registrationName,mountAt){var isListening=getListeningForDocument(mountAt);var dependencies=registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){switch(dependency){case TOP_SCROLL:trapCapturedEvent(TOP_SCROLL,mountAt);break;case TOP_FOCUS:case TOP_BLUR:trapCapturedEvent(TOP_FOCUS,mountAt);trapCapturedEvent(TOP_BLUR,mountAt);// We set the flag for a single dependency later in this function,
// but this ensures we mark both as attached rather than just one.
isListening[TOP_BLUR]=true;isListening[TOP_FOCUS]=true;break;case TOP_CANCEL:case TOP_CLOSE:if(isEventSupported(getRawEventName(dependency))){trapCapturedEvent(dependency,mountAt);}break;case TOP_INVALID:case TOP_SUBMIT:case TOP_RESET:// We listen to them on the target DOM elements.
// Some of them bubble so we don't want them to fire twice.
break;default:// By default, listen on the top level to all non-media events.
// Media events don't bubble so adding the listener wouldn't do anything.
var isMediaEvent=mediaEventTypes.indexOf(dependency)!==-1;if(!isMediaEvent){trapBubbledEvent(dependency,mountAt);}break;}isListening[dependency]=true;}}}function isListeningToAllDependencies(registrationName,mountAt){var isListening=getListeningForDocument(mountAt);var dependencies=registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){return false;}}return true;}function getActiveElement(doc){doc=doc||(typeof document!=='undefined'?document:undefined);if(typeof doc==='undefined'){return null;}try{return doc.activeElement||doc.body;}catch(e){return doc.body;}}/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */function getLeafNode(node){while(node&&node.firstChild){node=node.firstChild;}return node;}/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */function getSiblingNode(node){while(node){if(node.nextSibling){return node.nextSibling;}node=node.parentNode;}}/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */function getNodeForCharacterOffset(root,offset){var node=getLeafNode(root);var nodeStart=0;var nodeEnd=0;while(node){if(node.nodeType===TEXT_NODE){nodeEnd=nodeStart+node.textContent.length;if(nodeStart<=offset&&nodeEnd>=offset){return{node:node,offset:offset-nodeStart};}nodeStart=nodeEnd;}node=getLeafNode(getSiblingNode(node));}}/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */function getOffsets(outerNode){var ownerDocument=outerNode.ownerDocument;var win=ownerDocument&&ownerDocument.defaultView||window;var selection=win.getSelection&&win.getSelection();if(!selection||selection.rangeCount===0){return null;}var anchorNode=selection.anchorNode,anchorOffset=selection.anchorOffset,focusNode=selection.focusNode,focusOffset=selection.focusOffset;// In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
// up/down buttons on an <input type="number">. Anonymous divs do not seem to
// expose properties, triggering a "Permission denied error" if any of its
// properties are accessed. The only seemingly possible way to avoid erroring
// is to access a property that typically works for non-anonymous divs and
// catch any error that may otherwise arise. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=208427
try{/* eslint-disable no-unused-expressions */anchorNode.nodeType;focusNode.nodeType;/* eslint-enable no-unused-expressions */}catch(e){return null;}return getModernOffsetsFromPoints(outerNode,anchorNode,anchorOffset,focusNode,focusOffset);}/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */function getModernOffsetsFromPoints(outerNode,anchorNode,anchorOffset,focusNode,focusOffset){var length=0;var start=-1;var end=-1;var indexWithinAnchor=0;var indexWithinFocus=0;var node=outerNode;var parentNode=null;outer:while(true){var next=null;while(true){if(node===anchorNode&&(anchorOffset===0||node.nodeType===TEXT_NODE)){start=length+anchorOffset;}if(node===focusNode&&(focusOffset===0||node.nodeType===TEXT_NODE)){end=length+focusOffset;}if(node.nodeType===TEXT_NODE){length+=node.nodeValue.length;}if((next=node.firstChild)===null){break;}// Moving from `node` to its first child `next`.
parentNode=node;node=next;}while(true){if(node===outerNode){// If `outerNode` has children, this is always the second time visiting
// it. If it has no children, this is still the first loop, and the only
// valid selection is anchorNode and focusNode both equal to this node
// and both offsets 0, in which case we will have handled above.
break outer;}if(parentNode===anchorNode&&++indexWithinAnchor===anchorOffset){start=length;}if(parentNode===focusNode&&++indexWithinFocus===focusOffset){end=length;}if((next=node.nextSibling)!==null){break;}node=parentNode;parentNode=node.parentNode;}// Moving from `node` to its next sibling `next`.
node=next;}if(start===-1||end===-1){// This should never happen. (Would happen if the anchor/focus nodes aren't
// actually inside the passed-in node.)
return null;}return{start:start,end:end};}/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function setOffsets(node,offsets){var doc=node.ownerDocument||document;var win=doc&&doc.defaultView||window;var selection=win.getSelection();var length=node.textContent.length;var start=Math.min(offsets.start,length);var end=offsets.end===undefined?start:Math.min(offsets.end,length);// IE 11 uses modern selection, but doesn't support the extend method.
// Flip backward selections, so we can set with a single range.
if(!selection.extend&&start>end){var temp=end;end=start;start=temp;}var startMarker=getNodeForCharacterOffset(node,start);var endMarker=getNodeForCharacterOffset(node,end);if(startMarker&&endMarker){if(selection.rangeCount===1&&selection.anchorNode===startMarker.node&&selection.anchorOffset===startMarker.offset&&selection.focusNode===endMarker.node&&selection.focusOffset===endMarker.offset){return;}var range=doc.createRange();range.setStart(startMarker.node,startMarker.offset);selection.removeAllRanges();if(start>end){selection.addRange(range);selection.extend(endMarker.node,endMarker.offset);}else{range.setEnd(endMarker.node,endMarker.offset);selection.addRange(range);}}}function isTextNode(node){return node&&node.nodeType===TEXT_NODE;}function containsNode(outerNode,innerNode){if(!outerNode||!innerNode){return false;}else if(outerNode===innerNode){return true;}else if(isTextNode(outerNode)){return false;}else if(isTextNode(innerNode)){return containsNode(outerNode,innerNode.parentNode);}else if('contains'in outerNode){return outerNode.contains(innerNode);}else if(outerNode.compareDocumentPosition){return!!(outerNode.compareDocumentPosition(innerNode)&16);}else{return false;}}function isInDocument(node){return node&&node.ownerDocument&&containsNode(node.ownerDocument.documentElement,node);}function getActiveElementDeep(){var win=window;var element=getActiveElement();while(element instanceof win.HTMLIFrameElement){// Accessing the contentDocument of a HTMLIframeElement can cause the browser
// to throw, e.g. if it has a cross-origin src attribute
try{win=element.contentDocument.defaultView;}catch(e){return element;}element=getActiveElement(win.document);}return element;}/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */ /**
 * @hasSelectionCapabilities: we get the element types that support selection
 * from https://html.spec.whatwg.org/#do-not-apply, looking at `selectionStart`
 * and `selectionEnd` rows.
 */function hasSelectionCapabilities(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();return nodeName&&(nodeName==='input'&&(elem.type==='text'||elem.type==='search'||elem.type==='tel'||elem.type==='url'||elem.type==='password')||nodeName==='textarea'||elem.contentEditable==='true');}function getSelectionInformation(){var focusedElem=getActiveElementDeep();return{focusedElem:focusedElem,selectionRange:hasSelectionCapabilities(focusedElem)?getSelection$1(focusedElem):null};}/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */function restoreSelection(priorSelectionInformation){var curFocusedElem=getActiveElementDeep();var priorFocusedElem=priorSelectionInformation.focusedElem;var priorSelectionRange=priorSelectionInformation.selectionRange;if(curFocusedElem!==priorFocusedElem&&isInDocument(priorFocusedElem)){if(priorSelectionRange!==null&&hasSelectionCapabilities(priorFocusedElem)){setSelection(priorFocusedElem,priorSelectionRange);}// Focusing a node can change the scroll position, which is undesirable
var ancestors=[];var ancestor=priorFocusedElem;while(ancestor=ancestor.parentNode){if(ancestor.nodeType===ELEMENT_NODE){ancestors.push({element:ancestor,left:ancestor.scrollLeft,top:ancestor.scrollTop});}}if(typeof priorFocusedElem.focus==='function'){priorFocusedElem.focus();}for(var i=0;i<ancestors.length;i++){var info=ancestors[i];info.element.scrollLeft=info.left;info.element.scrollTop=info.top;}}}/**
 * @getSelection: Gets the selection bounds of a focused textarea, input or
 * contentEditable node.
 * -@input: Look up selection bounds of this input
 * -@return {start: selectionStart, end: selectionEnd}
 */function getSelection$1(input){var selection=void 0;if('selectionStart'in input){// Modern browser with input or textarea.
selection={start:input.selectionStart,end:input.selectionEnd};}else{// Content editable or old IE textarea.
selection=getOffsets(input);}return selection||{start:0,end:0};}/**
 * @setSelection: Sets the selection bounds of a textarea or input and focuses
 * the input.
 * -@input     Set selection bounds of this input or textarea
 * -@offsets   Object of same form that is returned from get*
 */function setSelection(input,offsets){var start=offsets.start,end=offsets.end;if(end===undefined){end=start;}if('selectionStart'in input){input.selectionStart=start;input.selectionEnd=Math.min(end,input.value.length);}else{setOffsets(input,offsets);}}var skipSelectionChangeEvent=canUseDOM&&'documentMode'in document&&document.documentMode<=11;var eventTypes$3={select:{phasedRegistrationNames:{bubbled:'onSelect',captured:'onSelectCapture'},dependencies:[TOP_BLUR,TOP_CONTEXT_MENU,TOP_DRAG_END,TOP_FOCUS,TOP_KEY_DOWN,TOP_KEY_UP,TOP_MOUSE_DOWN,TOP_MOUSE_UP,TOP_SELECTION_CHANGE]}};var activeElement$1=null;var activeElementInst$1=null;var lastSelection=null;var mouseDown=false;/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */function getSelection(node){if('selectionStart'in node&&hasSelectionCapabilities(node)){return{start:node.selectionStart,end:node.selectionEnd};}else{var win=node.ownerDocument&&node.ownerDocument.defaultView||window;var selection=win.getSelection();return{anchorNode:selection.anchorNode,anchorOffset:selection.anchorOffset,focusNode:selection.focusNode,focusOffset:selection.focusOffset};}}/**
 * Get document associated with the event target.
 *
 * @param {object} nativeEventTarget
 * @return {Document}
 */function getEventTargetDocument(eventTarget){return eventTarget.window===eventTarget?eventTarget.document:eventTarget.nodeType===DOCUMENT_NODE?eventTarget:eventTarget.ownerDocument;}/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @param {object} nativeEventTarget
 * @return {?SyntheticEvent}
 */function constructSelectEvent(nativeEvent,nativeEventTarget){// Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
var doc=getEventTargetDocument(nativeEventTarget);if(mouseDown||activeElement$1==null||activeElement$1!==getActiveElement(doc)){return null;}// Only fire when selection has actually changed.
var currentSelection=getSelection(activeElement$1);if(!lastSelection||!shallowEqual(lastSelection,currentSelection)){lastSelection=currentSelection;var syntheticEvent=SyntheticEvent.getPooled(eventTypes$3.select,activeElementInst$1,nativeEvent,nativeEventTarget);syntheticEvent.type='select';syntheticEvent.target=activeElement$1;accumulateTwoPhaseDispatches(syntheticEvent);return syntheticEvent;}return null;}/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */var SelectEventPlugin={eventTypes:eventTypes$3,extractEvents:function(topLevelType,targetInst,nativeEvent,nativeEventTarget){var doc=getEventTargetDocument(nativeEventTarget);// Track whether all listeners exists for this plugin. If none exist, we do
// not extract events. See #3639.
if(!doc||!isListeningToAllDependencies('onSelect',doc)){return null;}var targetNode=targetInst?getNodeFromInstance$1(targetInst):window;switch(topLevelType){// Track the input node that has focus.
case TOP_FOCUS:if(isTextInputElement(targetNode)||targetNode.contentEditable==='true'){activeElement$1=targetNode;activeElementInst$1=targetInst;lastSelection=null;}break;case TOP_BLUR:activeElement$1=null;activeElementInst$1=null;lastSelection=null;break;// Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case TOP_MOUSE_DOWN:mouseDown=true;break;case TOP_CONTEXT_MENU:case TOP_MOUSE_UP:case TOP_DRAG_END:mouseDown=false;return constructSelectEvent(nativeEvent,nativeEventTarget);// Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't). IE's event fires out of order with respect
// to key and input events on deletion, so we discard it.
//
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
// This is also our approach for IE handling, for the reason above.
case TOP_SELECTION_CHANGE:if(skipSelectionChangeEvent){break;}// falls through
case TOP_KEY_DOWN:case TOP_KEY_UP:return constructSelectEvent(nativeEvent,nativeEventTarget);}return null;}};/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */injection.injectEventPluginOrder(DOMEventPluginOrder);setComponentTree(getFiberCurrentPropsFromNode$1,getInstanceFromNode$1,getNodeFromInstance$1);/**
 * Some important event plugins included by default (without having to require
 * them).
 */injection.injectEventPluginsByName({SimpleEventPlugin:SimpleEventPlugin,EnterLeaveEventPlugin:EnterLeaveEventPlugin,ChangeEventPlugin:ChangeEventPlugin,SelectEventPlugin:SelectEventPlugin,BeforeInputEventPlugin:BeforeInputEventPlugin});var didWarnSelectedSetOnOption=false;var didWarnInvalidChild=false;function flattenChildren(children){var content='';// Flatten children. We'll warn if they are invalid
// during validateProps() which runs for hydration too.
// Note that this would throw on non-element objects.
// Elements are stringified (which is normally irrelevant
// but matters for <fbt>).
React.Children.forEach(children,function(child){if(child==null){return;}content+=child;// Note: we don't warn about invalid children here.
// Instead, this is done separately below so that
// it happens during the hydration codepath too.
});return content;}/**
 * Implements an <option> host component that warns when `selected` is set.
 */function validateProps(element,props){{// This mirrors the codepath above, but runs for hydration too.
// Warn about invalid children here so that client and hydration are consistent.
// TODO: this seems like it could cause a DEV-only throw for hydration
// if children contains a non-element object. We should try to avoid that.
if(typeof props.children==='object'&&props.children!==null){React.Children.forEach(props.children,function(child){if(child==null){return;}if(typeof child==='string'||typeof child==='number'){return;}if(typeof child.type!=='string'){return;}if(!didWarnInvalidChild){didWarnInvalidChild=true;warning$1(false,'Only strings and numbers are supported as <option> children.');}});}// TODO: Remove support for `selected` in <option>.
if(props.selected!=null&&!didWarnSelectedSetOnOption){warning$1(false,'Use the `defaultValue` or `value` props on <select> instead of '+'setting `selected` on <option>.');didWarnSelectedSetOnOption=true;}}}function postMountWrapper$1(element,props){// value="" should make a value attribute (#6219)
if(props.value!=null){element.setAttribute('value',toString(getToStringValue(props.value)));}}function getHostProps$1(element,props){var hostProps=_assign({children:undefined},props);var content=flattenChildren(props.children);if(content){hostProps.children=content;}return hostProps;}// TODO: direct imports like some-package/src/* are bad. Fix me.
var didWarnValueDefaultValue$1=void 0;{didWarnValueDefaultValue$1=false;}function getDeclarationErrorAddendum(){var ownerName=getCurrentFiberOwnerNameInDevOrNull();if(ownerName){return'\n\nCheck the render method of `'+ownerName+'`.';}return'';}var valuePropNames=['value','defaultValue'];/**
 * Validation function for `value` and `defaultValue`.
 */function checkSelectPropTypes(props){ReactControlledValuePropTypes.checkPropTypes('select',props);for(var i=0;i<valuePropNames.length;i++){var propName=valuePropNames[i];if(props[propName]==null){continue;}var isArray=Array.isArray(props[propName]);if(props.multiple&&!isArray){warning$1(false,'The `%s` prop supplied to <select> must be an array if '+'`multiple` is true.%s',propName,getDeclarationErrorAddendum());}else if(!props.multiple&&isArray){warning$1(false,'The `%s` prop supplied to <select> must be a scalar '+'value if `multiple` is false.%s',propName,getDeclarationErrorAddendum());}}}function updateOptions(node,multiple,propValue,setDefaultSelected){var options=node.options;if(multiple){var selectedValues=propValue;var selectedValue={};for(var i=0;i<selectedValues.length;i++){// Prefix to avoid chaos with special keys.
selectedValue['$'+selectedValues[i]]=true;}for(var _i=0;_i<options.length;_i++){var selected=selectedValue.hasOwnProperty('$'+options[_i].value);if(options[_i].selected!==selected){options[_i].selected=selected;}if(selected&&setDefaultSelected){options[_i].defaultSelected=true;}}}else{// Do not set `select.value` as exact behavior isn't consistent across all
// browsers for all cases.
var _selectedValue=toString(getToStringValue(propValue));var defaultSelected=null;for(var _i2=0;_i2<options.length;_i2++){if(options[_i2].value===_selectedValue){options[_i2].selected=true;if(setDefaultSelected){options[_i2].defaultSelected=true;}return;}if(defaultSelected===null&&!options[_i2].disabled){defaultSelected=options[_i2];}}if(defaultSelected!==null){defaultSelected.selected=true;}}}/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */function getHostProps$2(element,props){return _assign({},props,{value:undefined});}function initWrapperState$1(element,props){var node=element;{checkSelectPropTypes(props);}node._wrapperState={wasMultiple:!!props.multiple};{if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue$1){warning$1(false,'Select elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled select '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValueDefaultValue$1=true;}}}function postMountWrapper$2(element,props){var node=element;node.multiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}else if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue,true);}}function postUpdateWrapper(element,props){var node=element;var wasMultiple=node._wrapperState.wasMultiple;node._wrapperState.wasMultiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}else if(wasMultiple!==!!props.multiple){// For simplicity, reapply `defaultValue` if `multiple` is toggled.
if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue,true);}else{// Revert the select back to its default unselected state.
updateOptions(node,!!props.multiple,props.multiple?[]:'',false);}}}function restoreControlledState$2(element,props){var node=element;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}}var didWarnValDefaultVal=false;/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */function getHostProps$3(element,props){var node=element;!(props.dangerouslySetInnerHTML==null)?invariant(false,'`dangerouslySetInnerHTML` does not make sense on <textarea>.'):void 0;// Always set children to the same thing. In IE9, the selection range will
// get reset if `textContent` is mutated.  We could add a check in setTextContent
// to only set the value if/when the value differs from the node value (which would
// completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
// solution. The value can be a boolean or object so that's why it's forced
// to be a string.
var hostProps=_assign({},props,{value:undefined,defaultValue:undefined,children:toString(node._wrapperState.initialValue)});return hostProps;}function initWrapperState$2(element,props){var node=element;{ReactControlledValuePropTypes.checkPropTypes('textarea',props);if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValDefaultVal){warning$1(false,'%s contains a textarea with both value and defaultValue props. '+'Textarea elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled textarea '+'and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerNameInDevOrNull()||'A component');didWarnValDefaultVal=true;}}var initialValue=props.value;// Only bother fetching default value if we're going to use it
if(initialValue==null){var defaultValue=props.defaultValue;// TODO (yungsters): Remove support for children content in <textarea>.
var children=props.children;if(children!=null){{warning$1(false,'Use the `defaultValue` or `value` props instead of setting '+'children on <textarea>.');}!(defaultValue==null)?invariant(false,'If you supply `defaultValue` on a <textarea>, do not pass children.'):void 0;if(Array.isArray(children)){!(children.length<=1)?invariant(false,'<textarea> can only have at most one child.'):void 0;children=children[0];}defaultValue=children;}if(defaultValue==null){defaultValue='';}initialValue=defaultValue;}node._wrapperState={initialValue:getToStringValue(initialValue)};}function updateWrapper$1(element,props){var node=element;var value=getToStringValue(props.value);var defaultValue=getToStringValue(props.defaultValue);if(value!=null){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
var newValue=toString(value);// To avoid side effects (such as losing text selection), only set value if changed
if(newValue!==node.value){node.value=newValue;}if(props.defaultValue==null&&node.defaultValue!==newValue){node.defaultValue=newValue;}}if(defaultValue!=null){node.defaultValue=toString(defaultValue);}}function postMountWrapper$3(element,props){var node=element;// This is in postMount because we need access to the DOM node, which is not
// available until after the component has mounted.
var textContent=node.textContent;// Only set node.value if textContent is equal to the expected
// initial value. In IE10/IE11 there is a bug where the placeholder attribute
// will populate textContent as well.
// https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
if(textContent===node._wrapperState.initialValue){node.value=textContent;}}function restoreControlledState$3(element,props){// DOM component is still mounted; update
updateWrapper$1(element,props);}var HTML_NAMESPACE$1='http://www.w3.org/1999/xhtml';var MATH_NAMESPACE='http://www.w3.org/1998/Math/MathML';var SVG_NAMESPACE='http://www.w3.org/2000/svg';var Namespaces={html:HTML_NAMESPACE$1,mathml:MATH_NAMESPACE,svg:SVG_NAMESPACE};// Assumes there is no parent namespace.
function getIntrinsicNamespace(type){switch(type){case'svg':return SVG_NAMESPACE;case'math':return MATH_NAMESPACE;default:return HTML_NAMESPACE$1;}}function getChildNamespace(parentNamespace,type){if(parentNamespace==null||parentNamespace===HTML_NAMESPACE$1){// No (or default) parent namespace: potential entry point.
return getIntrinsicNamespace(type);}if(parentNamespace===SVG_NAMESPACE&&type==='foreignObject'){// We're leaving SVG.
return HTML_NAMESPACE$1;}// By default, pass namespace below.
return parentNamespace;}/* globals MSApp */ /**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */var createMicrosoftUnsafeLocalFunction=function(func){if(typeof MSApp!=='undefined'&&MSApp.execUnsafeLocalFunction){return function(arg0,arg1,arg2,arg3){MSApp.execUnsafeLocalFunction(function(){return func(arg0,arg1,arg2,arg3);});};}else{return func;}};// SVG temp container for IE lacking innerHTML
var reusableSVGContainer=void 0;/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var setInnerHTML=createMicrosoftUnsafeLocalFunction(function(node,html){// IE does not have innerHTML for SVG nodes, so instead we inject the
// new markup in a temp node and then move the child nodes across into
// the target node
if(node.namespaceURI===Namespaces.svg&&!('innerHTML'in node)){reusableSVGContainer=reusableSVGContainer||document.createElement('div');reusableSVGContainer.innerHTML='<svg>'+html+'</svg>';var svgNode=reusableSVGContainer.firstChild;while(node.firstChild){node.removeChild(node.firstChild);}while(svgNode.firstChild){node.appendChild(svgNode.firstChild);}}else{node.innerHTML=html;}});/**
 * Set the textContent property of a node. For text updates, it's faster
 * to set the `nodeValue` of the Text node directly instead of using
 * `.textContent` which will remove the existing node and create a new one.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */var setTextContent=function(node,text){if(text){var firstChild=node.firstChild;if(firstChild&&firstChild===node.lastChild&&firstChild.nodeType===TEXT_NODE){firstChild.nodeValue=text;return;}}node.textContent=text;};/**
 * CSS properties which accept numbers but are not in units of "px".
 */var isUnitlessNumber={animationIterationCount:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,columns:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridArea:true,gridRow:true,gridRowEnd:true,gridRowSpan:true,gridRowStart:true,gridColumn:true,gridColumnEnd:true,gridColumnSpan:true,gridColumnStart:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,zoom:true,// SVG-related properties
fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true};/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */function prefixKey(prefix,key){return prefix+key.charAt(0).toUpperCase()+key.substring(1);}/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */var prefixes=['Webkit','ms','Moz','O'];// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop){prefixes.forEach(function(prefix){isUnitlessNumber[prefixKey(prefix,prop)]=isUnitlessNumber[prop];});});/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function dangerousStyleValue(name,value,isCustomProperty){// Note that we've removed escapeTextForBrowser() calls here since the
// whole string will be escaped when the attribute is injected into
// the markup. If you provide unsafe user data here they can inject
// arbitrary CSS which may be problematic (I couldn't repro this):
// https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
// http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
// This is not an XSS hole but instead a potential CSS injection issue
// which has lead to a greater discussion about how we're going to
// trust URLs moving forward. See #2115901
var isEmpty=value==null||typeof value==='boolean'||value==='';if(isEmpty){return'';}if(!isCustomProperty&&typeof value==='number'&&value!==0&&!(isUnitlessNumber.hasOwnProperty(name)&&isUnitlessNumber[name])){return value+'px';// Presumes implicit 'px' suffix for unitless numbers
}return(''+value).trim();}var uppercasePattern=/([A-Z])/g;var msPattern=/^ms-/;/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */function hyphenateStyleName(name){return name.replace(uppercasePattern,'-$1').toLowerCase().replace(msPattern,'-ms-');}var warnValidStyle=function(){};{// 'msTransform' is correct, but the other prefixes should be capitalized
var badVendoredStyleNamePattern=/^(?:webkit|moz|o)[A-Z]/;var msPattern$1=/^-ms-/;var hyphenPattern=/-(.)/g;// style values shouldn't contain a semicolon
var badStyleValueWithSemicolonPattern=/;\s*$/;var warnedStyleNames={};var warnedStyleValues={};var warnedForNaNValue=false;var warnedForInfinityValue=false;var camelize=function(string){return string.replace(hyphenPattern,function(_,character){return character.toUpperCase();});};var warnHyphenatedStyleName=function(name){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning$1(false,'Unsupported style property %s. Did you mean %s?',name,// As Andi Smith suggests
// (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
// is converted to lowercase `ms`.
camelize(name.replace(msPattern$1,'ms-')));};var warnBadVendoredStyleName=function(name){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning$1(false,'Unsupported vendor-prefixed style property %s. Did you mean %s?',name,name.charAt(0).toUpperCase()+name.slice(1));};var warnStyleValueWithSemicolon=function(name,value){if(warnedStyleValues.hasOwnProperty(value)&&warnedStyleValues[value]){return;}warnedStyleValues[value]=true;warning$1(false,"Style property values shouldn't contain a semicolon. "+'Try "%s: %s" instead.',name,value.replace(badStyleValueWithSemicolonPattern,''));};var warnStyleValueIsNaN=function(name,value){if(warnedForNaNValue){return;}warnedForNaNValue=true;warning$1(false,'`NaN` is an invalid value for the `%s` css style property.',name);};var warnStyleValueIsInfinity=function(name,value){if(warnedForInfinityValue){return;}warnedForInfinityValue=true;warning$1(false,'`Infinity` is an invalid value for the `%s` css style property.',name);};warnValidStyle=function(name,value){if(name.indexOf('-')>-1){warnHyphenatedStyleName(name);}else if(badVendoredStyleNamePattern.test(name)){warnBadVendoredStyleName(name);}else if(badStyleValueWithSemicolonPattern.test(value)){warnStyleValueWithSemicolon(name,value);}if(typeof value==='number'){if(isNaN(value)){warnStyleValueIsNaN(name,value);}else if(!isFinite(value)){warnStyleValueIsInfinity(name,value);}}};}var warnValidStyle$1=warnValidStyle;/**
 * Operations for dealing with CSS properties.
 */ /**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */function createDangerousStringForStyles(styles){{var serialized='';var delimiter='';for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var styleValue=styles[styleName];if(styleValue!=null){var isCustomProperty=styleName.indexOf('--')===0;serialized+=delimiter+hyphenateStyleName(styleName)+':';serialized+=dangerousStyleValue(styleName,styleValue,isCustomProperty);delimiter=';';}}return serialized||null;}}/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */function setValueForStyles(node,styles){var style=node.style;for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var isCustomProperty=styleName.indexOf('--')===0;{if(!isCustomProperty){warnValidStyle$1(styleName,styles[styleName]);}}var styleValue=dangerousStyleValue(styleName,styles[styleName],isCustomProperty);if(styleName==='float'){styleName='cssFloat';}if(isCustomProperty){style.setProperty(styleName,styleValue);}else{style[styleName]=styleValue;}}}// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
var omittedCloseTags={area:true,base:true,br:true,col:true,embed:true,hr:true,img:true,input:true,keygen:true,link:true,meta:true,param:true,source:true,track:true,wbr:true// NOTE: menuitem's close tag should be omitted, but that causes problems.
};// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.
var voidElementTags=_assign({menuitem:true},omittedCloseTags);// TODO: We can remove this if we add invariantWithStack()
// or add stack by default to invariants where possible.
var HTML$1='__html';var ReactDebugCurrentFrame$2=null;{ReactDebugCurrentFrame$2=ReactSharedInternals.ReactDebugCurrentFrame;}function assertValidProps(tag,props){if(!props){return;}// Note the use of `==` which checks for null or undefined.
if(voidElementTags[tag]){!(props.children==null&&props.dangerouslySetInnerHTML==null)?invariant(false,'%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s',tag,ReactDebugCurrentFrame$2.getStackAddendum()):void 0;}if(props.dangerouslySetInnerHTML!=null){!(props.children==null)?invariant(false,'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'):void 0;!(typeof props.dangerouslySetInnerHTML==='object'&&HTML$1 in props.dangerouslySetInnerHTML)?invariant(false,'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.'):void 0;}{!(props.suppressContentEditableWarning||!props.contentEditable||props.children==null)?warning$1(false,'A component is `contentEditable` and contains `children` managed by '+'React. It is now your responsibility to guarantee that none of '+'those nodes are unexpectedly modified or duplicated. This is '+'probably not intentional.'):void 0;}!(props.style==null||typeof props.style==='object')?invariant(false,'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s',ReactDebugCurrentFrame$2.getStackAddendum()):void 0;}function isCustomComponent(tagName,props){if(tagName.indexOf('-')===-1){return typeof props.is==='string';}switch(tagName){// These are reserved SVG and MathML elements.
// We don't mind this whitelist too much because we expect it to never grow.
// The alternative is to track the namespace in a few places which is convoluted.
// https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
case'annotation-xml':case'color-profile':case'font-face':case'font-face-src':case'font-face-uri':case'font-face-format':case'font-face-name':case'missing-glyph':return false;default:return true;}}// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames={// HTML
accept:'accept',acceptcharset:'acceptCharset','accept-charset':'acceptCharset',accesskey:'accessKey',action:'action',allowfullscreen:'allowFullScreen',alt:'alt',as:'as',async:'async',autocapitalize:'autoCapitalize',autocomplete:'autoComplete',autocorrect:'autoCorrect',autofocus:'autoFocus',autoplay:'autoPlay',autosave:'autoSave',capture:'capture',cellpadding:'cellPadding',cellspacing:'cellSpacing',challenge:'challenge',charset:'charSet',checked:'checked',children:'children',cite:'cite',class:'className',classid:'classID',classname:'className',cols:'cols',colspan:'colSpan',content:'content',contenteditable:'contentEditable',contextmenu:'contextMenu',controls:'controls',controlslist:'controlsList',coords:'coords',crossorigin:'crossOrigin',dangerouslysetinnerhtml:'dangerouslySetInnerHTML',data:'data',datetime:'dateTime',default:'default',defaultchecked:'defaultChecked',defaultvalue:'defaultValue',defer:'defer',dir:'dir',disabled:'disabled',download:'download',draggable:'draggable',enctype:'encType',for:'htmlFor',form:'form',formmethod:'formMethod',formaction:'formAction',formenctype:'formEncType',formnovalidate:'formNoValidate',formtarget:'formTarget',frameborder:'frameBorder',headers:'headers',height:'height',hidden:'hidden',high:'high',href:'href',hreflang:'hrefLang',htmlfor:'htmlFor',httpequiv:'httpEquiv','http-equiv':'httpEquiv',icon:'icon',id:'id',innerhtml:'innerHTML',inputmode:'inputMode',integrity:'integrity',is:'is',itemid:'itemID',itemprop:'itemProp',itemref:'itemRef',itemscope:'itemScope',itemtype:'itemType',keyparams:'keyParams',keytype:'keyType',kind:'kind',label:'label',lang:'lang',list:'list',loop:'loop',low:'low',manifest:'manifest',marginwidth:'marginWidth',marginheight:'marginHeight',max:'max',maxlength:'maxLength',media:'media',mediagroup:'mediaGroup',method:'method',min:'min',minlength:'minLength',multiple:'multiple',muted:'muted',name:'name',nomodule:'noModule',nonce:'nonce',novalidate:'noValidate',open:'open',optimum:'optimum',pattern:'pattern',placeholder:'placeholder',playsinline:'playsInline',poster:'poster',preload:'preload',profile:'profile',radiogroup:'radioGroup',readonly:'readOnly',referrerpolicy:'referrerPolicy',rel:'rel',required:'required',reversed:'reversed',role:'role',rows:'rows',rowspan:'rowSpan',sandbox:'sandbox',scope:'scope',scoped:'scoped',scrolling:'scrolling',seamless:'seamless',selected:'selected',shape:'shape',size:'size',sizes:'sizes',span:'span',spellcheck:'spellCheck',src:'src',srcdoc:'srcDoc',srclang:'srcLang',srcset:'srcSet',start:'start',step:'step',style:'style',summary:'summary',tabindex:'tabIndex',target:'target',title:'title',type:'type',usemap:'useMap',value:'value',width:'width',wmode:'wmode',wrap:'wrap',// SVG
about:'about',accentheight:'accentHeight','accent-height':'accentHeight',accumulate:'accumulate',additive:'additive',alignmentbaseline:'alignmentBaseline','alignment-baseline':'alignmentBaseline',allowreorder:'allowReorder',alphabetic:'alphabetic',amplitude:'amplitude',arabicform:'arabicForm','arabic-form':'arabicForm',ascent:'ascent',attributename:'attributeName',attributetype:'attributeType',autoreverse:'autoReverse',azimuth:'azimuth',basefrequency:'baseFrequency',baselineshift:'baselineShift','baseline-shift':'baselineShift',baseprofile:'baseProfile',bbox:'bbox',begin:'begin',bias:'bias',by:'by',calcmode:'calcMode',capheight:'capHeight','cap-height':'capHeight',clip:'clip',clippath:'clipPath','clip-path':'clipPath',clippathunits:'clipPathUnits',cliprule:'clipRule','clip-rule':'clipRule',color:'color',colorinterpolation:'colorInterpolation','color-interpolation':'colorInterpolation',colorinterpolationfilters:'colorInterpolationFilters','color-interpolation-filters':'colorInterpolationFilters',colorprofile:'colorProfile','color-profile':'colorProfile',colorrendering:'colorRendering','color-rendering':'colorRendering',contentscripttype:'contentScriptType',contentstyletype:'contentStyleType',cursor:'cursor',cx:'cx',cy:'cy',d:'d',datatype:'datatype',decelerate:'decelerate',descent:'descent',diffuseconstant:'diffuseConstant',direction:'direction',display:'display',divisor:'divisor',dominantbaseline:'dominantBaseline','dominant-baseline':'dominantBaseline',dur:'dur',dx:'dx',dy:'dy',edgemode:'edgeMode',elevation:'elevation',enablebackground:'enableBackground','enable-background':'enableBackground',end:'end',exponent:'exponent',externalresourcesrequired:'externalResourcesRequired',fill:'fill',fillopacity:'fillOpacity','fill-opacity':'fillOpacity',fillrule:'fillRule','fill-rule':'fillRule',filter:'filter',filterres:'filterRes',filterunits:'filterUnits',floodopacity:'floodOpacity','flood-opacity':'floodOpacity',floodcolor:'floodColor','flood-color':'floodColor',focusable:'focusable',fontfamily:'fontFamily','font-family':'fontFamily',fontsize:'fontSize','font-size':'fontSize',fontsizeadjust:'fontSizeAdjust','font-size-adjust':'fontSizeAdjust',fontstretch:'fontStretch','font-stretch':'fontStretch',fontstyle:'fontStyle','font-style':'fontStyle',fontvariant:'fontVariant','font-variant':'fontVariant',fontweight:'fontWeight','font-weight':'fontWeight',format:'format',from:'from',fx:'fx',fy:'fy',g1:'g1',g2:'g2',glyphname:'glyphName','glyph-name':'glyphName',glyphorientationhorizontal:'glyphOrientationHorizontal','glyph-orientation-horizontal':'glyphOrientationHorizontal',glyphorientationvertical:'glyphOrientationVertical','glyph-orientation-vertical':'glyphOrientationVertical',glyphref:'glyphRef',gradienttransform:'gradientTransform',gradientunits:'gradientUnits',hanging:'hanging',horizadvx:'horizAdvX','horiz-adv-x':'horizAdvX',horizoriginx:'horizOriginX','horiz-origin-x':'horizOriginX',ideographic:'ideographic',imagerendering:'imageRendering','image-rendering':'imageRendering',in2:'in2',in:'in',inlist:'inlist',intercept:'intercept',k1:'k1',k2:'k2',k3:'k3',k4:'k4',k:'k',kernelmatrix:'kernelMatrix',kernelunitlength:'kernelUnitLength',kerning:'kerning',keypoints:'keyPoints',keysplines:'keySplines',keytimes:'keyTimes',lengthadjust:'lengthAdjust',letterspacing:'letterSpacing','letter-spacing':'letterSpacing',lightingcolor:'lightingColor','lighting-color':'lightingColor',limitingconeangle:'limitingConeAngle',local:'local',markerend:'markerEnd','marker-end':'markerEnd',markerheight:'markerHeight',markermid:'markerMid','marker-mid':'markerMid',markerstart:'markerStart','marker-start':'markerStart',markerunits:'markerUnits',markerwidth:'markerWidth',mask:'mask',maskcontentunits:'maskContentUnits',maskunits:'maskUnits',mathematical:'mathematical',mode:'mode',numoctaves:'numOctaves',offset:'offset',opacity:'opacity',operator:'operator',order:'order',orient:'orient',orientation:'orientation',origin:'origin',overflow:'overflow',overlineposition:'overlinePosition','overline-position':'overlinePosition',overlinethickness:'overlineThickness','overline-thickness':'overlineThickness',paintorder:'paintOrder','paint-order':'paintOrder',panose1:'panose1','panose-1':'panose1',pathlength:'pathLength',patterncontentunits:'patternContentUnits',patterntransform:'patternTransform',patternunits:'patternUnits',pointerevents:'pointerEvents','pointer-events':'pointerEvents',points:'points',pointsatx:'pointsAtX',pointsaty:'pointsAtY',pointsatz:'pointsAtZ',prefix:'prefix',preservealpha:'preserveAlpha',preserveaspectratio:'preserveAspectRatio',primitiveunits:'primitiveUnits',property:'property',r:'r',radius:'radius',refx:'refX',refy:'refY',renderingintent:'renderingIntent','rendering-intent':'renderingIntent',repeatcount:'repeatCount',repeatdur:'repeatDur',requiredextensions:'requiredExtensions',requiredfeatures:'requiredFeatures',resource:'resource',restart:'restart',result:'result',results:'results',rotate:'rotate',rx:'rx',ry:'ry',scale:'scale',security:'security',seed:'seed',shaperendering:'shapeRendering','shape-rendering':'shapeRendering',slope:'slope',spacing:'spacing',specularconstant:'specularConstant',specularexponent:'specularExponent',speed:'speed',spreadmethod:'spreadMethod',startoffset:'startOffset',stddeviation:'stdDeviation',stemh:'stemh',stemv:'stemv',stitchtiles:'stitchTiles',stopcolor:'stopColor','stop-color':'stopColor',stopopacity:'stopOpacity','stop-opacity':'stopOpacity',strikethroughposition:'strikethroughPosition','strikethrough-position':'strikethroughPosition',strikethroughthickness:'strikethroughThickness','strikethrough-thickness':'strikethroughThickness',string:'string',stroke:'stroke',strokedasharray:'strokeDasharray','stroke-dasharray':'strokeDasharray',strokedashoffset:'strokeDashoffset','stroke-dashoffset':'strokeDashoffset',strokelinecap:'strokeLinecap','stroke-linecap':'strokeLinecap',strokelinejoin:'strokeLinejoin','stroke-linejoin':'strokeLinejoin',strokemiterlimit:'strokeMiterlimit','stroke-miterlimit':'strokeMiterlimit',strokewidth:'strokeWidth','stroke-width':'strokeWidth',strokeopacity:'strokeOpacity','stroke-opacity':'strokeOpacity',suppresscontenteditablewarning:'suppressContentEditableWarning',suppresshydrationwarning:'suppressHydrationWarning',surfacescale:'surfaceScale',systemlanguage:'systemLanguage',tablevalues:'tableValues',targetx:'targetX',targety:'targetY',textanchor:'textAnchor','text-anchor':'textAnchor',textdecoration:'textDecoration','text-decoration':'textDecoration',textlength:'textLength',textrendering:'textRendering','text-rendering':'textRendering',to:'to',transform:'transform',typeof:'typeof',u1:'u1',u2:'u2',underlineposition:'underlinePosition','underline-position':'underlinePosition',underlinethickness:'underlineThickness','underline-thickness':'underlineThickness',unicode:'unicode',unicodebidi:'unicodeBidi','unicode-bidi':'unicodeBidi',unicoderange:'unicodeRange','unicode-range':'unicodeRange',unitsperem:'unitsPerEm','units-per-em':'unitsPerEm',unselectable:'unselectable',valphabetic:'vAlphabetic','v-alphabetic':'vAlphabetic',values:'values',vectoreffect:'vectorEffect','vector-effect':'vectorEffect',version:'version',vertadvy:'vertAdvY','vert-adv-y':'vertAdvY',vertoriginx:'vertOriginX','vert-origin-x':'vertOriginX',vertoriginy:'vertOriginY','vert-origin-y':'vertOriginY',vhanging:'vHanging','v-hanging':'vHanging',videographic:'vIdeographic','v-ideographic':'vIdeographic',viewbox:'viewBox',viewtarget:'viewTarget',visibility:'visibility',vmathematical:'vMathematical','v-mathematical':'vMathematical',vocab:'vocab',widths:'widths',wordspacing:'wordSpacing','word-spacing':'wordSpacing',writingmode:'writingMode','writing-mode':'writingMode',x1:'x1',x2:'x2',x:'x',xchannelselector:'xChannelSelector',xheight:'xHeight','x-height':'xHeight',xlinkactuate:'xlinkActuate','xlink:actuate':'xlinkActuate',xlinkarcrole:'xlinkArcrole','xlink:arcrole':'xlinkArcrole',xlinkhref:'xlinkHref','xlink:href':'xlinkHref',xlinkrole:'xlinkRole','xlink:role':'xlinkRole',xlinkshow:'xlinkShow','xlink:show':'xlinkShow',xlinktitle:'xlinkTitle','xlink:title':'xlinkTitle',xlinktype:'xlinkType','xlink:type':'xlinkType',xmlbase:'xmlBase','xml:base':'xmlBase',xmllang:'xmlLang','xml:lang':'xmlLang',xmlns:'xmlns','xml:space':'xmlSpace',xmlnsxlink:'xmlnsXlink','xmlns:xlink':'xmlnsXlink',xmlspace:'xmlSpace',y1:'y1',y2:'y2',y:'y',ychannelselector:'yChannelSelector',z:'z',zoomandpan:'zoomAndPan'};var ariaProperties={'aria-current':0,// state
'aria-details':0,'aria-disabled':0,// state
'aria-hidden':0,// state
'aria-invalid':0,// state
'aria-keyshortcuts':0,'aria-label':0,'aria-roledescription':0,// Widget Attributes
'aria-autocomplete':0,'aria-checked':0,'aria-expanded':0,'aria-haspopup':0,'aria-level':0,'aria-modal':0,'aria-multiline':0,'aria-multiselectable':0,'aria-orientation':0,'aria-placeholder':0,'aria-pressed':0,'aria-readonly':0,'aria-required':0,'aria-selected':0,'aria-sort':0,'aria-valuemax':0,'aria-valuemin':0,'aria-valuenow':0,'aria-valuetext':0,// Live Region Attributes
'aria-atomic':0,'aria-busy':0,'aria-live':0,'aria-relevant':0,// Drag-and-Drop Attributes
'aria-dropeffect':0,'aria-grabbed':0,// Relationship Attributes
'aria-activedescendant':0,'aria-colcount':0,'aria-colindex':0,'aria-colspan':0,'aria-controls':0,'aria-describedby':0,'aria-errormessage':0,'aria-flowto':0,'aria-labelledby':0,'aria-owns':0,'aria-posinset':0,'aria-rowcount':0,'aria-rowindex':0,'aria-rowspan':0,'aria-setsize':0};var warnedProperties={};var rARIA=new RegExp('^(aria)-['+ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel=new RegExp('^(aria)[A-Z]['+ATTRIBUTE_NAME_CHAR+']*$');var hasOwnProperty$2=Object.prototype.hasOwnProperty;function validateProperty(tagName,name){if(hasOwnProperty$2.call(warnedProperties,name)&&warnedProperties[name]){return true;}if(rARIACamel.test(name)){var ariaName='aria-'+name.slice(4).toLowerCase();var correctName=ariaProperties.hasOwnProperty(ariaName)?ariaName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(correctName==null){warning$1(false,'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.',name);warnedProperties[name]=true;return true;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==correctName){warning$1(false,'Invalid ARIA attribute `%s`. Did you mean `%s`?',name,correctName);warnedProperties[name]=true;return true;}}if(rARIA.test(name)){var lowerCasedName=name.toLowerCase();var standardName=ariaProperties.hasOwnProperty(lowerCasedName)?lowerCasedName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(standardName==null){warnedProperties[name]=true;return false;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==standardName){warning$1(false,'Unknown ARIA attribute `%s`. Did you mean `%s`?',name,standardName);warnedProperties[name]=true;return true;}}return true;}function warnInvalidARIAProps(type,props){var invalidProps=[];for(var key in props){var isValid=validateProperty(type,key);if(!isValid){invalidProps.push(key);}}var unknownPropString=invalidProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(invalidProps.length===1){warning$1(false,'Invalid aria prop %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop',unknownPropString,type);}else if(invalidProps.length>1){warning$1(false,'Invalid aria props %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop',unknownPropString,type);}}function validateProperties(type,props){if(isCustomComponent(type,props)){return;}warnInvalidARIAProps(type,props);}var didWarnValueNull=false;function validateProperties$1(type,props){if(type!=='input'&&type!=='textarea'&&type!=='select'){return;}if(props!=null&&props.value===null&&!didWarnValueNull){didWarnValueNull=true;if(type==='select'&&props.multiple){warning$1(false,'`value` prop on `%s` should not be null. '+'Consider using an empty array when `multiple` is set to `true` '+'to clear the component or `undefined` for uncontrolled components.',type);}else{warning$1(false,'`value` prop on `%s` should not be null. '+'Consider using an empty string to clear the component or `undefined` '+'for uncontrolled components.',type);}}}var validateProperty$1=function(){};{var warnedProperties$1={};var _hasOwnProperty=Object.prototype.hasOwnProperty;var EVENT_NAME_REGEX=/^on./;var INVALID_EVENT_NAME_REGEX=/^on[^A-Z]/;var rARIA$1=new RegExp('^(aria)-['+ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel$1=new RegExp('^(aria)[A-Z]['+ATTRIBUTE_NAME_CHAR+']*$');validateProperty$1=function(tagName,name,value,canUseEventSystem){if(_hasOwnProperty.call(warnedProperties$1,name)&&warnedProperties$1[name]){return true;}var lowerCasedName=name.toLowerCase();if(lowerCasedName==='onfocusin'||lowerCasedName==='onfocusout'){warning$1(false,'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. '+'All React events are normalized to bubble, so onFocusIn and onFocusOut '+'are not needed/supported by React.');warnedProperties$1[name]=true;return true;}// We can't rely on the event system being injected on the server.
if(canUseEventSystem){if(registrationNameModules.hasOwnProperty(name)){return true;}var registrationName=possibleRegistrationNames.hasOwnProperty(lowerCasedName)?possibleRegistrationNames[lowerCasedName]:null;if(registrationName!=null){warning$1(false,'Invalid event handler property `%s`. Did you mean `%s`?',name,registrationName);warnedProperties$1[name]=true;return true;}if(EVENT_NAME_REGEX.test(name)){warning$1(false,'Unknown event handler property `%s`. It will be ignored.',name);warnedProperties$1[name]=true;return true;}}else if(EVENT_NAME_REGEX.test(name)){// If no event plugins have been injected, we are in a server environment.
// So we can't tell if the event name is correct for sure, but we can filter
// out known bad ones like `onclick`. We can't suggest a specific replacement though.
if(INVALID_EVENT_NAME_REGEX.test(name)){warning$1(false,'Invalid event handler property `%s`. '+'React events use the camelCase naming convention, for example `onClick`.',name);}warnedProperties$1[name]=true;return true;}// Let the ARIA attribute hook validate ARIA attributes
if(rARIA$1.test(name)||rARIACamel$1.test(name)){return true;}if(lowerCasedName==='innerhtml'){warning$1(false,'Directly setting property `innerHTML` is not permitted. '+'For more information, lookup documentation on `dangerouslySetInnerHTML`.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='aria'){warning$1(false,'The `aria` attribute is reserved for future use in React. '+'Pass individual `aria-` attributes instead.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='is'&&value!==null&&value!==undefined&&typeof value!=='string'){warning$1(false,'Received a `%s` for a string attribute `is`. If this is expected, cast '+'the value to a string.',typeof value);warnedProperties$1[name]=true;return true;}if(typeof value==='number'&&isNaN(value)){warning$1(false,'Received NaN for the `%s` attribute. If this is expected, cast '+'the value to a string.',name);warnedProperties$1[name]=true;return true;}var propertyInfo=getPropertyInfo(name);var isReserved=propertyInfo!==null&&propertyInfo.type===RESERVED;// Known attributes should match the casing specified in the property config.
if(possibleStandardNames.hasOwnProperty(lowerCasedName)){var standardName=possibleStandardNames[lowerCasedName];if(standardName!==name){warning$1(false,'Invalid DOM property `%s`. Did you mean `%s`?',name,standardName);warnedProperties$1[name]=true;return true;}}else if(!isReserved&&name!==lowerCasedName){// Unknown attributes should have lowercase casing since that's how they
// will be cased anyway with server rendering.
warning$1(false,'React does not recognize the `%s` prop on a DOM element. If you '+'intentionally want it to appear in the DOM as a custom '+'attribute, spell it as lowercase `%s` instead. '+'If you accidentally passed it from a parent component, remove '+'it from the DOM element.',name,lowerCasedName);warnedProperties$1[name]=true;return true;}if(typeof value==='boolean'&&shouldRemoveAttributeWithWarning(name,value,propertyInfo,false)){if(value){warning$1(false,'Received `%s` for a non-boolean attribute `%s`.\n\n'+'If you want to write it to the DOM, pass a string instead: '+'%s="%s" or %s={value.toString()}.',value,name,name,value,name);}else{warning$1(false,'Received `%s` for a non-boolean attribute `%s`.\n\n'+'If you want to write it to the DOM, pass a string instead: '+'%s="%s" or %s={value.toString()}.\n\n'+'If you used to conditionally omit it with %s={condition && value}, '+'pass %s={condition ? value : undefined} instead.',value,name,name,value,name,name,name);}warnedProperties$1[name]=true;return true;}// Now that we've validated casing, do not validate
// data types for reserved props
if(isReserved){return true;}// Warn when a known attribute is a bad type
if(shouldRemoveAttributeWithWarning(name,value,propertyInfo,false)){warnedProperties$1[name]=true;return false;}// Warn when passing the strings 'false' or 'true' into a boolean prop
if((value==='false'||value==='true')&&propertyInfo!==null&&propertyInfo.type===BOOLEAN){warning$1(false,'Received the string `%s` for the boolean attribute `%s`. '+'%s '+'Did you mean %s={%s}?',value,name,value==='false'?'The browser will interpret it as a truthy value.':'Although this works, it will not work as expected if you pass the string "false".',name,value);warnedProperties$1[name]=true;return true;}return true;};}var warnUnknownProperties=function(type,props,canUseEventSystem){var unknownProps=[];for(var key in props){var isValid=validateProperty$1(type,key,props[key],canUseEventSystem);if(!isValid){unknownProps.push(key);}}var unknownPropString=unknownProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(unknownProps.length===1){warning$1(false,'Invalid value for prop %s on <%s> tag. Either remove it from the element, '+'or pass a string or number value to keep it in the DOM. '+'For details, see https://fb.me/react-attribute-behavior',unknownPropString,type);}else if(unknownProps.length>1){warning$1(false,'Invalid values for props %s on <%s> tag. Either remove them from the element, '+'or pass a string or number value to keep them in the DOM. '+'For details, see https://fb.me/react-attribute-behavior',unknownPropString,type);}};function validateProperties$2(type,props,canUseEventSystem){if(isCustomComponent(type,props)){return;}warnUnknownProperties(type,props,canUseEventSystem);}// TODO: direct imports like some-package/src/* are bad. Fix me.
var didWarnInvalidHydration=false;var didWarnShadyDOM=false;var DANGEROUSLY_SET_INNER_HTML='dangerouslySetInnerHTML';var SUPPRESS_CONTENT_EDITABLE_WARNING='suppressContentEditableWarning';var SUPPRESS_HYDRATION_WARNING$1='suppressHydrationWarning';var AUTOFOCUS='autoFocus';var CHILDREN='children';var STYLE='style';var HTML='__html';var HTML_NAMESPACE=Namespaces.html;var warnedUnknownTags=void 0;var suppressHydrationWarning=void 0;var validatePropertiesInDevelopment=void 0;var warnForTextDifference=void 0;var warnForPropDifference=void 0;var warnForExtraAttributes=void 0;var warnForInvalidEventListener=void 0;var canDiffStyleForHydrationWarning=void 0;var normalizeMarkupForTextOrAttribute=void 0;var normalizeHTML=void 0;{warnedUnknownTags={// Chrome is the only major browser not shipping <time>. But as of July
// 2017 it intends to ship it due to widespread usage. We intentionally
// *don't* warn for <time> even if it's unrecognized by Chrome because
// it soon will be, and many apps have been using it anyway.
time:true,// There are working polyfills for <dialog>. Let people use it.
dialog:true,// Electron ships a custom <webview> tag to display external web content in
// an isolated frame and process.
// This tag is not present in non Electron environments such as JSDom which
// is often used for testing purposes.
// @see https://electronjs.org/docs/api/webview-tag
webview:true};validatePropertiesInDevelopment=function(type,props){validateProperties(type,props);validateProperties$1(type,props);validateProperties$2(type,props,/* canUseEventSystem */true);};// IE 11 parses & normalizes the style attribute as opposed to other
// browsers. It adds spaces and sorts the properties in some
// non-alphabetical order. Handling that would require sorting CSS
// properties in the client & server versions or applying
// `expectedStyle` to a temporary DOM node to read its `style` attribute
// normalized. Since it only affects IE, we're skipping style warnings
// in that browser completely in favor of doing all that work.
// See https://github.com/facebook/react/issues/11807
canDiffStyleForHydrationWarning=canUseDOM&&!document.documentMode;// HTML parsing normalizes CR and CRLF to LF.
// It also can turn \u0000 into \uFFFD inside attributes.
// https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
// If we have a mismatch, it might be caused by that.
// We will still patch up in this case but not fire the warning.
var NORMALIZE_NEWLINES_REGEX=/\r\n?/g;var NORMALIZE_NULL_AND_REPLACEMENT_REGEX=/\u0000|\uFFFD/g;normalizeMarkupForTextOrAttribute=function(markup){var markupString=typeof markup==='string'?markup:''+markup;return markupString.replace(NORMALIZE_NEWLINES_REGEX,'\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX,'');};warnForTextDifference=function(serverText,clientText){if(didWarnInvalidHydration){return;}var normalizedClientText=normalizeMarkupForTextOrAttribute(clientText);var normalizedServerText=normalizeMarkupForTextOrAttribute(serverText);if(normalizedServerText===normalizedClientText){return;}didWarnInvalidHydration=true;warningWithoutStack$1(false,'Text content did not match. Server: "%s" Client: "%s"',normalizedServerText,normalizedClientText);};warnForPropDifference=function(propName,serverValue,clientValue){if(didWarnInvalidHydration){return;}var normalizedClientValue=normalizeMarkupForTextOrAttribute(clientValue);var normalizedServerValue=normalizeMarkupForTextOrAttribute(serverValue);if(normalizedServerValue===normalizedClientValue){return;}didWarnInvalidHydration=true;warningWithoutStack$1(false,'Prop `%s` did not match. Server: %s Client: %s',propName,JSON.stringify(normalizedServerValue),JSON.stringify(normalizedClientValue));};warnForExtraAttributes=function(attributeNames){if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;var names=[];attributeNames.forEach(function(name){names.push(name);});warningWithoutStack$1(false,'Extra attributes from the server: %s',names);};warnForInvalidEventListener=function(registrationName,listener){if(listener===false){warning$1(false,'Expected `%s` listener to be a function, instead got `false`.\n\n'+'If you used to conditionally omit it with %s={condition && value}, '+'pass %s={condition ? value : undefined} instead.',registrationName,registrationName,registrationName);}else{warning$1(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.',registrationName,typeof listener);}};// Parse the HTML and read it back to normalize the HTML string so that it
// can be used for comparison.
normalizeHTML=function(parent,html){// We could have created a separate document here to avoid
// re-initializing custom elements if they exist. But this breaks
// how <noscript> is being handled. So we use the same document.
// See the discussion in https://github.com/facebook/react/pull/11157.
var testElement=parent.namespaceURI===HTML_NAMESPACE?parent.ownerDocument.createElement(parent.tagName):parent.ownerDocument.createElementNS(parent.namespaceURI,parent.tagName);testElement.innerHTML=html;return testElement.innerHTML;};}function ensureListeningTo(rootContainerElement,registrationName){var isDocumentOrFragment=rootContainerElement.nodeType===DOCUMENT_NODE||rootContainerElement.nodeType===DOCUMENT_FRAGMENT_NODE;var doc=isDocumentOrFragment?rootContainerElement:rootContainerElement.ownerDocument;listenTo(registrationName,doc);}function getOwnerDocumentFromRootContainer(rootContainerElement){return rootContainerElement.nodeType===DOCUMENT_NODE?rootContainerElement:rootContainerElement.ownerDocument;}function noop(){}function trapClickOnNonInteractiveElement(node){// Mobile Safari does not fire properly bubble click events on
// non-interactive elements, which means delegated click listeners do not
// fire. The workaround for this bug involves attaching an empty click
// listener on the target node.
// http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
// Just set it using the onclick property so that we don't have to manage any
// bookkeeping for it. Not sure if we need to clear it when the listener is
// removed.
// TODO: Only do this for the relevant Safaris maybe?
node.onclick=noop;}function setInitialDOMProperties(tag,domElement,rootContainerElement,nextProps,isCustomComponentTag){for(var propKey in nextProps){if(!nextProps.hasOwnProperty(propKey)){continue;}var nextProp=nextProps[propKey];if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}// Relies on `updateStylesByID` not mutating `styleUpdates`.
setValueForStyles(domElement,nextProp);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;if(nextHtml!=null){setInnerHTML(domElement,nextHtml);}}else if(propKey===CHILDREN){if(typeof nextProp==='string'){// Avoid setting initial textContent when the text is empty. In IE11 setting
// textContent on a <textarea> will cause the placeholder to not
// show within the <textarea> until it has been focused and blurred again.
// https://github.com/facebook/react/issues/6731#issuecomment-254874553
var canSetTextContent=tag!=='textarea'||nextProp!=='';if(canSetTextContent){setTextContent(domElement,nextProp);}}else if(typeof nextProp==='number'){setTextContent(domElement,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(propKey===AUTOFOCUS){// We polyfill it separately on the client during commit.
// We could have excluded it in the property list instead of
// adding a special case here, but then it wouldn't be emitted
// on server rendering (but we *do* want to emit it in SSR).
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else if(nextProp!=null){setValueForProperty(domElement,propKey,nextProp,isCustomComponentTag);}}}function updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag){// TODO: Handle wasCustomComponentTag
for(var i=0;i<updatePayload.length;i+=2){var propKey=updatePayload[i];var propValue=updatePayload[i+1];if(propKey===STYLE){setValueForStyles(domElement,propValue);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){setInnerHTML(domElement,propValue);}else if(propKey===CHILDREN){setTextContent(domElement,propValue);}else{setValueForProperty(domElement,propKey,propValue,isCustomComponentTag);}}}function createElement(type,props,rootContainerElement,parentNamespace){var isCustomComponentTag=void 0;// We create tags in the namespace of their parent container, except HTML
// tags get no namespace.
var ownerDocument=getOwnerDocumentFromRootContainer(rootContainerElement);var domElement=void 0;var namespaceURI=parentNamespace;if(namespaceURI===HTML_NAMESPACE){namespaceURI=getIntrinsicNamespace(type);}if(namespaceURI===HTML_NAMESPACE){{isCustomComponentTag=isCustomComponent(type,props);// Should this check be gated by parent namespace? Not sure we want to
// allow <SVG> or <mATH>.
!(isCustomComponentTag||type===type.toLowerCase())?warning$1(false,'<%s /> is using incorrect casing. '+'Use PascalCase for React components, '+'or lowercase for HTML elements.',type):void 0;}if(type==='script'){// Create the script via .innerHTML so its "parser-inserted" flag is
// set to true and it does not execute
var div=ownerDocument.createElement('div');div.innerHTML='<script><'+'/script>';// eslint-disable-line
// This is guaranteed to yield a script element.
var firstChild=div.firstChild;domElement=div.removeChild(firstChild);}else if(typeof props.is==='string'){// $FlowIssue `createElement` should be updated for Web Components
domElement=ownerDocument.createElement(type,{is:props.is});}else{// Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
// See discussion in https://github.com/facebook/react/pull/6896
// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
domElement=ownerDocument.createElement(type);// Normally attributes are assigned in `setInitialDOMProperties`, however the `multiple`
// attribute on `select`s needs to be added before `option`s are inserted. This prevents
// a bug where the `select` does not scroll to the correct option because singular
// `select` elements automatically pick the first item.
// See https://github.com/facebook/react/issues/13222
if(type==='select'&&props.multiple){var node=domElement;node.multiple=true;}}}else{domElement=ownerDocument.createElementNS(namespaceURI,type);}{if(namespaceURI===HTML_NAMESPACE){if(!isCustomComponentTag&&Object.prototype.toString.call(domElement)==='[object HTMLUnknownElement]'&&!Object.prototype.hasOwnProperty.call(warnedUnknownTags,type)){warnedUnknownTags[type]=true;warning$1(false,'The tag <%s> is unrecognized in this browser. '+'If you meant to render a React component, start its name with '+'an uppercase letter.',type);}}}return domElement;}function createTextNode(text,rootContainerElement){return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);}function setInitialProperties(domElement,tag,rawProps,rootContainerElement){var isCustomComponentTag=isCustomComponent(tag,rawProps);{validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning$1(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerNameInDevOrNull()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
var props=void 0;switch(tag){case'iframe':case'object':trapBubbledEvent(TOP_LOAD,domElement);props=rawProps;break;case'video':case'audio':// Create listener for each media event
for(var i=0;i<mediaEventTypes.length;i++){trapBubbledEvent(mediaEventTypes[i],domElement);}props=rawProps;break;case'source':trapBubbledEvent(TOP_ERROR,domElement);props=rawProps;break;case'img':case'image':case'link':trapBubbledEvent(TOP_ERROR,domElement);trapBubbledEvent(TOP_LOAD,domElement);props=rawProps;break;case'form':trapBubbledEvent(TOP_RESET,domElement);trapBubbledEvent(TOP_SUBMIT,domElement);props=rawProps;break;case'details':trapBubbledEvent(TOP_TOGGLE,domElement);props=rawProps;break;case'input':initWrapperState(domElement,rawProps);props=getHostProps(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':validateProps(domElement,rawProps);props=getHostProps$1(domElement,rawProps);break;case'select':initWrapperState$1(domElement,rawProps);props=getHostProps$2(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':initWrapperState$2(domElement,rawProps);props=getHostProps$3(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;default:props=rawProps;}assertValidProps(tag,props);setInitialDOMProperties(tag,domElement,rootContainerElement,props,isCustomComponentTag);switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper(domElement,rawProps,false);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper$3(domElement,rawProps);break;case'option':postMountWrapper$1(domElement,rawProps);break;case'select':postMountWrapper$2(domElement,rawProps);break;default:if(typeof props.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}}// Calculate the diff between the two objects.
function diffProperties(domElement,tag,lastRawProps,nextRawProps,rootContainerElement){{validatePropertiesInDevelopment(tag,nextRawProps);}var updatePayload=null;var lastProps=void 0;var nextProps=void 0;switch(tag){case'input':lastProps=getHostProps(domElement,lastRawProps);nextProps=getHostProps(domElement,nextRawProps);updatePayload=[];break;case'option':lastProps=getHostProps$1(domElement,lastRawProps);nextProps=getHostProps$1(domElement,nextRawProps);updatePayload=[];break;case'select':lastProps=getHostProps$2(domElement,lastRawProps);nextProps=getHostProps$2(domElement,nextRawProps);updatePayload=[];break;case'textarea':lastProps=getHostProps$3(domElement,lastRawProps);nextProps=getHostProps$3(domElement,nextRawProps);updatePayload=[];break;default:lastProps=lastRawProps;nextProps=nextRawProps;if(typeof lastProps.onClick!=='function'&&typeof nextProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}assertValidProps(tag,nextProps);var propKey=void 0;var styleName=void 0;var styleUpdates=null;for(propKey in lastProps){if(nextProps.hasOwnProperty(propKey)||!lastProps.hasOwnProperty(propKey)||lastProps[propKey]==null){continue;}if(propKey===STYLE){var lastStyle=lastProps[propKey];for(styleName in lastStyle){if(lastStyle.hasOwnProperty(styleName)){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}}else if(propKey===DANGEROUSLY_SET_INNER_HTML||propKey===CHILDREN){// Noop. This is handled by the clear text mechanism.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(propKey===AUTOFOCUS){// Noop. It doesn't work on updates anyway.
}else if(registrationNameModules.hasOwnProperty(propKey)){// This is a special case. If any listener updates we need to ensure
// that the "current" fiber pointer gets updated so we need a commit
// to update this element.
if(!updatePayload){updatePayload=[];}}else{// For all other deleted properties we add it to the queue. We use
// the whitelist in the commit phase instead.
(updatePayload=updatePayload||[]).push(propKey,null);}}for(propKey in nextProps){var nextProp=nextProps[propKey];var lastProp=lastProps!=null?lastProps[propKey]:undefined;if(!nextProps.hasOwnProperty(propKey)||nextProp===lastProp||nextProp==null&&lastProp==null){continue;}if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}if(lastProp){// Unset styles on `lastProp` but not on `nextProp`.
for(styleName in lastProp){if(lastProp.hasOwnProperty(styleName)&&(!nextProp||!nextProp.hasOwnProperty(styleName))){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}// Update styles that changed since `lastProp`.
for(styleName in nextProp){if(nextProp.hasOwnProperty(styleName)&&lastProp[styleName]!==nextProp[styleName]){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]=nextProp[styleName];}}}else{// Relies on `updateStylesByID` not mutating `styleUpdates`.
if(!styleUpdates){if(!updatePayload){updatePayload=[];}updatePayload.push(propKey,styleUpdates);}styleUpdates=nextProp;}}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;var lastHtml=lastProp?lastProp[HTML]:undefined;if(nextHtml!=null){if(lastHtml!==nextHtml){(updatePayload=updatePayload||[]).push(propKey,''+nextHtml);}}else{// TODO: It might be too late to clear this if we have children
// inserted already.
}}else if(propKey===CHILDREN){if(lastProp!==nextProp&&(typeof nextProp==='string'||typeof nextProp==='number')){(updatePayload=updatePayload||[]).push(propKey,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){// We eagerly listen to this even though we haven't committed yet.
if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}if(!updatePayload&&lastProp!==nextProp){// This is a special case. If any listener updates we need to ensure
// that the "current" props pointer gets updated so we need a commit
// to update this element.
updatePayload=[];}}else{// For any other property we always add it to the queue and then we
// filter it out using the whitelist during the commit.
(updatePayload=updatePayload||[]).push(propKey,nextProp);}}if(styleUpdates){(updatePayload=updatePayload||[]).push(STYLE,styleUpdates);}return updatePayload;}// Apply the diff.
function updateProperties(domElement,updatePayload,tag,lastRawProps,nextRawProps){// Update checked *before* name.
// In the middle of an update, it is possible to have multiple checked.
// When a checked radio tries to change name, browser makes another radio's checked false.
if(tag==='input'&&nextRawProps.type==='radio'&&nextRawProps.name!=null){updateChecked(domElement,nextRawProps);}var wasCustomComponentTag=isCustomComponent(tag,lastRawProps);var isCustomComponentTag=isCustomComponent(tag,nextRawProps);// Apply the diff.
updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag);// TODO: Ensure that an update gets scheduled if any of the special props
// changed.
switch(tag){case'input':// Update the wrapper around inputs *after* updating props. This has to
// happen after `updateDOMProperties`. Otherwise HTML5 input validations
// raise warnings and prevent the new value from being assigned.
updateWrapper(domElement,nextRawProps);break;case'textarea':updateWrapper$1(domElement,nextRawProps);break;case'select':// <select> value update needs to occur after <option> children
// reconciliation
postUpdateWrapper(domElement,nextRawProps);break;}}function getPossibleStandardName(propName){{var lowerCasedName=propName.toLowerCase();if(!possibleStandardNames.hasOwnProperty(lowerCasedName)){return null;}return possibleStandardNames[lowerCasedName]||null;}return null;}function diffHydratedProperties(domElement,tag,rawProps,parentNamespace,rootContainerElement){var isCustomComponentTag=void 0;var extraAttributeNames=void 0;{suppressHydrationWarning=rawProps[SUPPRESS_HYDRATION_WARNING$1]===true;isCustomComponentTag=isCustomComponent(tag,rawProps);validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning$1(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerNameInDevOrNull()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
switch(tag){case'iframe':case'object':trapBubbledEvent(TOP_LOAD,domElement);break;case'video':case'audio':// Create listener for each media event
for(var i=0;i<mediaEventTypes.length;i++){trapBubbledEvent(mediaEventTypes[i],domElement);}break;case'source':trapBubbledEvent(TOP_ERROR,domElement);break;case'img':case'image':case'link':trapBubbledEvent(TOP_ERROR,domElement);trapBubbledEvent(TOP_LOAD,domElement);break;case'form':trapBubbledEvent(TOP_RESET,domElement);trapBubbledEvent(TOP_SUBMIT,domElement);break;case'details':trapBubbledEvent(TOP_TOGGLE,domElement);break;case'input':initWrapperState(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':validateProps(domElement,rawProps);break;case'select':initWrapperState$1(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':initWrapperState$2(domElement,rawProps);trapBubbledEvent(TOP_INVALID,domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;}assertValidProps(tag,rawProps);{extraAttributeNames=new Set();var attributes=domElement.attributes;for(var _i=0;_i<attributes.length;_i++){var name=attributes[_i].name.toLowerCase();switch(name){// Built-in SSR attribute is whitelisted
case'data-reactroot':break;// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
case'value':break;case'checked':break;case'selected':break;default:// Intentionally use the original name.
// See discussion in https://github.com/facebook/react/pull/10676.
extraAttributeNames.add(attributes[_i].name);}}}var updatePayload=null;for(var propKey in rawProps){if(!rawProps.hasOwnProperty(propKey)){continue;}var nextProp=rawProps[propKey];if(propKey===CHILDREN){// For text content children we compare against textContent. This
// might match additional HTML that is hidden when we read it using
// textContent. E.g. "foo" will match "f<span>oo</span>" but that still
// satisfies our requirement. Our requirement is not to produce perfect
// HTML and attributes. Ideally we should preserve structure but it's
// ok not to if the visible content is still enough to indicate what
// even listeners these nodes might be wired up to.
// TODO: Warn if there is more than a single textNode as a child.
// TODO: Should we use domElement.firstChild.nodeValue to compare?
if(typeof nextProp==='string'){if(domElement.textContent!==nextProp){if(true&&!suppressHydrationWarning){warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,nextProp];}}else if(typeof nextProp==='number'){if(domElement.textContent!==''+nextProp){if(true&&!suppressHydrationWarning){warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,''+nextProp];}}}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else if(true&&// Convince Flow we've calculated it (it's DEV-only in this method.)
typeof isCustomComponentTag==='boolean'){// Validate that the properties correspond to their expected values.
var serverValue=void 0;var propertyInfo=getPropertyInfo(propKey);if(suppressHydrationWarning){// Don't bother comparing. We're ignoring all these warnings.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1||// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
propKey==='value'||propKey==='checked'||propKey==='selected'){// Noop
}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var serverHTML=domElement.innerHTML;var nextHtml=nextProp?nextProp[HTML]:undefined;var expectedHTML=normalizeHTML(domElement,nextHtml!=null?nextHtml:'');if(expectedHTML!==serverHTML){warnForPropDifference(propKey,serverHTML,expectedHTML);}}else if(propKey===STYLE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey);if(canDiffStyleForHydrationWarning){var expectedStyle=createDangerousStringForStyles(nextProp);serverValue=domElement.getAttribute('style');if(expectedStyle!==serverValue){warnForPropDifference(propKey,serverValue,expectedStyle);}}}else if(isCustomComponentTag){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey.toLowerCase());serverValue=getValueForAttribute(domElement,propKey,nextProp);if(nextProp!==serverValue){warnForPropDifference(propKey,serverValue,nextProp);}}else if(!shouldIgnoreAttribute(propKey,propertyInfo,isCustomComponentTag)&&!shouldRemoveAttribute(propKey,nextProp,propertyInfo,isCustomComponentTag)){var isMismatchDueToBadCasing=false;if(propertyInfo!==null){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propertyInfo.attributeName);serverValue=getValueForProperty(domElement,propKey,nextProp,propertyInfo);}else{var ownNamespace=parentNamespace;if(ownNamespace===HTML_NAMESPACE){ownNamespace=getIntrinsicNamespace(tag);}if(ownNamespace===HTML_NAMESPACE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey.toLowerCase());}else{var standardName=getPossibleStandardName(propKey);if(standardName!==null&&standardName!==propKey){// If an SVG prop is supplied with bad casing, it will
// be successfully parsed from HTML, but will produce a mismatch
// (and would be incorrectly rendered on the client).
// However, we already warn about bad casing elsewhere.
// So we'll skip the misleading extra mismatch warning in this case.
isMismatchDueToBadCasing=true;// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(standardName);}// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames.delete(propKey);}serverValue=getValueForAttribute(domElement,propKey,nextProp);}if(nextProp!==serverValue&&!isMismatchDueToBadCasing){warnForPropDifference(propKey,serverValue,nextProp);}}}}{// $FlowFixMe - Should be inferred as not undefined.
if(extraAttributeNames.size>0&&!suppressHydrationWarning){// $FlowFixMe - Should be inferred as not undefined.
warnForExtraAttributes(extraAttributeNames);}}switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper(domElement,rawProps,true);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper$3(domElement,rawProps);break;case'select':case'option':// For input and textarea we current always set the value property at
// post mount to force it to diverge from attributes. However, for
// option and select we don't quite do the same thing and select
// is not resilient to the DOM state changing so we don't do that here.
// TODO: Consider not doing this for input and textarea.
break;default:if(typeof rawProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}return updatePayload;}function diffHydratedText(textNode,text){var isDifferent=textNode.nodeValue!==text;return isDifferent;}function warnForUnmatchedText(textNode,text){{warnForTextDifference(textNode.nodeValue,text);}}function warnForDeletedHydratableElement(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warningWithoutStack$1(false,'Did not expect server HTML to contain a <%s> in <%s>.',child.nodeName.toLowerCase(),parentNode.nodeName.toLowerCase());}}function warnForDeletedHydratableText(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warningWithoutStack$1(false,'Did not expect server HTML to contain the text node "%s" in <%s>.',child.nodeValue,parentNode.nodeName.toLowerCase());}}function warnForInsertedHydratedElement(parentNode,tag,props){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warningWithoutStack$1(false,'Expected server HTML to contain a matching <%s> in <%s>.',tag,parentNode.nodeName.toLowerCase());}}function warnForInsertedHydratedText(parentNode,text){{if(text===''){// We expect to insert empty text nodes since they're not represented in
// the HTML.
// TODO: Remove this special case if we can just avoid inserting empty
// text nodes.
return;}if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warningWithoutStack$1(false,'Expected server HTML to contain a matching text node for "%s" in <%s>.',text,parentNode.nodeName.toLowerCase());}}function restoreControlledState$1(domElement,tag,props){switch(tag){case'input':restoreControlledState(domElement,props);return;case'textarea':restoreControlledState$3(domElement,props);return;case'select':restoreControlledState$2(domElement,props);return;}}// TODO: direct imports like some-package/src/* are bad. Fix me.
var validateDOMNesting=function(){};var updatedAncestorInfo=function(){};{// This validation code was written based on the HTML5 parsing spec:
// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
//
// Note: this does not catch all invalid nesting, nor does it try to (as it's
// not clear what practical benefit doing so provides); instead, we warn only
// for cases where the parser will give a parse tree differing from what React
// intended. For example, <b><div></div></b> is invalid but we don't warn
// because it still parses correctly; we do warn for other cases like nested
// <p> tags where the beginning of the second element implicitly closes the
// first, causing a confusing mess.
// https://html.spec.whatwg.org/multipage/syntax.html#special
var specialTags=['address','applet','area','article','aside','base','basefont','bgsound','blockquote','body','br','button','caption','center','col','colgroup','dd','details','dir','div','dl','dt','embed','fieldset','figcaption','figure','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','iframe','img','input','isindex','li','link','listing','main','marquee','menu','menuitem','meta','nav','noembed','noframes','noscript','object','ol','p','param','plaintext','pre','script','section','select','source','style','summary','table','tbody','td','template','textarea','tfoot','th','thead','title','tr','track','ul','wbr','xmp'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
var inScopeTags=['applet','caption','html','table','td','th','marquee','object','template',// https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
// TODO: Distinguish by namespace here -- for <title>, including it here
// errs on the side of fewer warnings
'foreignObject','desc','title'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
var buttonScopeTags=inScopeTags.concat(['button']);// https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
var impliedEndTags=['dd','dt','li','option','optgroup','p','rp','rt'];var emptyAncestorInfo={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};updatedAncestorInfo=function(oldInfo,tag){var ancestorInfo=_assign({},oldInfo||emptyAncestorInfo);var info={tag:tag};if(inScopeTags.indexOf(tag)!==-1){ancestorInfo.aTagInScope=null;ancestorInfo.buttonTagInScope=null;ancestorInfo.nobrTagInScope=null;}if(buttonScopeTags.indexOf(tag)!==-1){ancestorInfo.pTagInButtonScope=null;}// See rules for 'li', 'dd', 'dt' start tags in
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
if(specialTags.indexOf(tag)!==-1&&tag!=='address'&&tag!=='div'&&tag!=='p'){ancestorInfo.listItemTagAutoclosing=null;ancestorInfo.dlItemTagAutoclosing=null;}ancestorInfo.current=info;if(tag==='form'){ancestorInfo.formTag=info;}if(tag==='a'){ancestorInfo.aTagInScope=info;}if(tag==='button'){ancestorInfo.buttonTagInScope=info;}if(tag==='nobr'){ancestorInfo.nobrTagInScope=info;}if(tag==='p'){ancestorInfo.pTagInButtonScope=info;}if(tag==='li'){ancestorInfo.listItemTagAutoclosing=info;}if(tag==='dd'||tag==='dt'){ancestorInfo.dlItemTagAutoclosing=info;}return ancestorInfo;};/**
   * Returns whether
   */var isTagValidWithParent=function(tag,parentTag){// First, let's check if we're in an unusual parsing mode...
switch(parentTag){// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
case'select':return tag==='option'||tag==='optgroup'||tag==='#text';case'optgroup':return tag==='option'||tag==='#text';// Strictly speaking, seeing an <option> doesn't mean we're in a <select>
// but
case'option':return tag==='#text';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
// No special behavior since these rules fall back to "in body" mode for
// all except special table nodes which cause bad parsing behavior anyway.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
case'tr':return tag==='th'||tag==='td'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
case'tbody':case'thead':case'tfoot':return tag==='tr'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
case'colgroup':return tag==='col'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
case'table':return tag==='caption'||tag==='colgroup'||tag==='tbody'||tag==='tfoot'||tag==='thead'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
case'head':return tag==='base'||tag==='basefont'||tag==='bgsound'||tag==='link'||tag==='meta'||tag==='title'||tag==='noscript'||tag==='noframes'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
case'html':return tag==='head'||tag==='body';case'#document':return tag==='html';}// Probably in the "in body" parsing mode, so we outlaw only tag combos
// where the parsing rules cause implicit opens or closes to be added.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
switch(tag){case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return parentTag!=='h1'&&parentTag!=='h2'&&parentTag!=='h3'&&parentTag!=='h4'&&parentTag!=='h5'&&parentTag!=='h6';case'rp':case'rt':return impliedEndTags.indexOf(parentTag)===-1;case'body':case'caption':case'col':case'colgroup':case'frame':case'head':case'html':case'tbody':case'td':case'tfoot':case'th':case'thead':case'tr':// These tags are only valid with a few parents that have special child
// parsing rules -- if we're down here, then none of those matched and
// so we allow it only if we don't know what the parent is, as all other
// cases are invalid.
return parentTag==null;}return true;};/**
   * Returns whether
   */var findInvalidAncestorForTag=function(tag,ancestorInfo){switch(tag){case'address':case'article':case'aside':case'blockquote':case'center':case'details':case'dialog':case'dir':case'div':case'dl':case'fieldset':case'figcaption':case'figure':case'footer':case'header':case'hgroup':case'main':case'menu':case'nav':case'ol':case'p':case'section':case'summary':case'ul':case'pre':case'listing':case'table':case'hr':case'xmp':case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return ancestorInfo.pTagInButtonScope;case'form':return ancestorInfo.formTag||ancestorInfo.pTagInButtonScope;case'li':return ancestorInfo.listItemTagAutoclosing;case'dd':case'dt':return ancestorInfo.dlItemTagAutoclosing;case'button':return ancestorInfo.buttonTagInScope;case'a':// Spec says something about storing a list of markers, but it sounds
// equivalent to this check.
return ancestorInfo.aTagInScope;case'nobr':return ancestorInfo.nobrTagInScope;}return null;};var didWarn={};validateDOMNesting=function(childTag,childText,ancestorInfo){ancestorInfo=ancestorInfo||emptyAncestorInfo;var parentInfo=ancestorInfo.current;var parentTag=parentInfo&&parentInfo.tag;if(childText!=null){!(childTag==null)?warningWithoutStack$1(false,'validateDOMNesting: when childText is passed, childTag should be null'):void 0;childTag='#text';}var invalidParent=isTagValidWithParent(childTag,parentTag)?null:parentInfo;var invalidAncestor=invalidParent?null:findInvalidAncestorForTag(childTag,ancestorInfo);var invalidParentOrAncestor=invalidParent||invalidAncestor;if(!invalidParentOrAncestor){return;}var ancestorTag=invalidParentOrAncestor.tag;var addendum=getCurrentFiberStackInDev();var warnKey=!!invalidParent+'|'+childTag+'|'+ancestorTag+'|'+addendum;if(didWarn[warnKey]){return;}didWarn[warnKey]=true;var tagDisplayName=childTag;var whitespaceInfo='';if(childTag==='#text'){if(/\S/.test(childText)){tagDisplayName='Text nodes';}else{tagDisplayName='Whitespace text nodes';whitespaceInfo=" Make sure you don't have any extra whitespace between tags on "+'each line of your source code.';}}else{tagDisplayName='<'+childTag+'>';}if(invalidParent){var info='';if(ancestorTag==='table'&&childTag==='tr'){info+=' Add a <tbody> to your code to match the DOM tree generated by '+'the browser.';}warningWithoutStack$1(false,'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s',tagDisplayName,ancestorTag,whitespaceInfo,info,addendum);}else{warningWithoutStack$1(false,'validateDOMNesting(...): %s cannot appear as a descendant of '+'<%s>.%s',tagDisplayName,ancestorTag,addendum);}};}// Renderers that don't support persistence
// can re-export everything from this module.
function shim(){invariant(false,'The current renderer does not support persistence. This error is likely caused by a bug in React. Please file an issue.');}// Persistence (when unsupported)
var supportsPersistence=false;var cloneInstance=shim;var createContainerChildSet=shim;var appendChildToContainerChildSet=shim;var finalizeContainerChildren=shim;var replaceContainerChildren=shim;var SUPPRESS_HYDRATION_WARNING=void 0;{SUPPRESS_HYDRATION_WARNING='suppressHydrationWarning';}var eventsEnabled=null;var selectionInformation=null;function shouldAutoFocusHostComponent(type,props){switch(type){case'button':case'input':case'select':case'textarea':return!!props.autoFocus;}return false;}function getRootHostContext(rootContainerInstance){var type=void 0;var namespace=void 0;var nodeType=rootContainerInstance.nodeType;switch(nodeType){case DOCUMENT_NODE:case DOCUMENT_FRAGMENT_NODE:{type=nodeType===DOCUMENT_NODE?'#document':'#fragment';var root=rootContainerInstance.documentElement;namespace=root?root.namespaceURI:getChildNamespace(null,'');break;}default:{var container=nodeType===COMMENT_NODE?rootContainerInstance.parentNode:rootContainerInstance;var ownNamespace=container.namespaceURI||null;type=container.tagName;namespace=getChildNamespace(ownNamespace,type);break;}}{var validatedTag=type.toLowerCase();var _ancestorInfo=updatedAncestorInfo(null,validatedTag);return{namespace:namespace,ancestorInfo:_ancestorInfo};}return namespace;}function getChildHostContext(parentHostContext,type,rootContainerInstance){{var parentHostContextDev=parentHostContext;var _namespace=getChildNamespace(parentHostContextDev.namespace,type);var _ancestorInfo2=updatedAncestorInfo(parentHostContextDev.ancestorInfo,type);return{namespace:_namespace,ancestorInfo:_ancestorInfo2};}var parentNamespace=parentHostContext;return getChildNamespace(parentNamespace,type);}function getPublicInstance(instance){return instance;}function prepareForCommit(containerInfo){eventsEnabled=isEnabled();selectionInformation=getSelectionInformation();setEnabled(false);}function resetAfterCommit(containerInfo){restoreSelection(selectionInformation);selectionInformation=null;setEnabled(eventsEnabled);eventsEnabled=null;}function createInstance(type,props,rootContainerInstance,hostContext,internalInstanceHandle){var parentNamespace=void 0;{// TODO: take namespace into account when validating.
var hostContextDev=hostContext;validateDOMNesting(type,null,hostContextDev.ancestorInfo);if(typeof props.children==='string'||typeof props.children==='number'){var string=''+props.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type);validateDOMNesting(null,string,ownAncestorInfo);}parentNamespace=hostContextDev.namespace;}var domElement=createElement(type,props,rootContainerInstance,parentNamespace);precacheFiberNode(internalInstanceHandle,domElement);updateFiberProps(domElement,props);return domElement;}function appendInitialChild(parentInstance,child){parentInstance.appendChild(child);}function finalizeInitialChildren(domElement,type,props,rootContainerInstance,hostContext){setInitialProperties(domElement,type,props,rootContainerInstance);return shouldAutoFocusHostComponent(type,props);}function prepareUpdate(domElement,type,oldProps,newProps,rootContainerInstance,hostContext){{var hostContextDev=hostContext;if(typeof newProps.children!==typeof oldProps.children&&(typeof newProps.children==='string'||typeof newProps.children==='number')){var string=''+newProps.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type);validateDOMNesting(null,string,ownAncestorInfo);}}return diffProperties(domElement,type,oldProps,newProps,rootContainerInstance);}function shouldSetTextContent(type,props){return type==='textarea'||type==='option'||type==='noscript'||typeof props.children==='string'||typeof props.children==='number'||typeof props.dangerouslySetInnerHTML==='object'&&props.dangerouslySetInnerHTML!==null&&props.dangerouslySetInnerHTML.__html!=null;}function shouldDeprioritizeSubtree(type,props){return!!props.hidden;}function createTextInstance(text,rootContainerInstance,hostContext,internalInstanceHandle){{var hostContextDev=hostContext;validateDOMNesting(null,text,hostContextDev.ancestorInfo);}var textNode=createTextNode(text,rootContainerInstance);precacheFiberNode(internalInstanceHandle,textNode);return textNode;}var isPrimaryRenderer=true;var scheduleTimeout=setTimeout;var cancelTimeout=clearTimeout;var noTimeout=-1;// -------------------
//     Mutation
// -------------------
var supportsMutation=true;function commitMount(domElement,type,newProps,internalInstanceHandle){// Despite the naming that might imply otherwise, this method only
// fires if there is an `Update` effect scheduled during mounting.
// This happens if `finalizeInitialChildren` returns `true` (which it
// does to implement the `autoFocus` attribute on the client). But
// there are also other cases when this might happen (such as patching
// up text content during hydration mismatch). So we'll check this again.
if(shouldAutoFocusHostComponent(type,newProps)){domElement.focus();}}function commitUpdate(domElement,updatePayload,type,oldProps,newProps,internalInstanceHandle){// Update the props handle so that we know which props are the ones with
// with current event handlers.
updateFiberProps(domElement,newProps);// Apply the diff to the DOM node.
updateProperties(domElement,updatePayload,type,oldProps,newProps);}function resetTextContent(domElement){setTextContent(domElement,'');}function commitTextUpdate(textInstance,oldText,newText){textInstance.nodeValue=newText;}function appendChild(parentInstance,child){parentInstance.appendChild(child);}function appendChildToContainer(container,child){var parentNode=void 0;if(container.nodeType===COMMENT_NODE){parentNode=container.parentNode;parentNode.insertBefore(child,container);}else{parentNode=container;parentNode.appendChild(child);}// This container might be used for a portal.
// If something inside a portal is clicked, that click should bubble
// through the React tree. However, on Mobile Safari the click would
// never bubble through the *DOM* tree unless an ancestor with onclick
// event exists. So we wouldn't see it and dispatch it.
// This is why we ensure that containers have inline onclick defined.
// https://github.com/facebook/react/issues/11918
if(parentNode.onclick===null){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(parentNode);}}function insertBefore(parentInstance,child,beforeChild){parentInstance.insertBefore(child,beforeChild);}function insertInContainerBefore(container,child,beforeChild){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,beforeChild);}else{container.insertBefore(child,beforeChild);}}function removeChild(parentInstance,child){parentInstance.removeChild(child);}function removeChildFromContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.removeChild(child);}else{container.removeChild(child);}}// -------------------
//     Hydration
// -------------------
var supportsHydration=true;function canHydrateInstance(instance,type,props){if(instance.nodeType!==ELEMENT_NODE||type.toLowerCase()!==instance.nodeName.toLowerCase()){return null;}// This has now been refined to an element node.
return instance;}function canHydrateTextInstance(instance,text){if(text===''||instance.nodeType!==TEXT_NODE){// Empty strings are not parsed by HTML so there won't be a correct match here.
return null;}// This has now been refined to a text node.
return instance;}function getNextHydratableSibling(instance){var node=instance.nextSibling;// Skip non-hydratable nodes.
while(node&&node.nodeType!==ELEMENT_NODE&&node.nodeType!==TEXT_NODE){node=node.nextSibling;}return node;}function getFirstHydratableChild(parentInstance){var next=parentInstance.firstChild;// Skip non-hydratable nodes.
while(next&&next.nodeType!==ELEMENT_NODE&&next.nodeType!==TEXT_NODE){next=next.nextSibling;}return next;}function hydrateInstance(instance,type,props,rootContainerInstance,hostContext,internalInstanceHandle){precacheFiberNode(internalInstanceHandle,instance);// TODO: Possibly defer this until the commit phase where all the events
// get attached.
updateFiberProps(instance,props);var parentNamespace=void 0;{var hostContextDev=hostContext;parentNamespace=hostContextDev.namespace;}return diffHydratedProperties(instance,type,props,parentNamespace,rootContainerInstance);}function hydrateTextInstance(textInstance,text,internalInstanceHandle){precacheFiberNode(internalInstanceHandle,textInstance);return diffHydratedText(textInstance,text);}function didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,text){{warnForUnmatchedText(textInstance,text);}}function didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,text){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForUnmatchedText(textInstance,text);}}function didNotHydrateContainerInstance(parentContainer,instance){{if(instance.nodeType===ELEMENT_NODE){warnForDeletedHydratableElement(parentContainer,instance);}else{warnForDeletedHydratableText(parentContainer,instance);}}}function didNotHydrateInstance(parentType,parentProps,parentInstance,instance){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){if(instance.nodeType===ELEMENT_NODE){warnForDeletedHydratableElement(parentInstance,instance);}else{warnForDeletedHydratableText(parentInstance,instance);}}}function didNotFindHydratableContainerInstance(parentContainer,type,props){{warnForInsertedHydratedElement(parentContainer,type,props);}}function didNotFindHydratableContainerTextInstance(parentContainer,text){{warnForInsertedHydratedText(parentContainer,text);}}function didNotFindHydratableInstance(parentType,parentProps,parentInstance,type,props){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForInsertedHydratedElement(parentInstance,type,props);}}function didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,text){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForInsertedHydratedText(parentInstance,text);}}// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji='\u269B';var warningEmoji='\u26D4';var supportsUserTiming=typeof performance!=='undefined'&&typeof performance.mark==='function'&&typeof performance.clearMarks==='function'&&typeof performance.measure==='function'&&typeof performance.clearMeasures==='function';// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber=null;// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase=null;var currentPhaseFiber=null;// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting=false;var hasScheduledUpdateInCurrentCommit=false;var hasScheduledUpdateInCurrentPhase=false;var commitCountInCurrentWorkLoop=0;var effectCountInCurrentCommit=0;var isWaitingForCallback=false;// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit=new Set();var formatMarkName=function(markName){return reactEmoji+' '+markName;};var formatLabel=function(label,warning){var prefix=warning?warningEmoji+' ':reactEmoji+' ';var suffix=warning?' Warning: '+warning:'';return''+prefix+label+suffix;};var beginMark=function(markName){performance.mark(formatMarkName(markName));};var clearMark=function(markName){performance.clearMarks(formatMarkName(markName));};var endMark=function(label,markName,warning){var formattedMarkName=formatMarkName(markName);var formattedLabel=formatLabel(label,warning);try{performance.measure(formattedLabel,formattedMarkName);}catch(err){}// If previous mark was missing for some reason, this will throw.
// This could only happen if React crashed in an unexpected place earlier.
// Don't pile on with more errors.
// Clear marks immediately to avoid growing buffer.
performance.clearMarks(formattedMarkName);performance.clearMeasures(formattedLabel);};var getFiberMarkName=function(label,debugID){return label+' (#'+debugID+')';};var getFiberLabel=function(componentName,isMounted,phase){if(phase===null){// These are composite component total time measurements.
return componentName+' ['+(isMounted?'update':'mount')+']';}else{// Composite component methods.
return componentName+'.'+phase;}};var beginFiberMark=function(fiber,phase){var componentName=getComponentName(fiber.type)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);if(isCommitting&&labelsInCurrentCommit.has(label)){// During the commit phase, we don't show duplicate labels because
// there is a fixed overhead for every measurement, and we don't
// want to stretch the commit phase beyond necessary.
return false;}labelsInCurrentCommit.add(label);var markName=getFiberMarkName(label,debugID);beginMark(markName);return true;};var clearFiberMark=function(fiber,phase){var componentName=getComponentName(fiber.type)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);clearMark(markName);};var endFiberMark=function(fiber,phase,warning){var componentName=getComponentName(fiber.type)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);endMark(label,markName,warning);};var shouldIgnoreFiber=function(fiber){// Host components should be skipped in the timeline.
// We could check typeof fiber.type, but does this work with RN?
switch(fiber.tag){case HostRoot:case HostComponent:case HostText:case HostPortal:case Fragment:case ContextProvider:case ContextConsumer:case Mode:return true;default:return false;}};var clearPendingPhaseMeasurement=function(){if(currentPhase!==null&&currentPhaseFiber!==null){clearFiberMark(currentPhaseFiber,currentPhase);}currentPhaseFiber=null;currentPhase=null;hasScheduledUpdateInCurrentPhase=false;};var pauseTimers=function(){// Stops all currently active measurements so that they can be resumed
// if we continue in a later deferred loop from the same unit of work.
var fiber=currentFiber;while(fiber){if(fiber._debugIsCurrentlyTiming){endFiberMark(fiber,null,null);}fiber=fiber.return;}};var resumeTimersRecursively=function(fiber){if(fiber.return!==null){resumeTimersRecursively(fiber.return);}if(fiber._debugIsCurrentlyTiming){beginFiberMark(fiber,null);}};var resumeTimers=function(){// Resumes all measurements that were active during the last deferred loop.
if(currentFiber!==null){resumeTimersRecursively(currentFiber);}};function recordEffect(){if(enableUserTimingAPI){effectCountInCurrentCommit++;}}function recordScheduleUpdate(){if(enableUserTimingAPI){if(isCommitting){hasScheduledUpdateInCurrentCommit=true;}if(currentPhase!==null&&currentPhase!=='componentWillMount'&&currentPhase!=='componentWillReceiveProps'){hasScheduledUpdateInCurrentPhase=true;}}}function startRequestCallbackTimer(){if(enableUserTimingAPI){if(supportsUserTiming&&!isWaitingForCallback){isWaitingForCallback=true;beginMark('(Waiting for async callback...)');}}}function stopRequestCallbackTimer(didExpire,expirationTime){if(enableUserTimingAPI){if(supportsUserTiming){isWaitingForCallback=false;var warning=didExpire?'React was blocked by main thread':null;endMark('(Waiting for async callback... will force flush in '+expirationTime+' ms)','(Waiting for async callback...)',warning);}}}function startWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, this is the fiber to unwind from.
currentFiber=fiber;if(!beginFiberMark(fiber,null)){return;}fiber._debugIsCurrentlyTiming=true;}}function cancelWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// Remember we shouldn't complete measurement for this fiber.
// Otherwise flamechart will be deep even for small updates.
fiber._debugIsCurrentlyTiming=false;clearFiberMark(fiber,null);}}function stopWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber.return;if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;endFiberMark(fiber,null,null);}}function stopFailedWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber.return;if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;var warning='An error was thrown inside this error boundary';endFiberMark(fiber,null,warning);}}function startPhaseTimer(fiber,phase){if(enableUserTimingAPI){if(!supportsUserTiming){return;}clearPendingPhaseMeasurement();if(!beginFiberMark(fiber,phase)){return;}currentPhaseFiber=fiber;currentPhase=phase;}}function stopPhaseTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}if(currentPhase!==null&&currentPhaseFiber!==null){var warning=hasScheduledUpdateInCurrentPhase?'Scheduled a cascading update':null;endFiberMark(currentPhaseFiber,currentPhase,warning);}currentPhase=null;currentPhaseFiber=null;}}function startWorkLoopTimer(nextUnitOfWork){if(enableUserTimingAPI){currentFiber=nextUnitOfWork;if(!supportsUserTiming){return;}commitCountInCurrentWorkLoop=0;// This is top level call.
// Any other measurements are performed within.
beginMark('(React Tree Reconciliation)');// Resume any measurements that were in progress during the last loop.
resumeTimers();}}function stopWorkLoopTimer(interruptedBy,didCompleteRoot){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var warning=null;if(interruptedBy!==null){if(interruptedBy.tag===HostRoot){warning='A top-level update interrupted the previous render';}else{var componentName=getComponentName(interruptedBy.type)||'Unknown';warning='An update to '+componentName+' interrupted the previous render';}}else if(commitCountInCurrentWorkLoop>1){warning='There were cascading updates';}commitCountInCurrentWorkLoop=0;var label=didCompleteRoot?'(React Tree Reconciliation: Completed Root)':'(React Tree Reconciliation: Yielded)';// Pause any measurements until the next loop.
pauseTimers();endMark(label,'(React Tree Reconciliation)',warning);}}function startCommitTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}isCommitting=true;hasScheduledUpdateInCurrentCommit=false;labelsInCurrentCommit.clear();beginMark('(Committing Changes)');}}function stopCommitTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var warning=null;if(hasScheduledUpdateInCurrentCommit){warning='Lifecycle hook scheduled a cascading update';}else if(commitCountInCurrentWorkLoop>0){warning='Caused by a cascading update in earlier commit';}hasScheduledUpdateInCurrentCommit=false;commitCountInCurrentWorkLoop++;isCommitting=false;labelsInCurrentCommit.clear();endMark('(Committing Changes)','(Committing Changes)',warning);}}function startCommitSnapshotEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Committing Snapshot Effects)');}}function stopCommitSnapshotEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Committing Snapshot Effects: '+count+' Total)','(Committing Snapshot Effects)',null);}}function startCommitHostEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Committing Host Effects)');}}function stopCommitHostEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Committing Host Effects: '+count+' Total)','(Committing Host Effects)',null);}}function startCommitLifeCyclesTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Calling Lifecycle Methods)');}}function stopCommitLifeCyclesTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Calling Lifecycle Methods: '+count+' Total)','(Calling Lifecycle Methods)',null);}}var valueStack=[];var fiberStack=void 0;{fiberStack=[];}var index=-1;function createCursor(defaultValue){return{current:defaultValue};}function pop(cursor,fiber){if(index<0){{warningWithoutStack$1(false,'Unexpected pop.');}return;}{if(fiber!==fiberStack[index]){warningWithoutStack$1(false,'Unexpected Fiber popped.');}}cursor.current=valueStack[index];valueStack[index]=null;{fiberStack[index]=null;}index--;}function push(cursor,value,fiber){index++;valueStack[index]=cursor.current;{fiberStack[index]=fiber;}cursor.current=value;}function checkThatStackIsEmpty(){{if(index!==-1){warningWithoutStack$1(false,'Expected an empty stack. Something was not reset properly.');}}}function resetStackAfterFatalErrorInDev(){{index=-1;valueStack.length=0;fiberStack.length=0;}}var warnedAboutMissingGetChildContext=void 0;{warnedAboutMissingGetChildContext={};}var emptyContextObject={};{Object.freeze(emptyContextObject);}// A cursor to the current merged context object on the stack.
var contextStackCursor=createCursor(emptyContextObject);// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor=createCursor(false);// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext=emptyContextObject;function getUnmaskedContext(workInProgress,Component,didPushOwnContextIfProvider){if(didPushOwnContextIfProvider&&isContextProvider(Component)){// If the fiber is a context provider itself, when we read its context
// we may have already pushed its own child context on the stack. A context
// provider should not "see" its own child context. Therefore we read the
// previous (parent) context instead for a context provider.
return previousContext;}return contextStackCursor.current;}function cacheContext(workInProgress,unmaskedContext,maskedContext){var instance=workInProgress.stateNode;instance.__reactInternalMemoizedUnmaskedChildContext=unmaskedContext;instance.__reactInternalMemoizedMaskedChildContext=maskedContext;}function getMaskedContext(workInProgress,unmaskedContext){var type=workInProgress.type;var contextTypes=type.contextTypes;if(!contextTypes){return emptyContextObject;}// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var instance=workInProgress.stateNode;if(instance&&instance.__reactInternalMemoizedUnmaskedChildContext===unmaskedContext){return instance.__reactInternalMemoizedMaskedChildContext;}var context={};for(var key in contextTypes){context[key]=unmaskedContext[key];}{var name=getComponentName(type)||'Unknown';checkPropTypes(contextTypes,context,'context',name,getCurrentFiberStackInDev);}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// Context is created before the class component is instantiated so check for instance.
if(instance){cacheContext(workInProgress,unmaskedContext,context);}return context;}function hasContextChanged(){return didPerformWorkStackCursor.current;}function isContextProvider(type){var childContextTypes=type.childContextTypes;return childContextTypes!==null&&childContextTypes!==undefined;}function popContext(fiber){pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}function popTopLevelContextObject(fiber){pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}function pushTopLevelContextObject(fiber,context,didChange){!(contextStackCursor.current===emptyContextObject)?invariant(false,'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.'):void 0;push(contextStackCursor,context,fiber);push(didPerformWorkStackCursor,didChange,fiber);}function processChildContext(fiber,type,parentContext){var instance=fiber.stateNode;var childContextTypes=type.childContextTypes;// TODO (bvaughn) Replace this behavior with an invariant() in the future.
// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if(typeof instance.getChildContext!=='function'){{var componentName=getComponentName(type)||'Unknown';if(!warnedAboutMissingGetChildContext[componentName]){warnedAboutMissingGetChildContext[componentName]=true;warningWithoutStack$1(false,'%s.childContextTypes is specified but there is no getChildContext() method '+'on the instance. You can either define getChildContext() on %s or remove '+'childContextTypes from it.',componentName,componentName);}}return parentContext;}var childContext=void 0;{setCurrentPhase('getChildContext');}startPhaseTimer(fiber,'getChildContext');childContext=instance.getChildContext();stopPhaseTimer();{setCurrentPhase(null);}for(var contextKey in childContext){!(contextKey in childContextTypes)?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',getComponentName(type)||'Unknown',contextKey):void 0;}{var name=getComponentName(type)||'Unknown';checkPropTypes(childContextTypes,childContext,'child context',name,// In practice, there is one case in which we won't get a stack. It's when
// somebody calls unstable_renderSubtreeIntoContainer() and we process
// context from the parent component instance. The stack will be missing
// because it's outside of the reconciliation, and so the pointer has not
// been set. This is rare and doesn't matter. We'll also remove that API.
getCurrentFiberStackInDev);}return _assign({},parentContext,childContext);}function pushContextProvider(workInProgress){var instance=workInProgress.stateNode;// We push the context as early as possible to ensure stack integrity.
// If the instance does not exist yet, we will push null at first,
// and replace it on the stack later when invalidating the context.
var memoizedMergedChildContext=instance&&instance.__reactInternalMemoizedMergedChildContext||emptyContextObject;// Remember the parent context so we can merge with it later.
// Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
previousContext=contextStackCursor.current;push(contextStackCursor,memoizedMergedChildContext,workInProgress);push(didPerformWorkStackCursor,didPerformWorkStackCursor.current,workInProgress);return true;}function invalidateContextProvider(workInProgress,type,didChange){var instance=workInProgress.stateNode;!instance?invariant(false,'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(didChange){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var mergedContext=processChildContext(workInProgress,type,previousContext);instance.__reactInternalMemoizedMergedChildContext=mergedContext;// Replace the old (or empty) context with the new one.
// It is important to unwind the context in the reverse order.
pop(didPerformWorkStackCursor,workInProgress);pop(contextStackCursor,workInProgress);// Now push the new context and mark that it has changed.
push(contextStackCursor,mergedContext,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}else{pop(didPerformWorkStackCursor,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}}function findCurrentUnmaskedContext(fiber){// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
!(isFiberMounted(fiber)&&(fiber.tag===ClassComponent||fiber.tag===ClassComponentLazy))?invariant(false,'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.'):void 0;var node=fiber;do{switch(node.tag){case HostRoot:return node.stateNode.context;case ClassComponent:{var Component=node.type;if(isContextProvider(Component)){return node.stateNode.__reactInternalMemoizedMergedChildContext;}break;}case ClassComponentLazy:{var _Component=getResultFromResolvedThenable(node.type);if(isContextProvider(_Component)){return node.stateNode.__reactInternalMemoizedMergedChildContext;}break;}}node=node.return;}while(node!==null);invariant(false,'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.');}var onCommitFiberRoot=null;var onCommitFiberUnmount=null;var hasLoggedError=false;function catchErrors(fn){return function(arg){try{return fn(arg);}catch(err){if(true&&!hasLoggedError){hasLoggedError=true;warningWithoutStack$1(false,'React DevTools encountered an error: %s',err);}}};}var isDevToolsPresent=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined';function injectInternals(internals){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__==='undefined'){// No DevTools
return false;}var hook=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(hook.isDisabled){// This isn't a real property on the hook, but it can be set to opt out
// of DevTools integration and associated warnings and logs.
// https://github.com/facebook/react/issues/3877
return true;}if(!hook.supportsFiber){{warningWithoutStack$1(false,'The installed version of React DevTools is too old and will not work '+'with the current version of React. Please update React DevTools. '+'https://fb.me/react-devtools');}// DevTools exists, even though it doesn't support Fiber.
return true;}try{var rendererID=hook.inject(internals);// We have successfully injected, so now it is safe to set up hooks.
onCommitFiberRoot=catchErrors(function(root){return hook.onCommitFiberRoot(rendererID,root);});onCommitFiberUnmount=catchErrors(function(fiber){return hook.onCommitFiberUnmount(rendererID,fiber);});}catch(err){// Catch all errors because it is unsafe to throw during initialization.
{warningWithoutStack$1(false,'React DevTools encountered an error: %s.',err);}}// DevTools exists
return true;}function onCommitRoot(root){if(typeof onCommitFiberRoot==='function'){onCommitFiberRoot(root);}}function onCommitUnmount(fiber){if(typeof onCommitFiberUnmount==='function'){onCommitFiberUnmount(fiber);}}// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt=1073741823;var NoWork=0;var Sync=1;var Never=maxSigned31BitInt;var UNIT_SIZE=10;var MAGIC_NUMBER_OFFSET=2;// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms){// Always add an offset so that we don't clash with the magic number for NoWork.
return(ms/UNIT_SIZE|0)+MAGIC_NUMBER_OFFSET;}function expirationTimeToMs(expirationTime){return(expirationTime-MAGIC_NUMBER_OFFSET)*UNIT_SIZE;}function ceiling(num,precision){return((num/precision|0)+1)*precision;}function computeExpirationBucket(currentTime,expirationInMs,bucketSizeMs){return MAGIC_NUMBER_OFFSET+ceiling(currentTime-MAGIC_NUMBER_OFFSET+expirationInMs/UNIT_SIZE,bucketSizeMs/UNIT_SIZE);}var LOW_PRIORITY_EXPIRATION=5000;var LOW_PRIORITY_BATCH_SIZE=250;function computeAsyncExpiration(currentTime){return computeExpirationBucket(currentTime,LOW_PRIORITY_EXPIRATION,LOW_PRIORITY_BATCH_SIZE);}// We intentionally set a higher expiration time for interactive updates in
// dev than in production.
//
// If the main thread is being blocked so long that you hit the expiration,
// it's a problem that could be solved with better scheduling.
//
// People will be more likely to notice this and fix it with the long
// expiration time in development.
//
// In production we opt for better UX at the risk of masking scheduling
// problems, by expiring fast.
var HIGH_PRIORITY_EXPIRATION=500;var HIGH_PRIORITY_BATCH_SIZE=100;function computeInteractiveExpiration(currentTime){return computeExpirationBucket(currentTime,HIGH_PRIORITY_EXPIRATION,HIGH_PRIORITY_BATCH_SIZE);}var NoContext=0;var AsyncMode=1;var StrictMode=2;var ProfileMode=4;var hasBadMapPolyfill=void 0;{hasBadMapPolyfill=false;try{var nonExtensibleObject=Object.preventExtensions({});var testMap=new Map([[nonExtensibleObject,null]]);var testSet=new Set([nonExtensibleObject]);// This is necessary for Rollup to not consider these unused.
// https://github.com/rollup/rollup/issues/1771
// TODO: we can remove these if Rollup fixes the bug.
testMap.set(0,0);testSet.add(0);}catch(e){// TODO: Consider warning about bad polyfills
hasBadMapPolyfill=true;}}// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
var debugCounter=void 0;{debugCounter=1;}function FiberNode(tag,pendingProps,key,mode){// Instance
this.tag=tag;this.key=key;this.type=null;this.stateNode=null;// Fiber
this.return=null;this.child=null;this.sibling=null;this.index=0;this.ref=null;this.pendingProps=pendingProps;this.memoizedProps=null;this.updateQueue=null;this.memoizedState=null;this.firstContextDependency=null;this.mode=mode;// Effects
this.effectTag=NoEffect;this.nextEffect=null;this.firstEffect=null;this.lastEffect=null;this.expirationTime=NoWork;this.childExpirationTime=NoWork;this.alternate=null;if(enableProfilerTimer){this.actualDuration=0;this.actualStartTime=-1;this.selfBaseDuration=0;this.treeBaseDuration=0;}{this._debugID=debugCounter++;this._debugSource=null;this._debugOwner=null;this._debugIsCurrentlyTiming=false;if(!hasBadMapPolyfill&&typeof Object.preventExtensions==='function'){Object.preventExtensions(this);}}}// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber=function(tag,pendingProps,key,mode){// $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
return new FiberNode(tag,pendingProps,key,mode);};function shouldConstruct(Component){var prototype=Component.prototype;return!!(prototype&&prototype.isReactComponent);}function resolveLazyComponentTag(fiber,Component){if(typeof Component==='function'){return shouldConstruct(Component)?ClassComponentLazy:FunctionalComponentLazy;}else if(Component!==undefined&&Component!==null&&Component.$$typeof){return ForwardRefLazy;}return IndeterminateComponent;}// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current,pendingProps,expirationTime){var workInProgress=current.alternate;if(workInProgress===null){// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
workInProgress=createFiber(current.tag,pendingProps,current.key,current.mode);workInProgress.type=current.type;workInProgress.stateNode=current.stateNode;{// DEV-only fields
workInProgress._debugID=current._debugID;workInProgress._debugSource=current._debugSource;workInProgress._debugOwner=current._debugOwner;}workInProgress.alternate=current;current.alternate=workInProgress;}else{workInProgress.pendingProps=pendingProps;// We already have an alternate.
// Reset the effect tag.
workInProgress.effectTag=NoEffect;// The effect list is no longer valid.
workInProgress.nextEffect=null;workInProgress.firstEffect=null;workInProgress.lastEffect=null;if(enableProfilerTimer){// We intentionally reset, rather than copy, actualDuration & actualStartTime.
// This prevents time from endlessly accumulating in new commits.
// This has the downside of resetting values for different priority renders,
// But works for yielding (the common case) and should support resuming.
workInProgress.actualDuration=0;workInProgress.actualStartTime=-1;}}// Don't touching the subtree's expiration time, which has not changed.
workInProgress.childExpirationTime=current.childExpirationTime;if(pendingProps!==current.pendingProps){// This fiber has new props.
workInProgress.expirationTime=expirationTime;}else{// This fiber's props have not changed.
workInProgress.expirationTime=current.expirationTime;}workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;workInProgress.firstContextDependency=current.firstContextDependency;// These will be overridden during the parent's reconciliation
workInProgress.sibling=current.sibling;workInProgress.index=current.index;workInProgress.ref=current.ref;if(enableProfilerTimer){workInProgress.selfBaseDuration=current.selfBaseDuration;workInProgress.treeBaseDuration=current.treeBaseDuration;}return workInProgress;}function createHostRootFiber(isAsync){var mode=isAsync?AsyncMode|StrictMode:NoContext;if(enableProfilerTimer&&isDevToolsPresent){// Always collect profile timings when DevTools are present.
// This enables DevTools to start capturing timing at any point–
// Without some nodes in the tree having empty base times.
mode|=ProfileMode;}return createFiber(HostRoot,null,null,mode);}function createFiberFromElement(element,mode,expirationTime){var owner=null;{owner=element._owner;}var fiber=void 0;var type=element.type;var key=element.key;var pendingProps=element.props;var fiberTag=void 0;if(typeof type==='function'){fiberTag=shouldConstruct(type)?ClassComponent:IndeterminateComponent;}else if(typeof type==='string'){fiberTag=HostComponent;}else{getTag:switch(type){case REACT_FRAGMENT_TYPE:return createFiberFromFragment(pendingProps.children,mode,expirationTime,key);case REACT_ASYNC_MODE_TYPE:fiberTag=Mode;mode|=AsyncMode|StrictMode;break;case REACT_STRICT_MODE_TYPE:fiberTag=Mode;mode|=StrictMode;break;case REACT_PROFILER_TYPE:return createFiberFromProfiler(pendingProps,mode,expirationTime,key);case REACT_PLACEHOLDER_TYPE:fiberTag=PlaceholderComponent;break;default:{if(typeof type==='object'&&type!==null){switch(type.$$typeof){case REACT_PROVIDER_TYPE:fiberTag=ContextProvider;break getTag;case REACT_CONTEXT_TYPE:// This is a consumer
fiberTag=ContextConsumer;break getTag;case REACT_FORWARD_REF_TYPE:fiberTag=ForwardRef;break getTag;default:{if(typeof type.then==='function'){fiberTag=IndeterminateComponent;break getTag;}}}}var info='';{if(type===undefined||typeof type==='object'&&type!==null&&Object.keys(type).length===0){info+=' You likely forgot to export your component from the file '+"it's defined in, or you might have mixed up default and "+'named imports.';}var ownerName=owner?getComponentName(owner.type):null;if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}}invariant(false,'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',type==null?type:typeof type,info);}}}fiber=createFiber(fiberTag,pendingProps,key,mode);fiber.type=type;fiber.expirationTime=expirationTime;{fiber._debugSource=element._source;fiber._debugOwner=element._owner;}return fiber;}function createFiberFromFragment(elements,mode,expirationTime,key){var fiber=createFiber(Fragment,elements,key,mode);fiber.expirationTime=expirationTime;return fiber;}function createFiberFromProfiler(pendingProps,mode,expirationTime,key){{if(typeof pendingProps.id!=='string'||typeof pendingProps.onRender!=='function'){warningWithoutStack$1(false,'Profiler must specify an "id" string and "onRender" function as props');}}var fiber=createFiber(Profiler,pendingProps,key,mode|ProfileMode);fiber.type=REACT_PROFILER_TYPE;fiber.expirationTime=expirationTime;return fiber;}function createFiberFromText(content,mode,expirationTime){var fiber=createFiber(HostText,content,null,mode);fiber.expirationTime=expirationTime;return fiber;}function createFiberFromHostInstanceForDeletion(){var fiber=createFiber(HostComponent,null,null,NoContext);fiber.type='DELETED';return fiber;}function createFiberFromPortal(portal,mode,expirationTime){var pendingProps=portal.children!==null?portal.children:[];var fiber=createFiber(HostPortal,pendingProps,portal.key,mode);fiber.expirationTime=expirationTime;fiber.stateNode={containerInfo:portal.containerInfo,pendingChildren:null,// Used by persistent updates
implementation:portal.implementation};return fiber;}// Used for stashing WIP properties to replay failed work in DEV.
function assignFiberPropertiesInDEV(target,source){if(target===null){// This Fiber's initial properties will always be overwritten.
// We only use a Fiber to ensure the same hidden class so DEV isn't slow.
target=createFiber(IndeterminateComponent,null,null,NoContext);}// This is intentionally written as a list of all properties.
// We tried to use Object.assign() instead but this is called in
// the hottest path, and Object.assign() was too slow:
// https://github.com/facebook/react/issues/12502
// This code is DEV-only so size is not a concern.
target.tag=source.tag;target.key=source.key;target.type=source.type;target.stateNode=source.stateNode;target.return=source.return;target.child=source.child;target.sibling=source.sibling;target.index=source.index;target.ref=source.ref;target.pendingProps=source.pendingProps;target.memoizedProps=source.memoizedProps;target.updateQueue=source.updateQueue;target.memoizedState=source.memoizedState;target.firstContextDependency=source.firstContextDependency;target.mode=source.mode;target.effectTag=source.effectTag;target.nextEffect=source.nextEffect;target.firstEffect=source.firstEffect;target.lastEffect=source.lastEffect;target.expirationTime=source.expirationTime;target.childExpirationTime=source.childExpirationTime;target.alternate=source.alternate;if(enableProfilerTimer){target.actualDuration=source.actualDuration;target.actualStartTime=source.actualStartTime;target.selfBaseDuration=source.selfBaseDuration;target.treeBaseDuration=source.treeBaseDuration;}target._debugID=source._debugID;target._debugSource=source._debugSource;target._debugOwner=source._debugOwner;target._debugIsCurrentlyTiming=source._debugIsCurrentlyTiming;return target;}/* eslint-disable no-use-before-define */ // TODO: This should be lifted into the renderer.
// The following attributes are only used by interaction tracing builds.
// They enable interactions to be associated with their async work,
// And expose interaction metadata to the React DevTools Profiler plugin.
// Note that these attributes are only defined when the enableSchedulerTracing flag is enabled.
// Exported FiberRoot type includes all properties,
// To avoid requiring potentially error-prone :any casts throughout the project.
// Profiling properties are only safe to access in profiling builds (when enableSchedulerTracing is true).
// The types are defined separately within this file to ensure they stay in sync.
// (We don't have to use an inline :any cast when enableSchedulerTracing is disabled.)
/* eslint-enable no-use-before-define */function createFiberRoot(containerInfo,isAsync,hydrate){// Cyclic construction. This cheats the type system right now because
// stateNode is any.
var uninitializedFiber=createHostRootFiber(isAsync);var root=void 0;if(enableSchedulerTracing){root={current:uninitializedFiber,containerInfo:containerInfo,pendingChildren:null,earliestPendingTime:NoWork,latestPendingTime:NoWork,earliestSuspendedTime:NoWork,latestSuspendedTime:NoWork,latestPingedTime:NoWork,didError:false,pendingCommitExpirationTime:NoWork,finishedWork:null,timeoutHandle:noTimeout,context:null,pendingContext:null,hydrate:hydrate,nextExpirationTimeToWorkOn:NoWork,expirationTime:NoWork,firstBatch:null,nextScheduledRoot:null,interactionThreadID:tracing.unstable_getThreadID(),memoizedInteractions:new Set(),pendingInteractionMap:new Map()};}else{root={current:uninitializedFiber,containerInfo:containerInfo,pendingChildren:null,earliestPendingTime:NoWork,latestPendingTime:NoWork,earliestSuspendedTime:NoWork,latestSuspendedTime:NoWork,latestPingedTime:NoWork,didError:false,pendingCommitExpirationTime:NoWork,finishedWork:null,timeoutHandle:noTimeout,context:null,pendingContext:null,hydrate:hydrate,nextExpirationTimeToWorkOn:NoWork,expirationTime:NoWork,firstBatch:null,nextScheduledRoot:null};}uninitializedFiber.stateNode=root;// The reason for the way the Flow types are structured in this file,
// Is to avoid needing :any casts everywhere interaction tracing fields are used.
// Unfortunately that requires an :any cast for non-interaction tracing capable builds.
// $FlowFixMe Remove this :any cast and replace it with something better.
return root;}/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var lowPriorityWarning=function(){};{var printWarning=function(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.warn(message);}try{// --- Welcome to debugging React ---
// This error was thrown as a convenience so that you can use this stack
// to find the callsite that caused this warning to fire.
throw new Error(message);}catch(x){}};lowPriorityWarning=function(condition,format){if(format===undefined){throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning '+'message argument');}if(!condition){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}printWarning.apply(undefined,[format].concat(args));}};}var lowPriorityWarning$1=lowPriorityWarning;var ReactStrictModeWarnings={discardPendingWarnings:function(){},flushPendingDeprecationWarnings:function(){},flushPendingUnsafeLifecycleWarnings:function(){},recordDeprecationWarnings:function(fiber,instance){},recordUnsafeLifecycleWarnings:function(fiber,instance){},recordLegacyContextWarning:function(fiber,instance){},flushLegacyContextWarning:function(){}};{var LIFECYCLE_SUGGESTIONS={UNSAFE_componentWillMount:'componentDidMount',UNSAFE_componentWillReceiveProps:'static getDerivedStateFromProps',UNSAFE_componentWillUpdate:'componentDidUpdate'};var pendingComponentWillMountWarnings=[];var pendingComponentWillReceivePropsWarnings=[];var pendingComponentWillUpdateWarnings=[];var pendingUnsafeLifecycleWarnings=new Map();var pendingLegacyContextWarning=new Map();// Tracks components we have already warned about.
var didWarnAboutDeprecatedLifecycles=new Set();var didWarnAboutUnsafeLifecycles=new Set();var didWarnAboutLegacyContext=new Set();var setToSortedString=function(set){var array=[];set.forEach(function(value){array.push(value);});return array.sort().join(', ');};ReactStrictModeWarnings.discardPendingWarnings=function(){pendingComponentWillMountWarnings=[];pendingComponentWillReceivePropsWarnings=[];pendingComponentWillUpdateWarnings=[];pendingUnsafeLifecycleWarnings=new Map();pendingLegacyContextWarning=new Map();};ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings=function(){pendingUnsafeLifecycleWarnings.forEach(function(lifecycleWarningsMap,strictRoot){var lifecyclesWarningMesages=[];Object.keys(lifecycleWarningsMap).forEach(function(lifecycle){var lifecycleWarnings=lifecycleWarningsMap[lifecycle];if(lifecycleWarnings.length>0){var componentNames=new Set();lifecycleWarnings.forEach(function(fiber){componentNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});var formatted=lifecycle.replace('UNSAFE_','');var suggestion=LIFECYCLE_SUGGESTIONS[lifecycle];var sortedComponentNames=setToSortedString(componentNames);lifecyclesWarningMesages.push(formatted+': Please update the following components to use '+(suggestion+' instead: '+sortedComponentNames));}});if(lifecyclesWarningMesages.length>0){var strictRootComponentStack=getStackByFiberInDevAndProd(strictRoot);warningWithoutStack$1(false,'Unsafe lifecycle methods were found within a strict-mode tree:%s'+'\n\n%s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-strict-mode-warnings',strictRootComponentStack,lifecyclesWarningMesages.join('\n\n'));}});pendingUnsafeLifecycleWarnings=new Map();};var findStrictRoot=function(fiber){var maybeStrictRoot=null;var node=fiber;while(node!==null){if(node.mode&StrictMode){maybeStrictRoot=node;}node=node.return;}return maybeStrictRoot;};ReactStrictModeWarnings.flushPendingDeprecationWarnings=function(){if(pendingComponentWillMountWarnings.length>0){var uniqueNames=new Set();pendingComponentWillMountWarnings.forEach(function(fiber){uniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutDeprecatedLifecycles.add(fiber.type);});var sortedNames=setToSortedString(uniqueNames);lowPriorityWarning$1(false,'componentWillMount is deprecated and will be removed in the next major version. '+'Use componentDidMount instead. As a temporary workaround, '+'you can rename to UNSAFE_componentWillMount.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-async-component-lifecycle-hooks',sortedNames);pendingComponentWillMountWarnings=[];}if(pendingComponentWillReceivePropsWarnings.length>0){var _uniqueNames=new Set();pendingComponentWillReceivePropsWarnings.forEach(function(fiber){_uniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutDeprecatedLifecycles.add(fiber.type);});var _sortedNames=setToSortedString(_uniqueNames);lowPriorityWarning$1(false,'componentWillReceiveProps is deprecated and will be removed in the next major version. '+'Use static getDerivedStateFromProps instead.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-async-component-lifecycle-hooks',_sortedNames);pendingComponentWillReceivePropsWarnings=[];}if(pendingComponentWillUpdateWarnings.length>0){var _uniqueNames2=new Set();pendingComponentWillUpdateWarnings.forEach(function(fiber){_uniqueNames2.add(getComponentName(fiber.type)||'Component');didWarnAboutDeprecatedLifecycles.add(fiber.type);});var _sortedNames2=setToSortedString(_uniqueNames2);lowPriorityWarning$1(false,'componentWillUpdate is deprecated and will be removed in the next major version. '+'Use componentDidUpdate instead. As a temporary workaround, '+'you can rename to UNSAFE_componentWillUpdate.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-async-component-lifecycle-hooks',_sortedNames2);pendingComponentWillUpdateWarnings=[];}};ReactStrictModeWarnings.recordDeprecationWarnings=function(fiber,instance){// Dedup strategy: Warn once per component.
if(didWarnAboutDeprecatedLifecycles.has(fiber.type)){return;}// Don't warn about react-lifecycles-compat polyfilled components.
if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true){pendingComponentWillMountWarnings.push(fiber);}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true){pendingComponentWillReceivePropsWarnings.push(fiber);}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true){pendingComponentWillUpdateWarnings.push(fiber);}};ReactStrictModeWarnings.recordUnsafeLifecycleWarnings=function(fiber,instance){var strictRoot=findStrictRoot(fiber);if(strictRoot===null){warningWithoutStack$1(false,'Expected to find a StrictMode component in a strict mode tree. '+'This error is likely caused by a bug in React. Please file an issue.');return;}// Dedup strategy: Warn once per component.
// This is difficult to track any other way since component names
// are often vague and are likely to collide between 3rd party libraries.
// An expand property is probably okay to use here since it's DEV-only,
// and will only be set in the event of serious warnings.
if(didWarnAboutUnsafeLifecycles.has(fiber.type)){return;}var warningsForRoot=void 0;if(!pendingUnsafeLifecycleWarnings.has(strictRoot)){warningsForRoot={UNSAFE_componentWillMount:[],UNSAFE_componentWillReceiveProps:[],UNSAFE_componentWillUpdate:[]};pendingUnsafeLifecycleWarnings.set(strictRoot,warningsForRoot);}else{warningsForRoot=pendingUnsafeLifecycleWarnings.get(strictRoot);}var unsafeLifecycles=[];if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true||typeof instance.UNSAFE_componentWillMount==='function'){unsafeLifecycles.push('UNSAFE_componentWillMount');}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true||typeof instance.UNSAFE_componentWillReceiveProps==='function'){unsafeLifecycles.push('UNSAFE_componentWillReceiveProps');}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true||typeof instance.UNSAFE_componentWillUpdate==='function'){unsafeLifecycles.push('UNSAFE_componentWillUpdate');}if(unsafeLifecycles.length>0){unsafeLifecycles.forEach(function(lifecycle){warningsForRoot[lifecycle].push(fiber);});}};ReactStrictModeWarnings.recordLegacyContextWarning=function(fiber,instance){var strictRoot=findStrictRoot(fiber);if(strictRoot===null){warningWithoutStack$1(false,'Expected to find a StrictMode component in a strict mode tree. '+'This error is likely caused by a bug in React. Please file an issue.');return;}// Dedup strategy: Warn once per component.
if(didWarnAboutLegacyContext.has(fiber.type)){return;}var warningsForRoot=pendingLegacyContextWarning.get(strictRoot);if(fiber.type.contextTypes!=null||fiber.type.childContextTypes!=null||instance!==null&&typeof instance.getChildContext==='function'){if(warningsForRoot===undefined){warningsForRoot=[];pendingLegacyContextWarning.set(strictRoot,warningsForRoot);}warningsForRoot.push(fiber);}};ReactStrictModeWarnings.flushLegacyContextWarning=function(){pendingLegacyContextWarning.forEach(function(fiberArray,strictRoot){var uniqueNames=new Set();fiberArray.forEach(function(fiber){uniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutLegacyContext.add(fiber.type);});var sortedNames=setToSortedString(uniqueNames);var strictRootComponentStack=getStackByFiberInDevAndProd(strictRoot);warningWithoutStack$1(false,'Legacy context API has been detected within a strict-mode tree: %s'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here:'+'\nhttps://fb.me/react-strict-mode-warnings',strictRootComponentStack,sortedNames);});};}// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation={debugTool:null};var ReactFiberInstrumentation_1=ReactFiberInstrumentation;// TODO: Offscreen updates should never suspend. However, a promise that
// suspended inside an offscreen subtree should be able to ping at the priority
// of the outer render.
function markPendingPriorityLevel(root,expirationTime){// If there's a gap between completing a failed root and retrying it,
// additional updates may be scheduled. Clear `didError`, in case the update
// is sufficient to fix the error.
root.didError=false;// Update the latest and earliest pending times
var earliestPendingTime=root.earliestPendingTime;if(earliestPendingTime===NoWork){// No other pending updates.
root.earliestPendingTime=root.latestPendingTime=expirationTime;}else{if(earliestPendingTime>expirationTime){// This is the earliest pending update.
root.earliestPendingTime=expirationTime;}else{var latestPendingTime=root.latestPendingTime;if(latestPendingTime<expirationTime){// This is the latest pending update
root.latestPendingTime=expirationTime;}}}findNextExpirationTimeToWorkOn(expirationTime,root);}function markCommittedPriorityLevels(root,earliestRemainingTime){root.didError=false;if(earliestRemainingTime===NoWork){// Fast path. There's no remaining work. Clear everything.
root.earliestPendingTime=NoWork;root.latestPendingTime=NoWork;root.earliestSuspendedTime=NoWork;root.latestSuspendedTime=NoWork;root.latestPingedTime=NoWork;findNextExpirationTimeToWorkOn(NoWork,root);return;}// Let's see if the previous latest known pending level was just flushed.
var latestPendingTime=root.latestPendingTime;if(latestPendingTime!==NoWork){if(latestPendingTime<earliestRemainingTime){// We've flushed all the known pending levels.
root.earliestPendingTime=root.latestPendingTime=NoWork;}else{var earliestPendingTime=root.earliestPendingTime;if(earliestPendingTime<earliestRemainingTime){// We've flushed the earliest known pending level. Set this to the
// latest pending time.
root.earliestPendingTime=root.latestPendingTime;}}}// Now let's handle the earliest remaining level in the whole tree. We need to
// decide whether to treat it as a pending level or as suspended. Check
// it falls within the range of known suspended levels.
var earliestSuspendedTime=root.earliestSuspendedTime;if(earliestSuspendedTime===NoWork){// There's no suspended work. Treat the earliest remaining level as a
// pending level.
markPendingPriorityLevel(root,earliestRemainingTime);findNextExpirationTimeToWorkOn(NoWork,root);return;}var latestSuspendedTime=root.latestSuspendedTime;if(earliestRemainingTime>latestSuspendedTime){// The earliest remaining level is later than all the suspended work. That
// means we've flushed all the suspended work.
root.earliestSuspendedTime=NoWork;root.latestSuspendedTime=NoWork;root.latestPingedTime=NoWork;// There's no suspended work. Treat the earliest remaining level as a
// pending level.
markPendingPriorityLevel(root,earliestRemainingTime);findNextExpirationTimeToWorkOn(NoWork,root);return;}if(earliestRemainingTime<earliestSuspendedTime){// The earliest remaining time is earlier than all the suspended work.
// Treat it as a pending update.
markPendingPriorityLevel(root,earliestRemainingTime);findNextExpirationTimeToWorkOn(NoWork,root);return;}// The earliest remaining time falls within the range of known suspended
// levels. We should treat this as suspended work.
findNextExpirationTimeToWorkOn(NoWork,root);}function hasLowerPriorityWork(root,erroredExpirationTime){var latestPendingTime=root.latestPendingTime;var latestSuspendedTime=root.latestSuspendedTime;var latestPingedTime=root.latestPingedTime;return latestPendingTime!==NoWork&&latestPendingTime>erroredExpirationTime||latestSuspendedTime!==NoWork&&latestSuspendedTime>erroredExpirationTime||latestPingedTime!==NoWork&&latestPingedTime>erroredExpirationTime;}function isPriorityLevelSuspended(root,expirationTime){var earliestSuspendedTime=root.earliestSuspendedTime;var latestSuspendedTime=root.latestSuspendedTime;return earliestSuspendedTime!==NoWork&&expirationTime>=earliestSuspendedTime&&expirationTime<=latestSuspendedTime;}function markSuspendedPriorityLevel(root,suspendedTime){root.didError=false;clearPing(root,suspendedTime);// First, check the known pending levels and update them if needed.
var earliestPendingTime=root.earliestPendingTime;var latestPendingTime=root.latestPendingTime;if(earliestPendingTime===suspendedTime){if(latestPendingTime===suspendedTime){// Both known pending levels were suspended. Clear them.
root.earliestPendingTime=root.latestPendingTime=NoWork;}else{// The earliest pending level was suspended. Clear by setting it to the
// latest pending level.
root.earliestPendingTime=latestPendingTime;}}else if(latestPendingTime===suspendedTime){// The latest pending level was suspended. Clear by setting it to the
// latest pending level.
root.latestPendingTime=earliestPendingTime;}// Finally, update the known suspended levels.
var earliestSuspendedTime=root.earliestSuspendedTime;var latestSuspendedTime=root.latestSuspendedTime;if(earliestSuspendedTime===NoWork){// No other suspended levels.
root.earliestSuspendedTime=root.latestSuspendedTime=suspendedTime;}else{if(earliestSuspendedTime>suspendedTime){// This is the earliest suspended level.
root.earliestSuspendedTime=suspendedTime;}else if(latestSuspendedTime<suspendedTime){// This is the latest suspended level
root.latestSuspendedTime=suspendedTime;}}findNextExpirationTimeToWorkOn(suspendedTime,root);}function markPingedPriorityLevel(root,pingedTime){root.didError=false;// TODO: When we add back resuming, we need to ensure the progressed work
// is thrown out and not reused during the restarted render. One way to
// invalidate the progressed work is to restart at expirationTime + 1.
var latestPingedTime=root.latestPingedTime;if(latestPingedTime===NoWork||latestPingedTime<pingedTime){root.latestPingedTime=pingedTime;}findNextExpirationTimeToWorkOn(pingedTime,root);}function clearPing(root,completedTime){// TODO: Track whether the root was pinged during the render phase. If so,
// we need to make sure we don't lose track of it.
var latestPingedTime=root.latestPingedTime;if(latestPingedTime!==NoWork&&latestPingedTime<=completedTime){root.latestPingedTime=NoWork;}}function findEarliestOutstandingPriorityLevel(root,renderExpirationTime){var earliestExpirationTime=renderExpirationTime;var earliestPendingTime=root.earliestPendingTime;var earliestSuspendedTime=root.earliestSuspendedTime;if(earliestExpirationTime===NoWork||earliestPendingTime!==NoWork&&earliestPendingTime<earliestExpirationTime){earliestExpirationTime=earliestPendingTime;}if(earliestExpirationTime===NoWork||earliestSuspendedTime!==NoWork&&earliestSuspendedTime<earliestExpirationTime){earliestExpirationTime=earliestSuspendedTime;}return earliestExpirationTime;}function didExpireAtExpirationTime(root,currentTime){var expirationTime=root.expirationTime;if(expirationTime!==NoWork&&currentTime>=expirationTime){// The root has expired. Flush all work up to the current time.
root.nextExpirationTimeToWorkOn=currentTime;}}function findNextExpirationTimeToWorkOn(completedExpirationTime,root){var earliestSuspendedTime=root.earliestSuspendedTime;var latestSuspendedTime=root.latestSuspendedTime;var earliestPendingTime=root.earliestPendingTime;var latestPingedTime=root.latestPingedTime;// Work on the earliest pending time. Failing that, work on the latest
// pinged time.
var nextExpirationTimeToWorkOn=earliestPendingTime!==NoWork?earliestPendingTime:latestPingedTime;// If there is no pending or pinged work, check if there's suspended work
// that's lower priority than what we just completed.
if(nextExpirationTimeToWorkOn===NoWork&&(completedExpirationTime===NoWork||latestSuspendedTime>completedExpirationTime)){// The lowest priority suspended work is the work most likely to be
// committed next. Let's start rendering it again, so that if it times out,
// it's ready to commit.
nextExpirationTimeToWorkOn=latestSuspendedTime;}var expirationTime=nextExpirationTimeToWorkOn;if(expirationTime!==NoWork&&earliestSuspendedTime!==NoWork&&earliestSuspendedTime<expirationTime){// Expire using the earliest known expiration time.
expirationTime=earliestSuspendedTime;}root.nextExpirationTimeToWorkOn=nextExpirationTimeToWorkOn;root.expirationTime=expirationTime;}// UpdateQueue is a linked list of prioritized updates.
//
// Like fibers, update queues come in pairs: a current queue, which represents
// the visible state of the screen, and a work-in-progress queue, which is
// can be mutated and processed asynchronously before it is committed — a form
// of double buffering. If a work-in-progress render is discarded before
// finishing, we create a new work-in-progress by cloning the current queue.
//
// Both queues share a persistent, singly-linked list structure. To schedule an
// update, we append it to the end of both queues. Each queue maintains a
// pointer to first update in the persistent list that hasn't been processed.
// The work-in-progress pointer always has a position equal to or greater than
// the current queue, since we always work on that one. The current queue's
// pointer is only updated during the commit phase, when we swap in the
// work-in-progress.
//
// For example:
//
//   Current pointer:           A - B - C - D - E - F
//   Work-in-progress pointer:              D - E - F
//                                          ^
//                                          The work-in-progress queue has
//                                          processed more updates than current.
//
// The reason we append to both queues is because otherwise we might drop
// updates without ever processing them. For example, if we only add updates to
// the work-in-progress queue, some updates could be lost whenever a work-in
// -progress render restarts by cloning from current. Similarly, if we only add
// updates to the current queue, the updates will be lost whenever an already
// in-progress queue commits and swaps with the current queue. However, by
// adding to both queues, we guarantee that the update will be part of the next
// work-in-progress. (And because the work-in-progress queue becomes the
// current queue once it commits, there's no danger of applying the same
// update twice.)
//
// Prioritization
// --------------
//
// Updates are not sorted by priority, but by insertion; new updates are always
// appended to the end of the list.
//
// The priority is still important, though. When processing the update queue
// during the render phase, only the updates with sufficient priority are
// included in the result. If we skip an update because it has insufficient
// priority, it remains in the queue to be processed later, during a lower
// priority render. Crucially, all updates subsequent to a skipped update also
// remain in the queue *regardless of their priority*. That means high priority
// updates are sometimes processed twice, at two separate priorities. We also
// keep track of a base state, that represents the state before the first
// update in the queue is applied.
//
// For example:
//
//   Given a base state of '', and the following queue of updates
//
//     A1 - B2 - C1 - D2
//
//   where the number indicates the priority, and the update is applied to the
//   previous state by appending a letter, React will process these updates as
//   two separate renders, one per distinct priority level:
//
//   First render, at priority 1:
//     Base state: ''
//     Updates: [A1, C1]
//     Result state: 'AC'
//
//   Second render, at priority 2:
//     Base state: 'A'            <-  The base state does not include C1,
//                                    because B2 was skipped.
//     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
//     Result state: 'ABCD'
//
// Because we process updates in insertion order, and rebase high priority
// updates when preceding updates are skipped, the final result is deterministic
// regardless of priority. Intermediate state may vary according to system
// resources, but the final state is always the same.
var UpdateState=0;var ReplaceState=1;var ForceUpdate=2;var CaptureUpdate=3;// Global state that is reset at the beginning of calling `processUpdateQueue`.
// It should only be read right after calling `processUpdateQueue`, via
// `checkHasForceUpdateAfterProcessing`.
var hasForceUpdate=false;var didWarnUpdateInsideUpdate=void 0;var currentlyProcessingQueue=void 0;var resetCurrentlyProcessingQueue=void 0;{didWarnUpdateInsideUpdate=false;currentlyProcessingQueue=null;resetCurrentlyProcessingQueue=function(){currentlyProcessingQueue=null;};}function createUpdateQueue(baseState){var queue={baseState:baseState,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null};return queue;}function cloneUpdateQueue(currentQueue){var queue={baseState:currentQueue.baseState,firstUpdate:currentQueue.firstUpdate,lastUpdate:currentQueue.lastUpdate,// TODO: With resuming, if we bail out and resuse the child tree, we should
// keep these effects.
firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null};return queue;}function createUpdate(expirationTime){return{expirationTime:expirationTime,tag:UpdateState,payload:null,callback:null,next:null,nextEffect:null};}function appendUpdateToQueue(queue,update){// Append the update to the end of the list.
if(queue.lastUpdate===null){// Queue is empty
queue.firstUpdate=queue.lastUpdate=update;}else{queue.lastUpdate.next=update;queue.lastUpdate=update;}}function enqueueUpdate(fiber,update){// Update queues are created lazily.
var alternate=fiber.alternate;var queue1=void 0;var queue2=void 0;if(alternate===null){// There's only one fiber.
queue1=fiber.updateQueue;queue2=null;if(queue1===null){queue1=fiber.updateQueue=createUpdateQueue(fiber.memoizedState);}}else{// There are two owners.
queue1=fiber.updateQueue;queue2=alternate.updateQueue;if(queue1===null){if(queue2===null){// Neither fiber has an update queue. Create new ones.
queue1=fiber.updateQueue=createUpdateQueue(fiber.memoizedState);queue2=alternate.updateQueue=createUpdateQueue(alternate.memoizedState);}else{// Only one fiber has an update queue. Clone to create a new one.
queue1=fiber.updateQueue=cloneUpdateQueue(queue2);}}else{if(queue2===null){// Only one fiber has an update queue. Clone to create a new one.
queue2=alternate.updateQueue=cloneUpdateQueue(queue1);}else{// Both owners have an update queue.
}}}if(queue2===null||queue1===queue2){// There's only a single queue.
appendUpdateToQueue(queue1,update);}else{// There are two queues. We need to append the update to both queues,
// while accounting for the persistent structure of the list — we don't
// want the same update to be added multiple times.
if(queue1.lastUpdate===null||queue2.lastUpdate===null){// One of the queues is not empty. We must add the update to both queues.
appendUpdateToQueue(queue1,update);appendUpdateToQueue(queue2,update);}else{// Both queues are non-empty. The last update is the same in both lists,
// because of structural sharing. So, only append to one of the lists.
appendUpdateToQueue(queue1,update);// But we still need to update the `lastUpdate` pointer of queue2.
queue2.lastUpdate=update;}}{if((fiber.tag===ClassComponent||fiber.tag===ClassComponentLazy)&&(currentlyProcessingQueue===queue1||queue2!==null&&currentlyProcessingQueue===queue2)&&!didWarnUpdateInsideUpdate){warningWithoutStack$1(false,'An update (setState, replaceState, or forceUpdate) was scheduled '+'from inside an update function. Update functions should be pure, '+'with zero side-effects. Consider using componentDidUpdate or a '+'callback.');didWarnUpdateInsideUpdate=true;}}}function enqueueCapturedUpdate(workInProgress,update){// Captured updates go into a separate list, and only on the work-in-
// progress queue.
var workInProgressQueue=workInProgress.updateQueue;if(workInProgressQueue===null){workInProgressQueue=workInProgress.updateQueue=createUpdateQueue(workInProgress.memoizedState);}else{// TODO: I put this here rather than createWorkInProgress so that we don't
// clone the queue unnecessarily. There's probably a better way to
// structure this.
workInProgressQueue=ensureWorkInProgressQueueIsAClone(workInProgress,workInProgressQueue);}// Append the update to the end of the list.
if(workInProgressQueue.lastCapturedUpdate===null){// This is the first render phase update
workInProgressQueue.firstCapturedUpdate=workInProgressQueue.lastCapturedUpdate=update;}else{workInProgressQueue.lastCapturedUpdate.next=update;workInProgressQueue.lastCapturedUpdate=update;}}function ensureWorkInProgressQueueIsAClone(workInProgress,queue){var current=workInProgress.alternate;if(current!==null){// If the work-in-progress queue is equal to the current queue,
// we need to clone it first.
if(queue===current.updateQueue){queue=workInProgress.updateQueue=cloneUpdateQueue(queue);}}return queue;}function getStateFromUpdate(workInProgress,queue,update,prevState,nextProps,instance){switch(update.tag){case ReplaceState:{var _payload=update.payload;if(typeof _payload==='function'){// Updater function
{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){_payload.call(instance,prevState,nextProps);}}return _payload.call(instance,prevState,nextProps);}// State object
return _payload;}case CaptureUpdate:{workInProgress.effectTag=workInProgress.effectTag&~ShouldCapture|DidCapture;}// Intentional fallthrough
case UpdateState:{var _payload2=update.payload;var partialState=void 0;if(typeof _payload2==='function'){// Updater function
{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){_payload2.call(instance,prevState,nextProps);}}partialState=_payload2.call(instance,prevState,nextProps);}else{// Partial state object
partialState=_payload2;}if(partialState===null||partialState===undefined){// Null and undefined are treated as no-ops.
return prevState;}// Merge the partial state and the previous state.
return _assign({},prevState,partialState);}case ForceUpdate:{hasForceUpdate=true;return prevState;}}return prevState;}function processUpdateQueue(workInProgress,queue,props,instance,renderExpirationTime){hasForceUpdate=false;queue=ensureWorkInProgressQueueIsAClone(workInProgress,queue);{currentlyProcessingQueue=queue;}// These values may change as we process the queue.
var newBaseState=queue.baseState;var newFirstUpdate=null;var newExpirationTime=NoWork;// Iterate through the list of updates to compute the result.
var update=queue.firstUpdate;var resultState=newBaseState;while(update!==null){var updateExpirationTime=update.expirationTime;if(updateExpirationTime>renderExpirationTime){// This update does not have sufficient priority. Skip it.
if(newFirstUpdate===null){// This is the first skipped update. It will be the first update in
// the new list.
newFirstUpdate=update;// Since this is the first update that was skipped, the current result
// is the new base state.
newBaseState=resultState;}// Since this update will remain in the list, update the remaining
// expiration time.
if(newExpirationTime===NoWork||newExpirationTime>updateExpirationTime){newExpirationTime=updateExpirationTime;}}else{// This update does have sufficient priority. Process it and compute
// a new result.
resultState=getStateFromUpdate(workInProgress,queue,update,resultState,props,instance);var _callback=update.callback;if(_callback!==null){workInProgress.effectTag|=Callback;// Set this to null, in case it was mutated during an aborted render.
update.nextEffect=null;if(queue.lastEffect===null){queue.firstEffect=queue.lastEffect=update;}else{queue.lastEffect.nextEffect=update;queue.lastEffect=update;}}}// Continue to the next update.
update=update.next;}// Separately, iterate though the list of captured updates.
var newFirstCapturedUpdate=null;update=queue.firstCapturedUpdate;while(update!==null){var _updateExpirationTime=update.expirationTime;if(_updateExpirationTime>renderExpirationTime){// This update does not have sufficient priority. Skip it.
if(newFirstCapturedUpdate===null){// This is the first skipped captured update. It will be the first
// update in the new list.
newFirstCapturedUpdate=update;// If this is the first update that was skipped, the current result is
// the new base state.
if(newFirstUpdate===null){newBaseState=resultState;}}// Since this update will remain in the list, update the remaining
// expiration time.
if(newExpirationTime===NoWork||newExpirationTime>_updateExpirationTime){newExpirationTime=_updateExpirationTime;}}else{// This update does have sufficient priority. Process it and compute
// a new result.
resultState=getStateFromUpdate(workInProgress,queue,update,resultState,props,instance);var _callback2=update.callback;if(_callback2!==null){workInProgress.effectTag|=Callback;// Set this to null, in case it was mutated during an aborted render.
update.nextEffect=null;if(queue.lastCapturedEffect===null){queue.firstCapturedEffect=queue.lastCapturedEffect=update;}else{queue.lastCapturedEffect.nextEffect=update;queue.lastCapturedEffect=update;}}}update=update.next;}if(newFirstUpdate===null){queue.lastUpdate=null;}if(newFirstCapturedUpdate===null){queue.lastCapturedUpdate=null;}else{workInProgress.effectTag|=Callback;}if(newFirstUpdate===null&&newFirstCapturedUpdate===null){// We processed every update, without skipping. That means the new base
// state is the same as the result state.
newBaseState=resultState;}queue.baseState=newBaseState;queue.firstUpdate=newFirstUpdate;queue.firstCapturedUpdate=newFirstCapturedUpdate;// Set the remaining expiration time to be whatever is remaining in the queue.
// This should be fine because the only two other things that contribute to
// expiration time are props and context. We're already in the middle of the
// begin phase by the time we start processing the queue, so we've already
// dealt with the props. Context in components that specify
// shouldComponentUpdate is tricky; but we'll have to account for
// that regardless.
workInProgress.expirationTime=newExpirationTime;workInProgress.memoizedState=resultState;{currentlyProcessingQueue=null;}}function callCallback(callback,context){!(typeof callback==='function')?invariant(false,'Invalid argument passed as callback. Expected a function. Instead received: %s',callback):void 0;callback.call(context);}function resetHasForceUpdateBeforeProcessing(){hasForceUpdate=false;}function checkHasForceUpdateAfterProcessing(){return hasForceUpdate;}function commitUpdateQueue(finishedWork,finishedQueue,instance,renderExpirationTime){// If the finished render included captured updates, and there are still
// lower priority updates left over, we need to keep the captured updates
// in the queue so that they are rebased and not dropped once we process the
// queue again at the lower priority.
if(finishedQueue.firstCapturedUpdate!==null){// Join the captured update list to the end of the normal list.
if(finishedQueue.lastUpdate!==null){finishedQueue.lastUpdate.next=finishedQueue.firstCapturedUpdate;finishedQueue.lastUpdate=finishedQueue.lastCapturedUpdate;}// Clear the list of captured updates.
finishedQueue.firstCapturedUpdate=finishedQueue.lastCapturedUpdate=null;}// Commit the effects
commitUpdateEffects(finishedQueue.firstEffect,instance);finishedQueue.firstEffect=finishedQueue.lastEffect=null;commitUpdateEffects(finishedQueue.firstCapturedEffect,instance);finishedQueue.firstCapturedEffect=finishedQueue.lastCapturedEffect=null;}function commitUpdateEffects(effect,instance){while(effect!==null){var _callback3=effect.callback;if(_callback3!==null){effect.callback=null;callCallback(_callback3,instance);}effect=effect.nextEffect;}}function createCapturedValue(value,source){// If the value is an error, call this function immediately after it is thrown
// so the stack is accurate.
return{value:value,source:source,stack:getStackByFiberInDevAndProd(source)};}var valueCursor=createCursor(null);var rendererSigil=void 0;{// Use this to detect multiple renderers using the same context
rendererSigil={};}var currentlyRenderingFiber=null;var lastContextDependency=null;var lastContextWithAllBitsObserved=null;function resetContextDependences(){// This is called right before React yields execution, to ensure `readContext`
// cannot be called outside the render phase.
currentlyRenderingFiber=null;lastContextDependency=null;lastContextWithAllBitsObserved=null;}function pushProvider(providerFiber,nextValue){var context=providerFiber.type._context;if(isPrimaryRenderer){push(valueCursor,context._currentValue,providerFiber);context._currentValue=nextValue;{!(context._currentRenderer===undefined||context._currentRenderer===null||context._currentRenderer===rendererSigil)?warningWithoutStack$1(false,'Detected multiple renderers concurrently rendering the '+'same context provider. This is currently unsupported.'):void 0;context._currentRenderer=rendererSigil;}}else{push(valueCursor,context._currentValue2,providerFiber);context._currentValue2=nextValue;{!(context._currentRenderer2===undefined||context._currentRenderer2===null||context._currentRenderer2===rendererSigil)?warningWithoutStack$1(false,'Detected multiple renderers concurrently rendering the '+'same context provider. This is currently unsupported.'):void 0;context._currentRenderer2=rendererSigil;}}}function popProvider(providerFiber){var currentValue=valueCursor.current;pop(valueCursor,providerFiber);var context=providerFiber.type._context;if(isPrimaryRenderer){context._currentValue=currentValue;}else{context._currentValue2=currentValue;}}function calculateChangedBits(context,newValue,oldValue){// Use Object.is to compare the new context value to the old value. Inlined
// Object.is polyfill.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
if(oldValue===newValue&&(oldValue!==0||1/oldValue===1/newValue)||oldValue!==oldValue&&newValue!==newValue// eslint-disable-line no-self-compare
){// No change
return 0;}else{var changedBits=typeof context._calculateChangedBits==='function'?context._calculateChangedBits(oldValue,newValue):maxSigned31BitInt;{!((changedBits&maxSigned31BitInt)===changedBits)?warning$1(false,'calculateChangedBits: Expected the return value to be a '+'31-bit integer. Instead received: %s',changedBits):void 0;}return changedBits|0;}}function propagateContextChange(workInProgress,context,changedBits,renderExpirationTime){var fiber=workInProgress.child;if(fiber!==null){// Set the return pointer of the child to the work-in-progress fiber.
fiber.return=workInProgress;}while(fiber!==null){var nextFiber=void 0;// Visit this fiber.
var dependency=fiber.firstContextDependency;if(dependency!==null){do{// Check if the context matches.
if(dependency.context===context&&(dependency.observedBits&changedBits)!==0){// Match! Schedule an update on this fiber.
if(fiber.tag===ClassComponent||fiber.tag===ClassComponentLazy){// Schedule a force update on the work-in-progress.
var update=createUpdate(renderExpirationTime);update.tag=ForceUpdate;// TODO: Because we don't have a work-in-progress, this will add the
// update to the current fiber, too, which means it will persist even if
// this render is thrown away. Since it's a race condition, not sure it's
// worth fixing.
enqueueUpdate(fiber,update);}if(fiber.expirationTime===NoWork||fiber.expirationTime>renderExpirationTime){fiber.expirationTime=renderExpirationTime;}var alternate=fiber.alternate;if(alternate!==null&&(alternate.expirationTime===NoWork||alternate.expirationTime>renderExpirationTime)){alternate.expirationTime=renderExpirationTime;}// Update the child expiration time of all the ancestors, including
// the alternates.
var node=fiber.return;while(node!==null){alternate=node.alternate;if(node.childExpirationTime===NoWork||node.childExpirationTime>renderExpirationTime){node.childExpirationTime=renderExpirationTime;if(alternate!==null&&(alternate.childExpirationTime===NoWork||alternate.childExpirationTime>renderExpirationTime)){alternate.childExpirationTime=renderExpirationTime;}}else if(alternate!==null&&(alternate.childExpirationTime===NoWork||alternate.childExpirationTime>renderExpirationTime)){alternate.childExpirationTime=renderExpirationTime;}else{// Neither alternate was updated, which means the rest of the
// ancestor path already has sufficient priority.
break;}node=node.return;}}nextFiber=fiber.child;dependency=dependency.next;}while(dependency!==null);}else if(fiber.tag===ContextProvider){// Don't scan deeper if this is a matching provider
nextFiber=fiber.type===workInProgress.type?null:fiber.child;}else{// Traverse down.
nextFiber=fiber.child;}if(nextFiber!==null){// Set the return pointer of the child to the work-in-progress fiber.
nextFiber.return=fiber;}else{// No child. Traverse to next sibling.
nextFiber=fiber;while(nextFiber!==null){if(nextFiber===workInProgress){// We're back to the root of this subtree. Exit.
nextFiber=null;break;}var sibling=nextFiber.sibling;if(sibling!==null){// Set the return pointer of the sibling to the work-in-progress fiber.
sibling.return=nextFiber.return;nextFiber=sibling;break;}// No more siblings. Traverse up.
nextFiber=nextFiber.return;}}fiber=nextFiber;}}function prepareToReadContext(workInProgress,renderExpirationTime){currentlyRenderingFiber=workInProgress;lastContextDependency=null;lastContextWithAllBitsObserved=null;// Reset the work-in-progress list
workInProgress.firstContextDependency=null;}function readContext(context,observedBits){if(lastContextWithAllBitsObserved===context){// Nothing to do. We already observe everything in this context.
}else if(observedBits===false||observedBits===0){// Do not observe any updates.
}else{var resolvedObservedBits=void 0;// Avoid deopting on observable arguments or heterogeneous types.
if(typeof observedBits!=='number'||observedBits===maxSigned31BitInt){// Observe all updates.
lastContextWithAllBitsObserved=context;resolvedObservedBits=maxSigned31BitInt;}else{resolvedObservedBits=observedBits;}var contextItem={context:context,observedBits:resolvedObservedBits,next:null};if(lastContextDependency===null){!(currentlyRenderingFiber!==null)?invariant(false,'Context.unstable_read(): Context can only be read while React is rendering, e.g. inside the render method or getDerivedStateFromProps.'):void 0;// This is the first dependency in the list
currentlyRenderingFiber.firstContextDependency=lastContextDependency=contextItem;}else{// Append a new context item.
lastContextDependency=lastContextDependency.next=contextItem;}}return isPrimaryRenderer?context._currentValue:context._currentValue2;}var NO_CONTEXT={};var contextStackCursor$1=createCursor(NO_CONTEXT);var contextFiberStackCursor=createCursor(NO_CONTEXT);var rootInstanceStackCursor=createCursor(NO_CONTEXT);function requiredContext(c){!(c!==NO_CONTEXT)?invariant(false,'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.'):void 0;return c;}function getRootHostContainer(){var rootInstance=requiredContext(rootInstanceStackCursor.current);return rootInstance;}function pushHostContainer(fiber,nextRootInstance){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
push(rootInstanceStackCursor,nextRootInstance,fiber);// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);// Finally, we need to push the host context to the stack.
// However, we can't just call getRootHostContext() and push it because
// we'd have a different number of entries on the stack depending on
// whether getRootHostContext() throws somewhere in renderer code or not.
// So we push an empty value first. This lets us safely unwind on errors.
push(contextStackCursor$1,NO_CONTEXT,fiber);var nextRootContext=getRootHostContext(nextRootInstance);// Now that we know this function doesn't throw, replace it.
pop(contextStackCursor$1,fiber);push(contextStackCursor$1,nextRootContext,fiber);}function popHostContainer(fiber){pop(contextStackCursor$1,fiber);pop(contextFiberStackCursor,fiber);pop(rootInstanceStackCursor,fiber);}function getHostContext(){var context=requiredContext(contextStackCursor$1.current);return context;}function pushHostContext(fiber){var rootInstance=requiredContext(rootInstanceStackCursor.current);var context=requiredContext(contextStackCursor$1.current);var nextContext=getChildHostContext(context,fiber.type,rootInstance);// Don't push this Fiber's context unless it's unique.
if(context===nextContext){return;}// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);push(contextStackCursor$1,nextContext,fiber);}function popHostContext(fiber){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
if(contextFiberStackCursor.current!==fiber){return;}pop(contextStackCursor$1,fiber);pop(contextFiberStackCursor,fiber);}var commitTime=0;var profilerStartTime=-1;function getCommitTime(){return commitTime;}function recordCommitTime(){if(!enableProfilerTimer){return;}commitTime=schedule.unstable_now();}function startProfilerTimer(fiber){if(!enableProfilerTimer){return;}profilerStartTime=schedule.unstable_now();if(fiber.actualStartTime<0){fiber.actualStartTime=schedule.unstable_now();}}function stopProfilerTimerIfRunning(fiber){if(!enableProfilerTimer){return;}profilerStartTime=-1;}function stopProfilerTimerIfRunningAndRecordDelta(fiber,overrideBaseTime){if(!enableProfilerTimer){return;}if(profilerStartTime>=0){var elapsedTime=schedule.unstable_now()-profilerStartTime;fiber.actualDuration+=elapsedTime;if(overrideBaseTime){fiber.selfBaseDuration=elapsedTime;}profilerStartTime=-1;}}var fakeInternalInstance={};var isArray=Array.isArray;// React.Component uses a shared frozen object by default.
// We'll use it to determine whether we need to initialize legacy refs.
var emptyRefsObject=new React.Component().refs;var didWarnAboutStateAssignmentForComponent=void 0;var didWarnAboutUninitializedState=void 0;var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate=void 0;var didWarnAboutLegacyLifecyclesAndDerivedState=void 0;var didWarnAboutUndefinedDerivedState=void 0;var warnOnUndefinedDerivedState=void 0;var warnOnInvalidCallback$1=void 0;var didWarnAboutDirectlyAssigningPropsToState=void 0;{didWarnAboutStateAssignmentForComponent=new Set();didWarnAboutUninitializedState=new Set();didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate=new Set();didWarnAboutLegacyLifecyclesAndDerivedState=new Set();didWarnAboutDirectlyAssigningPropsToState=new Set();didWarnAboutUndefinedDerivedState=new Set();var didWarnOnInvalidCallback=new Set();warnOnInvalidCallback$1=function(callback,callerName){if(callback===null||typeof callback==='function'){return;}var key=callerName+'_'+callback;if(!didWarnOnInvalidCallback.has(key)){didWarnOnInvalidCallback.add(key);warningWithoutStack$1(false,'%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback);}};warnOnUndefinedDerivedState=function(type,partialState){if(partialState===undefined){var componentName=getComponentName(type)||'Component';if(!didWarnAboutUndefinedDerivedState.has(componentName)){didWarnAboutUndefinedDerivedState.add(componentName);warningWithoutStack$1(false,'%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. '+'You have returned undefined.',componentName);}}};// This is so gross but it's at least non-critical and can be removed if
// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(fakeInternalInstance,'_processChildContext',{enumerable:false,value:function(){invariant(false,'_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');}});Object.freeze(fakeInternalInstance);}function applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,nextProps){var prevState=workInProgress.memoizedState;{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){// Invoke the function an extra time to help detect side-effects.
getDerivedStateFromProps(nextProps,prevState);}}var partialState=getDerivedStateFromProps(nextProps,prevState);{warnOnUndefinedDerivedState(ctor,partialState);}// Merge the partial state and the previous state.
var memoizedState=partialState===null||partialState===undefined?prevState:_assign({},prevState,partialState);workInProgress.memoizedState=memoizedState;// Once the update queue is empty, persist the derived state onto the
// base state.
var updateQueue=workInProgress.updateQueue;if(updateQueue!==null&&workInProgress.expirationTime===NoWork){updateQueue.baseState=memoizedState;}}var classComponentUpdater={isMounted:isMounted,enqueueSetState:function(inst,payload,callback){var fiber=get(inst);var currentTime=requestCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,fiber);var update=createUpdate(expirationTime);update.payload=payload;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback$1(callback,'setState');}update.callback=callback;}enqueueUpdate(fiber,update);scheduleWork(fiber,expirationTime);},enqueueReplaceState:function(inst,payload,callback){var fiber=get(inst);var currentTime=requestCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,fiber);var update=createUpdate(expirationTime);update.tag=ReplaceState;update.payload=payload;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback$1(callback,'replaceState');}update.callback=callback;}enqueueUpdate(fiber,update);scheduleWork(fiber,expirationTime);},enqueueForceUpdate:function(inst,callback){var fiber=get(inst);var currentTime=requestCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,fiber);var update=createUpdate(expirationTime);update.tag=ForceUpdate;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback$1(callback,'forceUpdate');}update.callback=callback;}enqueueUpdate(fiber,update);scheduleWork(fiber,expirationTime);}};function checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextLegacyContext){var instance=workInProgress.stateNode;if(typeof instance.shouldComponentUpdate==='function'){startPhaseTimer(workInProgress,'shouldComponentUpdate');var shouldUpdate=instance.shouldComponentUpdate(newProps,newState,nextLegacyContext);stopPhaseTimer();{!(shouldUpdate!==undefined)?warningWithoutStack$1(false,'%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',getComponentName(ctor)||'Component'):void 0;}return shouldUpdate;}if(ctor.prototype&&ctor.prototype.isPureReactComponent){return!shallowEqual(oldProps,newProps)||!shallowEqual(oldState,newState);}return true;}function checkClassInstance(workInProgress,ctor,newProps){var instance=workInProgress.stateNode;{var name=getComponentName(ctor)||'Component';var renderPresent=instance.render;if(!renderPresent){if(ctor.prototype&&typeof ctor.prototype.render==='function'){warningWithoutStack$1(false,'%s(...): No `render` method found on the returned component '+'instance: did you accidentally return an object from the constructor?',name);}else{warningWithoutStack$1(false,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`.',name);}}var noGetInitialStateOnES6=!instance.getInitialState||instance.getInitialState.isReactClassApproved||instance.state;!noGetInitialStateOnES6?warningWithoutStack$1(false,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',name):void 0;var noGetDefaultPropsOnES6=!instance.getDefaultProps||instance.getDefaultProps.isReactClassApproved;!noGetDefaultPropsOnES6?warningWithoutStack$1(false,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',name):void 0;var noInstancePropTypes=!instance.propTypes;!noInstancePropTypes?warningWithoutStack$1(false,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',name):void 0;var noInstanceContextTypes=!instance.contextTypes;!noInstanceContextTypes?warningWithoutStack$1(false,'contextTypes was defined as an instance property on %s. Use a static '+'property to define contextTypes instead.',name):void 0;var noComponentShouldUpdate=typeof instance.componentShouldUpdate!=='function';!noComponentShouldUpdate?warningWithoutStack$1(false,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',name):void 0;if(ctor.prototype&&ctor.prototype.isPureReactComponent&&typeof instance.shouldComponentUpdate!=='undefined'){warningWithoutStack$1(false,'%s has a method called shouldComponentUpdate(). '+'shouldComponentUpdate should not be used when extending React.PureComponent. '+'Please extend React.Component if shouldComponentUpdate is used.',getComponentName(ctor)||'A pure component');}var noComponentDidUnmount=typeof instance.componentDidUnmount!=='function';!noComponentDidUnmount?warningWithoutStack$1(false,'%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',name):void 0;var noComponentDidReceiveProps=typeof instance.componentDidReceiveProps!=='function';!noComponentDidReceiveProps?warningWithoutStack$1(false,'%s has a method called '+'componentDidReceiveProps(). But there is no such lifecycle method. '+'If you meant to update the state in response to changing props, '+'use componentWillReceiveProps(). If you meant to fetch data or '+'run side-effects or mutations after React has updated the UI, use componentDidUpdate().',name):void 0;var noComponentWillRecieveProps=typeof instance.componentWillRecieveProps!=='function';!noComponentWillRecieveProps?warningWithoutStack$1(false,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',name):void 0;var noUnsafeComponentWillRecieveProps=typeof instance.UNSAFE_componentWillRecieveProps!=='function';!noUnsafeComponentWillRecieveProps?warningWithoutStack$1(false,'%s has a method called '+'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?',name):void 0;var hasMutatedProps=instance.props!==newProps;!(instance.props===undefined||!hasMutatedProps)?warningWithoutStack$1(false,'%s(...): When calling super() in `%s`, make sure to pass '+"up the same props that your component's constructor was passed.",name,name):void 0;var noInstanceDefaultProps=!instance.defaultProps;!noInstanceDefaultProps?warningWithoutStack$1(false,'Setting defaultProps as an instance property on %s is not supported and will be ignored.'+' Instead, define defaultProps as a static property on %s.',name,name):void 0;if(typeof instance.getSnapshotBeforeUpdate==='function'&&typeof instance.componentDidUpdate!=='function'&&!didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)){didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);warningWithoutStack$1(false,'%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). '+'This component defines getSnapshotBeforeUpdate() only.',getComponentName(ctor));}var noInstanceGetDerivedStateFromProps=typeof instance.getDerivedStateFromProps!=='function';!noInstanceGetDerivedStateFromProps?warningWithoutStack$1(false,'%s: getDerivedStateFromProps() is defined as an instance method '+'and will be ignored. Instead, declare it as a static method.',name):void 0;var noInstanceGetDerivedStateFromCatch=typeof instance.getDerivedStateFromCatch!=='function';!noInstanceGetDerivedStateFromCatch?warningWithoutStack$1(false,'%s: getDerivedStateFromCatch() is defined as an instance method '+'and will be ignored. Instead, declare it as a static method.',name):void 0;var noStaticGetSnapshotBeforeUpdate=typeof ctor.getSnapshotBeforeUpdate!=='function';!noStaticGetSnapshotBeforeUpdate?warningWithoutStack$1(false,'%s: getSnapshotBeforeUpdate() is defined as a static method '+'and will be ignored. Instead, declare it as an instance method.',name):void 0;var _state=instance.state;if(_state&&(typeof _state!=='object'||isArray(_state))){warningWithoutStack$1(false,'%s.state: must be set to an object or null',name);}if(typeof instance.getChildContext==='function'){!(typeof ctor.childContextTypes==='object')?warningWithoutStack$1(false,'%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',name):void 0;}}}function adoptClassInstance(workInProgress,instance){instance.updater=classComponentUpdater;workInProgress.stateNode=instance;// The instance needs access to the fiber so that it can schedule updates
set(instance,workInProgress);{instance._reactInternalInstance=fakeInternalInstance;}}function constructClassInstance(workInProgress,ctor,props,renderExpirationTime){var unmaskedContext=getUnmaskedContext(workInProgress,ctor,true);var contextTypes=ctor.contextTypes;var isContextConsumer=contextTypes!==null&&contextTypes!==undefined;var context=isContextConsumer?getMaskedContext(workInProgress,unmaskedContext):emptyContextObject;// Instantiate twice to help detect side-effects.
{if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){new ctor(props,context);// eslint-disable-line no-new
}}var instance=new ctor(props,context);var state=workInProgress.memoizedState=instance.state!==null&&instance.state!==undefined?instance.state:null;adoptClassInstance(workInProgress,instance);{if(typeof ctor.getDerivedStateFromProps==='function'&&state===null){var componentName=getComponentName(ctor)||'Component';if(!didWarnAboutUninitializedState.has(componentName)){didWarnAboutUninitializedState.add(componentName);warningWithoutStack$1(false,'`%s` uses `getDerivedStateFromProps` but its initial state is '+'%s. This is not recommended. Instead, define the initial state by '+'assigning an object to `this.state` in the constructor of `%s`. '+'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.',componentName,instance.state===null?'null':'undefined',componentName);}}// If new component APIs are defined, "unsafe" lifecycles won't be called.
// Warn about these lifecycles if they are present.
// Don't warn about react-lifecycles-compat polyfilled methods though.
if(typeof ctor.getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function'){var foundWillMountName=null;var foundWillReceivePropsName=null;var foundWillUpdateName=null;if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true){foundWillMountName='componentWillMount';}else if(typeof instance.UNSAFE_componentWillMount==='function'){foundWillMountName='UNSAFE_componentWillMount';}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true){foundWillReceivePropsName='componentWillReceiveProps';}else if(typeof instance.UNSAFE_componentWillReceiveProps==='function'){foundWillReceivePropsName='UNSAFE_componentWillReceiveProps';}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true){foundWillUpdateName='componentWillUpdate';}else if(typeof instance.UNSAFE_componentWillUpdate==='function'){foundWillUpdateName='UNSAFE_componentWillUpdate';}if(foundWillMountName!==null||foundWillReceivePropsName!==null||foundWillUpdateName!==null){var _componentName=getComponentName(ctor)||'Component';var newApiName=typeof ctor.getDerivedStateFromProps==='function'?'getDerivedStateFromProps()':'getSnapshotBeforeUpdate()';if(!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)){didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);warningWithoutStack$1(false,'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n'+'%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n'+'The above lifecycles should be removed. Learn more about this warning here:\n'+'https://fb.me/react-async-component-lifecycle-hooks',_componentName,newApiName,foundWillMountName!==null?'\n  '+foundWillMountName:'',foundWillReceivePropsName!==null?'\n  '+foundWillReceivePropsName:'',foundWillUpdateName!==null?'\n  '+foundWillUpdateName:'');}}}}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// ReactFiberContext usually updates this cache but can't for newly-created instances.
if(isContextConsumer){cacheContext(workInProgress,unmaskedContext,context);}return instance;}function callComponentWillMount(workInProgress,instance){startPhaseTimer(workInProgress,'componentWillMount');var oldState=instance.state;if(typeof instance.componentWillMount==='function'){instance.componentWillMount();}if(typeof instance.UNSAFE_componentWillMount==='function'){instance.UNSAFE_componentWillMount();}stopPhaseTimer();if(oldState!==instance.state){{warningWithoutStack$1(false,'%s.componentWillMount(): Assigning directly to this.state is '+"deprecated (except inside a component's "+'constructor). Use setState instead.',getComponentName(workInProgress.type)||'Component');}classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}}function callComponentWillReceiveProps(workInProgress,instance,newProps,nextLegacyContext){var oldState=instance.state;startPhaseTimer(workInProgress,'componentWillReceiveProps');if(typeof instance.componentWillReceiveProps==='function'){instance.componentWillReceiveProps(newProps,nextLegacyContext);}if(typeof instance.UNSAFE_componentWillReceiveProps==='function'){instance.UNSAFE_componentWillReceiveProps(newProps,nextLegacyContext);}stopPhaseTimer();if(instance.state!==oldState){{var componentName=getComponentName(workInProgress.type)||'Component';if(!didWarnAboutStateAssignmentForComponent.has(componentName)){didWarnAboutStateAssignmentForComponent.add(componentName);warningWithoutStack$1(false,'%s.componentWillReceiveProps(): Assigning directly to '+"this.state is deprecated (except inside a component's "+'constructor). Use setState instead.',componentName);}}classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}}// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress,ctor,newProps,renderExpirationTime){{checkClassInstance(workInProgress,ctor,newProps);}var instance=workInProgress.stateNode;var unmaskedContext=getUnmaskedContext(workInProgress,ctor,true);instance.props=newProps;instance.state=workInProgress.memoizedState;instance.refs=emptyRefsObject;instance.context=getMaskedContext(workInProgress,unmaskedContext);{if(instance.state===newProps){var componentName=getComponentName(ctor)||'Component';if(!didWarnAboutDirectlyAssigningPropsToState.has(componentName)){didWarnAboutDirectlyAssigningPropsToState.add(componentName);warningWithoutStack$1(false,'%s: It is not recommended to assign props directly to state '+"because updates to props won't be reflected in state. "+'In most cases, it is better to use props directly.',componentName);}}if(workInProgress.mode&StrictMode){ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress,instance);ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress,instance);}if(warnAboutDeprecatedLifecycles){ReactStrictModeWarnings.recordDeprecationWarnings(workInProgress,instance);}}var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,newProps,instance,renderExpirationTime);instance.state=workInProgress.memoizedState;}var getDerivedStateFromProps=ctor.getDerivedStateFromProps;if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,newProps);instance.state=workInProgress.memoizedState;}// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(typeof ctor.getDerivedStateFromProps!=='function'&&typeof instance.getSnapshotBeforeUpdate!=='function'&&(typeof instance.UNSAFE_componentWillMount==='function'||typeof instance.componentWillMount==='function')){callComponentWillMount(workInProgress,instance);// If we had additional state updates during this life-cycle, let's
// process them now.
updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,newProps,instance,renderExpirationTime);instance.state=workInProgress.memoizedState;}}if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}}function resumeMountClassInstance(workInProgress,ctor,newProps,renderExpirationTime){var instance=workInProgress.stateNode;var oldProps=workInProgress.memoizedProps;instance.props=oldProps;var oldContext=instance.context;var nextLegacyUnmaskedContext=getUnmaskedContext(workInProgress,ctor,true);var nextLegacyContext=getMaskedContext(workInProgress,nextLegacyUnmaskedContext);var getDerivedStateFromProps=ctor.getDerivedStateFromProps;var hasNewLifecycles=typeof getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function';// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillReceiveProps==='function'||typeof instance.componentWillReceiveProps==='function')){if(oldProps!==newProps||oldContext!==nextLegacyContext){callComponentWillReceiveProps(workInProgress,instance,newProps,nextLegacyContext);}}resetHasForceUpdateBeforeProcessing();var oldState=workInProgress.memoizedState;var newState=instance.state=oldState;var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,newProps,instance,renderExpirationTime);newState=workInProgress.memoizedState;}if(oldProps===newProps&&oldState===newState&&!hasContextChanged()&&!checkHasForceUpdateAfterProcessing()){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}return false;}if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,newProps);newState=workInProgress.memoizedState;}var shouldUpdate=checkHasForceUpdateAfterProcessing()||checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextLegacyContext);if(shouldUpdate){// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillMount==='function'||typeof instance.componentWillMount==='function')){startPhaseTimer(workInProgress,'componentWillMount');if(typeof instance.componentWillMount==='function'){instance.componentWillMount();}if(typeof instance.UNSAFE_componentWillMount==='function'){instance.UNSAFE_componentWillMount();}stopPhaseTimer();}if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}// If shouldComponentUpdate returned false, we should still update the
// memoized state to indicate that this work can be reused.
workInProgress.memoizedProps=newProps;workInProgress.memoizedState=newState;}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=nextLegacyContext;return shouldUpdate;}// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current,workInProgress,ctor,newProps,renderExpirationTime){var instance=workInProgress.stateNode;var oldProps=workInProgress.memoizedProps;instance.props=oldProps;var oldContext=instance.context;var nextLegacyUnmaskedContext=getUnmaskedContext(workInProgress,ctor,true);var nextLegacyContext=getMaskedContext(workInProgress,nextLegacyUnmaskedContext);var getDerivedStateFromProps=ctor.getDerivedStateFromProps;var hasNewLifecycles=typeof getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function';// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillReceiveProps==='function'||typeof instance.componentWillReceiveProps==='function')){if(oldProps!==newProps||oldContext!==nextLegacyContext){callComponentWillReceiveProps(workInProgress,instance,newProps,nextLegacyContext);}}resetHasForceUpdateBeforeProcessing();var oldState=workInProgress.memoizedState;var newState=instance.state=oldState;var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){processUpdateQueue(workInProgress,updateQueue,newProps,instance,renderExpirationTime);newState=workInProgress.memoizedState;}if(oldProps===newProps&&oldState===newState&&!hasContextChanged()&&!checkHasForceUpdateAfterProcessing()){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update;}}if(typeof instance.getSnapshotBeforeUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Snapshot;}}return false;}if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,newProps);newState=workInProgress.memoizedState;}var shouldUpdate=checkHasForceUpdateAfterProcessing()||checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextLegacyContext);if(shouldUpdate){// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillUpdate==='function'||typeof instance.componentWillUpdate==='function')){startPhaseTimer(workInProgress,'componentWillUpdate');if(typeof instance.componentWillUpdate==='function'){instance.componentWillUpdate(newProps,newState,nextLegacyContext);}if(typeof instance.UNSAFE_componentWillUpdate==='function'){instance.UNSAFE_componentWillUpdate(newProps,newState,nextLegacyContext);}stopPhaseTimer();}if(typeof instance.componentDidUpdate==='function'){workInProgress.effectTag|=Update;}if(typeof instance.getSnapshotBeforeUpdate==='function'){workInProgress.effectTag|=Snapshot;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update;}}if(typeof instance.getSnapshotBeforeUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Snapshot;}}// If shouldComponentUpdate returned false, we should still update the
// memoized props/state to indicate that this work can be reused.
workInProgress.memoizedProps=newProps;workInProgress.memoizedState=newState;}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=nextLegacyContext;return shouldUpdate;}var didWarnAboutMaps=void 0;var didWarnAboutGenerators=void 0;var didWarnAboutStringRefInStrictMode=void 0;var ownerHasKeyUseWarning=void 0;var ownerHasFunctionTypeWarning=void 0;var warnForMissingKey=function(child){};{didWarnAboutMaps=false;didWarnAboutGenerators=false;didWarnAboutStringRefInStrictMode={};/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */ownerHasKeyUseWarning={};ownerHasFunctionTypeWarning={};warnForMissingKey=function(child){if(child===null||typeof child!=='object'){return;}if(!child._store||child._store.validated||child.key!=null){return;}!(typeof child._store==='object')?invariant(false,'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.'):void 0;child._store.validated=true;var currentComponentErrorInfo='Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.'+getCurrentFiberStackInDev();if(ownerHasKeyUseWarning[currentComponentErrorInfo]){return;}ownerHasKeyUseWarning[currentComponentErrorInfo]=true;warning$1(false,'Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.');};}var isArray$1=Array.isArray;function coerceRef(returnFiber,current$$1,element){var mixedRef=element.ref;if(mixedRef!==null&&typeof mixedRef!=='function'&&typeof mixedRef!=='object'){{if(returnFiber.mode&StrictMode){var componentName=getComponentName(returnFiber.type)||'Component';if(!didWarnAboutStringRefInStrictMode[componentName]){warningWithoutStack$1(false,'A string ref, "%s", has been found within a strict mode tree. '+'String refs are a source of potential bugs and should be avoided. '+'We recommend using createRef() instead.'+'\n%s'+'\n\nLearn more about using refs safely here:'+'\nhttps://fb.me/react-strict-mode-string-ref',mixedRef,getStackByFiberInDevAndProd(returnFiber));didWarnAboutStringRefInStrictMode[componentName]=true;}}}if(element._owner){var owner=element._owner;var inst=void 0;if(owner){var ownerFiber=owner;!(ownerFiber.tag===ClassComponent||ownerFiber.tag===ClassComponentLazy)?invariant(false,'Stateless function components cannot have refs.'):void 0;inst=ownerFiber.stateNode;}!inst?invariant(false,'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.',mixedRef):void 0;var stringRef=''+mixedRef;// Check if previous string ref matches new string ref
if(current$$1!==null&&current$$1.ref!==null&&typeof current$$1.ref==='function'&&current$$1.ref._stringRef===stringRef){return current$$1.ref;}var ref=function(value){var refs=inst.refs;if(refs===emptyRefsObject){// This is a lazy pooled frozen object, so we need to initialize.
refs=inst.refs={};}if(value===null){delete refs[stringRef];}else{refs[stringRef]=value;}};ref._stringRef=stringRef;return ref;}else{!(typeof mixedRef==='string')?invariant(false,'Expected ref to be a function, a string, an object returned by React.createRef(), or null.'):void 0;!element._owner?invariant(false,'Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a functional component\n2. You may be adding a ref to a component that was not created inside a component\'s render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.',mixedRef):void 0;}}return mixedRef;}function throwOnInvalidObjectType(returnFiber,newChild){if(returnFiber.type!=='textarea'){var addendum='';{addendum=' If you meant to render a collection of children, use an array '+'instead.'+getCurrentFiberStackInDev();}invariant(false,'Objects are not valid as a React child (found: %s).%s',Object.prototype.toString.call(newChild)==='[object Object]'?'object with keys {'+Object.keys(newChild).join(', ')+'}':newChild,addendum);}}function warnOnFunctionType(){var currentComponentErrorInfo='Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.'+getCurrentFiberStackInDev();if(ownerHasFunctionTypeWarning[currentComponentErrorInfo]){return;}ownerHasFunctionTypeWarning[currentComponentErrorInfo]=true;warning$1(false,'Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.');}// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects){function deleteChild(returnFiber,childToDelete){if(!shouldTrackSideEffects){// Noop.
return;}// Deletions are added in reversed order so we add it to the front.
// At this point, the return fiber's effect list is empty except for
// deletions, so we can just append the deletion to the list. The remaining
// effects aren't added until the complete phase. Once we implement
// resuming, this may not be true.
var last=returnFiber.lastEffect;if(last!==null){last.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}childToDelete.nextEffect=null;childToDelete.effectTag=Deletion;}function deleteRemainingChildren(returnFiber,currentFirstChild){if(!shouldTrackSideEffects){// Noop.
return null;}// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var childToDelete=currentFirstChild;while(childToDelete!==null){deleteChild(returnFiber,childToDelete);childToDelete=childToDelete.sibling;}return null;}function mapRemainingChildren(returnFiber,currentFirstChild){// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
var existingChildren=new Map();var existingChild=currentFirstChild;while(existingChild!==null){if(existingChild.key!==null){existingChildren.set(existingChild.key,existingChild);}else{existingChildren.set(existingChild.index,existingChild);}existingChild=existingChild.sibling;}return existingChildren;}function useFiber(fiber,pendingProps,expirationTime){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
var clone=createWorkInProgress(fiber,pendingProps,expirationTime);clone.index=0;clone.sibling=null;return clone;}function placeChild(newFiber,lastPlacedIndex,newIndex){newFiber.index=newIndex;if(!shouldTrackSideEffects){// Noop.
return lastPlacedIndex;}var current$$1=newFiber.alternate;if(current$$1!==null){var oldIndex=current$$1.index;if(oldIndex<lastPlacedIndex){// This is a move.
newFiber.effectTag=Placement;return lastPlacedIndex;}else{// This item can stay in place.
return oldIndex;}}else{// This is an insertion.
newFiber.effectTag=Placement;return lastPlacedIndex;}}function placeSingleChild(newFiber){// This is simpler for the single child case. We only need to do a
// placement for inserting new children.
if(shouldTrackSideEffects&&newFiber.alternate===null){newFiber.effectTag=Placement;}return newFiber;}function updateTextNode(returnFiber,current$$1,textContent,expirationTime){if(current$$1===null||current$$1.tag!==HostText){// Insert
var created=createFiberFromText(textContent,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current$$1,textContent,expirationTime);existing.return=returnFiber;return existing;}}function updateElement(returnFiber,current$$1,element,expirationTime){if(current$$1!==null&&current$$1.type===element.type){// Move based on index
var existing=useFiber(current$$1,element.props,expirationTime);existing.ref=coerceRef(returnFiber,current$$1,element);existing.return=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{// Insert
var created=createFiberFromElement(element,returnFiber.mode,expirationTime);created.ref=coerceRef(returnFiber,current$$1,element);created.return=returnFiber;return created;}}function updatePortal(returnFiber,current$$1,portal,expirationTime){if(current$$1===null||current$$1.tag!==HostPortal||current$$1.stateNode.containerInfo!==portal.containerInfo||current$$1.stateNode.implementation!==portal.implementation){// Insert
var created=createFiberFromPortal(portal,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current$$1,portal.children||[],expirationTime);existing.return=returnFiber;return existing;}}function updateFragment(returnFiber,current$$1,fragment,expirationTime,key){if(current$$1===null||current$$1.tag!==Fragment){// Insert
var created=createFiberFromFragment(fragment,returnFiber.mode,expirationTime,key);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current$$1,fragment,expirationTime);existing.return=returnFiber;return existing;}}function createChild(returnFiber,newChild,expirationTime){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var created=createFiberFromText(''+newChild,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}if(typeof newChild==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _created=createFiberFromElement(newChild,returnFiber.mode,expirationTime);_created.ref=coerceRef(returnFiber,null,newChild);_created.return=returnFiber;return _created;}case REACT_PORTAL_TYPE:{var _created2=createFiberFromPortal(newChild,returnFiber.mode,expirationTime);_created2.return=returnFiber;return _created2;}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _created3=createFiberFromFragment(newChild,returnFiber.mode,expirationTime,null);_created3.return=returnFiber;return _created3;}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateSlot(returnFiber,oldFiber,newChild,expirationTime){// Update the fiber if the keys match, otherwise return null.
var key=oldFiber!==null?oldFiber.key:null;if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
if(key!==null){return null;}return updateTextNode(returnFiber,oldFiber,''+newChild,expirationTime);}if(typeof newChild==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{if(newChild.key===key){if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,oldFiber,newChild.props.children,expirationTime,key);}return updateElement(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}case REACT_PORTAL_TYPE:{if(newChild.key===key){return updatePortal(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}}if(isArray$1(newChild)||getIteratorFn(newChild)){if(key!==null){return null;}return updateFragment(returnFiber,oldFiber,newChild,expirationTime,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateFromMap(existingChildren,returnFiber,newIdx,newChild,expirationTime){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys, so we neither have to check the old nor
// new node for the key. If both are text nodes, they match.
var matchedFiber=existingChildren.get(newIdx)||null;return updateTextNode(returnFiber,matchedFiber,''+newChild,expirationTime);}if(typeof newChild==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _matchedFiber=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,_matchedFiber,newChild.props.children,expirationTime,newChild.key);}return updateElement(returnFiber,_matchedFiber,newChild,expirationTime);}case REACT_PORTAL_TYPE:{var _matchedFiber2=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updatePortal(returnFiber,_matchedFiber2,newChild,expirationTime);}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _matchedFiber3=existingChildren.get(newIdx)||null;return updateFragment(returnFiber,_matchedFiber3,newChild,expirationTime,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}/**
   * Warns if there is a duplicate or missing key
   */function warnOnInvalidKey(child,knownKeys){{if(typeof child!=='object'||child===null){return knownKeys;}switch(child.$$typeof){case REACT_ELEMENT_TYPE:case REACT_PORTAL_TYPE:warnForMissingKey(child);var key=child.key;if(typeof key!=='string'){break;}if(knownKeys===null){knownKeys=new Set();knownKeys.add(key);break;}if(!knownKeys.has(key)){knownKeys.add(key);break;}warning$1(false,'Encountered two children with the same key, `%s`. '+'Keys should be unique so that components maintain their identity '+'across updates. Non-unique keys may cause children to be '+'duplicated and/or omitted — the behavior is unsupported and '+'could change in a future version.',key);break;default:break;}}return knownKeys;}function reconcileChildrenArray(returnFiber,currentFirstChild,newChildren,expirationTime){// This algorithm can't optimize by searching from boths ends since we
// don't have backpointers on fibers. I'm trying to see how far we can get
// with that model. If it ends up not being worth the tradeoffs, we can
// add it later.
// Even with a two ended optimization, we'd want to optimize for the case
// where there are few changes and brute force the comparison instead of
// going for the Map. It'd like to explore hitting that path first in
// forward-only mode and only go for the Map once we notice that we need
// lots of look ahead. This doesn't handle reversal as well as two ended
// search but that's unusual. Besides, for the two ended optimization to
// work on Iterables, we'd need to copy the whole set.
// In this first iteration, we'll just live with hitting the bad case
// (adding everything to a Map) in for every insert/move.
// If you change this code, also update reconcileChildrenIterator() which
// uses the same algorithm.
{// First, validate keys.
var knownKeys=null;for(var i=0;i<newChildren.length;i++){var child=newChildren[i];knownKeys=warnOnInvalidKey(child,knownKeys);}}var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;for(;oldFiber!==null&&newIdx<newChildren.length;newIdx++){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx],expirationTime);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(oldFiber===null){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(newIdx===newChildren.length){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;newIdx<newChildren.length;newIdx++){var _newFiber=createChild(returnFiber,newChildren[newIdx],expirationTime);if(!_newFiber){continue;}lastPlacedIndex=placeChild(_newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber;}else{previousNewFiber.sibling=_newFiber;}previousNewFiber=_newFiber;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;newIdx<newChildren.length;newIdx++){var _newFiber2=updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx],expirationTime);if(_newFiber2){if(shouldTrackSideEffects){if(_newFiber2.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren.delete(_newFiber2.key===null?newIdx:_newFiber2.key);}}lastPlacedIndex=placeChild(_newFiber2,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber2;}else{previousNewFiber.sibling=_newFiber2;}previousNewFiber=_newFiber2;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileChildrenIterator(returnFiber,currentFirstChild,newChildrenIterable,expirationTime){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var iteratorFn=getIteratorFn(newChildrenIterable);!(typeof iteratorFn==='function')?invariant(false,'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.'):void 0;{// We don't support rendering Generators because it's a mutation.
// See https://github.com/facebook/react/issues/12995
if(typeof Symbol==='function'&&// $FlowFixMe Flow doesn't know about toStringTag
newChildrenIterable[Symbol.toStringTag]==='Generator'){!didWarnAboutGenerators?warning$1(false,'Using Generators as children is unsupported and will likely yield '+'unexpected results because enumerating a generator mutates it. '+'You may convert it to an array with `Array.from()` or the '+'`[...spread]` operator before rendering. Keep in mind '+'you might need to polyfill these features for older browsers.'):void 0;didWarnAboutGenerators=true;}// Warn about using Maps as children
if(newChildrenIterable.entries===iteratorFn){!didWarnAboutMaps?warning$1(false,'Using Maps as children is unsupported and will likely yield '+'unexpected results. Convert it to a sequence/iterable of keyed '+'ReactElements instead.'):void 0;didWarnAboutMaps=true;}// First, validate keys.
// We'll get a different iterator later for the main pass.
var _newChildren=iteratorFn.call(newChildrenIterable);if(_newChildren){var knownKeys=null;var _step=_newChildren.next();for(;!_step.done;_step=_newChildren.next()){var child=_step.value;knownKeys=warnOnInvalidKey(child,knownKeys);}}}var newChildren=iteratorFn.call(newChildrenIterable);!(newChildren!=null)?invariant(false,'An iterable object provided no iterator.'):void 0;var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;var step=newChildren.next();for(;oldFiber!==null&&!step.done;newIdx++,step=newChildren.next()){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,step.value,expirationTime);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(!oldFiber){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(step.done){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber3=createChild(returnFiber,step.value,expirationTime);if(_newFiber3===null){continue;}lastPlacedIndex=placeChild(_newFiber3,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber3;}else{previousNewFiber.sibling=_newFiber3;}previousNewFiber=_newFiber3;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber4=updateFromMap(existingChildren,returnFiber,newIdx,step.value,expirationTime);if(_newFiber4!==null){if(shouldTrackSideEffects){if(_newFiber4.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren.delete(_newFiber4.key===null?newIdx:_newFiber4.key);}}lastPlacedIndex=placeChild(_newFiber4,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber4;}else{previousNewFiber.sibling=_newFiber4;}previousNewFiber=_newFiber4;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileSingleTextNode(returnFiber,currentFirstChild,textContent,expirationTime){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(currentFirstChild!==null&&currentFirstChild.tag===HostText){// We already have an existing node so let's just update it and delete
// the rest.
deleteRemainingChildren(returnFiber,currentFirstChild.sibling);var existing=useFiber(currentFirstChild,textContent,expirationTime);existing.return=returnFiber;return existing;}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
deleteRemainingChildren(returnFiber,currentFirstChild);var created=createFiberFromText(textContent,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}function reconcileSingleElement(returnFiber,currentFirstChild,element,expirationTime){var key=element.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===Fragment?element.type===REACT_FRAGMENT_TYPE:child.type===element.type){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,element.type===REACT_FRAGMENT_TYPE?element.props.children:element.props,expirationTime);existing.ref=coerceRef(returnFiber,child,element);existing.return=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}if(element.type===REACT_FRAGMENT_TYPE){var created=createFiberFromFragment(element.props.children,returnFiber.mode,expirationTime,element.key);created.return=returnFiber;return created;}else{var _created4=createFiberFromElement(element,returnFiber.mode,expirationTime);_created4.ref=coerceRef(returnFiber,currentFirstChild,element);_created4.return=returnFiber;return _created4;}}function reconcileSinglePortal(returnFiber,currentFirstChild,portal,expirationTime){var key=portal.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===HostPortal&&child.stateNode.containerInfo===portal.containerInfo&&child.stateNode.implementation===portal.implementation){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,portal.children||[],expirationTime);existing.return=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromPortal(portal,returnFiber.mode,expirationTime);created.return=returnFiber;return created;}// This API will tag the children with the side-effect of the reconciliation
// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function reconcileChildFibers(returnFiber,currentFirstChild,newChild,expirationTime){// This function is not recursive.
// If the top level item is an array, we treat it as a set of children,
// not as a fragment. Nested arrays on the other hand will be treated as
// fragment nodes. Recursion happens at the normal flow.
// Handle top level unkeyed fragments as if they were arrays.
// This leads to an ambiguity between <>{[...]}</> and <>...</>.
// We treat the ambiguous cases above the same.
var isUnkeyedTopLevelFragment=typeof newChild==='object'&&newChild!==null&&newChild.type===REACT_FRAGMENT_TYPE&&newChild.key===null;if(isUnkeyedTopLevelFragment){newChild=newChild.props.children;}// Handle object types
var isObject=typeof newChild==='object'&&newChild!==null;if(isObject){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstChild,newChild,expirationTime));case REACT_PORTAL_TYPE:return placeSingleChild(reconcileSinglePortal(returnFiber,currentFirstChild,newChild,expirationTime));}}if(typeof newChild==='string'||typeof newChild==='number'){return placeSingleChild(reconcileSingleTextNode(returnFiber,currentFirstChild,''+newChild,expirationTime));}if(isArray$1(newChild)){return reconcileChildrenArray(returnFiber,currentFirstChild,newChild,expirationTime);}if(getIteratorFn(newChild)){return reconcileChildrenIterator(returnFiber,currentFirstChild,newChild,expirationTime);}if(isObject){throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}if(typeof newChild==='undefined'&&!isUnkeyedTopLevelFragment){// If the new child is undefined, and the return fiber is a composite
// component, throw an error. If Fiber return types are disabled,
// we already threw above.
switch(returnFiber.tag){case ClassComponent:case ClassComponentLazy:{{var instance=returnFiber.stateNode;if(instance.render._isMockFunction){// We allow auto-mocks to proceed as if they're returning null.
break;}}}// Intentionally fall through to the next case, which handles both
// functions and classes
// eslint-disable-next-lined no-fallthrough
case FunctionalComponent:{var Component=returnFiber.type;invariant(false,'%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.',Component.displayName||Component.name||'Component');}}}// Remaining cases are all treated as empty.
return deleteRemainingChildren(returnFiber,currentFirstChild);}return reconcileChildFibers;}var reconcileChildFibers=ChildReconciler(true);var mountChildFibers=ChildReconciler(false);function cloneChildFibers(current$$1,workInProgress){!(current$$1===null||workInProgress.child===current$$1.child)?invariant(false,'Resuming work not yet implemented.'):void 0;if(workInProgress.child===null){return;}var currentChild=workInProgress.child;var newChild=createWorkInProgress(currentChild,currentChild.pendingProps,currentChild.expirationTime);workInProgress.child=newChild;newChild.return=workInProgress;while(currentChild.sibling!==null){currentChild=currentChild.sibling;newChild=newChild.sibling=createWorkInProgress(currentChild,currentChild.pendingProps,currentChild.expirationTime);newChild.return=workInProgress;}newChild.sibling=null;}// The deepest Fiber on the stack involved in a hydration context.
// This may have been an insertion or a hydration.
var hydrationParentFiber=null;var nextHydratableInstance=null;var isHydrating=false;function enterHydrationState(fiber){if(!supportsHydration){return false;}var parentInstance=fiber.stateNode.containerInfo;nextHydratableInstance=getFirstHydratableChild(parentInstance);hydrationParentFiber=fiber;isHydrating=true;return true;}function deleteHydratableInstance(returnFiber,instance){{switch(returnFiber.tag){case HostRoot:didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo,instance);break;case HostComponent:didNotHydrateInstance(returnFiber.type,returnFiber.memoizedProps,returnFiber.stateNode,instance);break;}}var childToDelete=createFiberFromHostInstanceForDeletion();childToDelete.stateNode=instance;childToDelete.return=returnFiber;childToDelete.effectTag=Deletion;// This might seem like it belongs on progressedFirstDeletion. However,
// these children are not part of the reconciliation list of children.
// Even if we abort and rereconcile the children, that will try to hydrate
// again and the nodes are still in the host tree so these will be
// recreated.
if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}}function insertNonHydratedInstance(returnFiber,fiber){fiber.effectTag|=Placement;{switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;switch(fiber.tag){case HostComponent:var type=fiber.type;var props=fiber.pendingProps;didNotFindHydratableContainerInstance(parentContainer,type,props);break;case HostText:var text=fiber.pendingProps;didNotFindHydratableContainerTextInstance(parentContainer,text);break;}break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;switch(fiber.tag){case HostComponent:var _type=fiber.type;var _props=fiber.pendingProps;didNotFindHydratableInstance(parentType,parentProps,parentInstance,_type,_props);break;case HostText:var _text=fiber.pendingProps;didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,_text);break;}break;}default:return;}}}function tryHydrate(fiber,nextInstance){switch(fiber.tag){case HostComponent:{var type=fiber.type;var props=fiber.pendingProps;var instance=canHydrateInstance(nextInstance,type,props);if(instance!==null){fiber.stateNode=instance;return true;}return false;}case HostText:{var text=fiber.pendingProps;var textInstance=canHydrateTextInstance(nextInstance,text);if(textInstance!==null){fiber.stateNode=textInstance;return true;}return false;}default:return false;}}function tryToClaimNextHydratableInstance(fiber){if(!isHydrating){return;}var nextInstance=nextHydratableInstance;if(!nextInstance){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}var firstAttemptedInstance=nextInstance;if(!tryHydrate(fiber,nextInstance)){// If we can't hydrate this instance let's try the next one.
// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
nextInstance=getNextHydratableSibling(firstAttemptedInstance);if(!nextInstance||!tryHydrate(fiber,nextInstance)){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
deleteHydratableInstance(hydrationParentFiber,firstAttemptedInstance);}hydrationParentFiber=fiber;nextHydratableInstance=getFirstHydratableChild(nextInstance);}function prepareToHydrateHostInstance(fiber,rootContainerInstance,hostContext){if(!supportsHydration){invariant(false,'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');}var instance=fiber.stateNode;var updatePayload=hydrateInstance(instance,fiber.type,fiber.memoizedProps,rootContainerInstance,hostContext,fiber);// TODO: Type this specific to this type of component.
fiber.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update.
if(updatePayload!==null){return true;}return false;}function prepareToHydrateHostTextInstance(fiber){if(!supportsHydration){invariant(false,'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');}var textInstance=fiber.stateNode;var textContent=fiber.memoizedProps;var shouldUpdate=hydrateTextInstance(textInstance,textContent,fiber);{if(shouldUpdate){// We assume that prepareToHydrateHostTextInstance is called in a context where the
// hydration parent is the parent host component of this host text.
var returnFiber=hydrationParentFiber;if(returnFiber!==null){switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,textContent);break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,textContent);break;}}}}}return shouldUpdate;}function popToNextHostParent(fiber){var parent=fiber.return;while(parent!==null&&parent.tag!==HostComponent&&parent.tag!==HostRoot){parent=parent.return;}hydrationParentFiber=parent;}function popHydrationState(fiber){if(!supportsHydration){return false;}if(fiber!==hydrationParentFiber){// We're deeper than the current hydration context, inside an inserted
// tree.
return false;}if(!isHydrating){// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
popToNextHostParent(fiber);isHydrating=true;return false;}var type=fiber.type;// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them.
// TODO: Better heuristic.
if(fiber.tag!==HostComponent||type!=='head'&&type!=='body'&&!shouldSetTextContent(type,fiber.memoizedProps)){var nextInstance=nextHydratableInstance;while(nextInstance){deleteHydratableInstance(fiber,nextInstance);nextInstance=getNextHydratableSibling(nextInstance);}}popToNextHostParent(fiber);nextHydratableInstance=hydrationParentFiber?getNextHydratableSibling(fiber.stateNode):null;return true;}function resetHydrationState(){if(!supportsHydration){return;}hydrationParentFiber=null;nextHydratableInstance=null;isHydrating=false;}function readLazyComponentType(thenable){var status=thenable._reactStatus;switch(status){case Resolved:var Component=thenable._reactResult;return Component;case Rejected:throw thenable._reactResult;case Pending:throw thenable;default:{thenable._reactStatus=Pending;thenable.then(function(resolvedValue){if(thenable._reactStatus===Pending){thenable._reactStatus=Resolved;if(typeof resolvedValue==='object'&&resolvedValue!==null){// If the `default` property is not empty, assume it's the result
// of an async import() and use that. Otherwise, use the
// resolved value itself.
var defaultExport=resolvedValue.default;resolvedValue=defaultExport!==undefined&&defaultExport!==null?defaultExport:resolvedValue;}else{resolvedValue=resolvedValue;}thenable._reactResult=resolvedValue;}},function(error){if(thenable._reactStatus===Pending){thenable._reactStatus=Rejected;thenable._reactResult=error;}});throw thenable;}}}var ReactCurrentOwner$3=ReactSharedInternals.ReactCurrentOwner;var didWarnAboutBadClass=void 0;var didWarnAboutGetDerivedStateOnFunctionalComponent=void 0;var didWarnAboutStatelessRefs=void 0;{didWarnAboutBadClass={};didWarnAboutGetDerivedStateOnFunctionalComponent={};didWarnAboutStatelessRefs={};}function reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime){if(current$$1===null){// If this is a fresh new component that hasn't been rendered yet, we
// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
workInProgress.child=mountChildFibers(workInProgress,null,nextChildren,renderExpirationTime);}else{// If the current child is the same as the work in progress, it means that
// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
workInProgress.child=reconcileChildFibers(workInProgress,current$$1.child,nextChildren,renderExpirationTime);}}function updateForwardRef(current$$1,workInProgress,type,nextProps,renderExpirationTime){var render=type.render;var ref=workInProgress.ref;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(workInProgress.memoizedProps===nextProps){var currentRef=current$$1!==null?current$$1.ref:null;if(ref===currentRef){return bailoutOnAlreadyFinishedWork(current$$1,workInProgress,renderExpirationTime);}}var nextChildren=void 0;{ReactCurrentOwner$3.current=workInProgress;setCurrentPhase('render');nextChildren=render(nextProps,ref);setCurrentPhase(null);}reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateFragment(current$$1,workInProgress,renderExpirationTime){var nextChildren=workInProgress.pendingProps;reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextChildren);return workInProgress.child;}function updateMode(current$$1,workInProgress,renderExpirationTime){var nextChildren=workInProgress.pendingProps.children;reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextChildren);return workInProgress.child;}function updateProfiler(current$$1,workInProgress,renderExpirationTime){if(enableProfilerTimer){workInProgress.effectTag|=Update;}var nextProps=workInProgress.pendingProps;var nextChildren=nextProps.children;reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function markRef(current$$1,workInProgress){var ref=workInProgress.ref;if(current$$1===null&&ref!==null||current$$1!==null&&current$$1.ref!==ref){// Schedule a Ref effect
workInProgress.effectTag|=Ref;}}function updateFunctionalComponent(current$$1,workInProgress,Component,nextProps,renderExpirationTime){var unmaskedContext=getUnmaskedContext(workInProgress,Component,true);var context=getMaskedContext(workInProgress,unmaskedContext);var nextChildren=void 0;prepareToReadContext(workInProgress,renderExpirationTime);{ReactCurrentOwner$3.current=workInProgress;setCurrentPhase('render');nextChildren=Component(nextProps,context);setCurrentPhase(null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateClassComponent(current$$1,workInProgress,Component,nextProps,renderExpirationTime){// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=void 0;if(isContextProvider(Component)){hasContext=true;pushContextProvider(workInProgress);}else{hasContext=false;}prepareToReadContext(workInProgress,renderExpirationTime);var shouldUpdate=void 0;if(current$$1===null){if(workInProgress.stateNode===null){// In the initial pass we might need to construct the instance.
constructClassInstance(workInProgress,Component,nextProps,renderExpirationTime);mountClassInstance(workInProgress,Component,nextProps,renderExpirationTime);shouldUpdate=true;}else{// In a resume, we'll already have an instance we can reuse.
shouldUpdate=resumeMountClassInstance(workInProgress,Component,nextProps,renderExpirationTime);}}else{shouldUpdate=updateClassInstance(current$$1,workInProgress,Component,nextProps,renderExpirationTime);}return finishClassComponent(current$$1,workInProgress,Component,shouldUpdate,hasContext,renderExpirationTime);}function finishClassComponent(current$$1,workInProgress,Component,shouldUpdate,hasContext,renderExpirationTime){// Refs should update even if shouldComponentUpdate returns false
markRef(current$$1,workInProgress);var didCaptureError=(workInProgress.effectTag&DidCapture)!==NoEffect;if(!shouldUpdate&&!didCaptureError){// Context providers should defer to sCU for rendering
if(hasContext){invalidateContextProvider(workInProgress,Component,false);}return bailoutOnAlreadyFinishedWork(current$$1,workInProgress,renderExpirationTime);}var instance=workInProgress.stateNode;// Rerender
ReactCurrentOwner$3.current=workInProgress;var nextChildren=void 0;if(didCaptureError&&(!enableGetDerivedStateFromCatch||typeof Component.getDerivedStateFromCatch!=='function')){// If we captured an error, but getDerivedStateFrom catch is not defined,
// unmount all the children. componentDidCatch will schedule an update to
// re-render a fallback. This is temporary until we migrate everyone to
// the new API.
// TODO: Warn in a future release.
nextChildren=null;if(enableProfilerTimer){stopProfilerTimerIfRunning(workInProgress);}}else{{setCurrentPhase('render');nextChildren=instance.render();if(debugRenderPhaseSideEffects||debugRenderPhaseSideEffectsForStrictMode&&workInProgress.mode&StrictMode){instance.render();}setCurrentPhase(null);}}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;if(current$$1!==null&&didCaptureError){// If we're recovering from an error, reconcile twice: first to delete
// all the existing children.
reconcileChildren(current$$1,workInProgress,null,renderExpirationTime);workInProgress.child=null;// Now we can continue reconciling like normal. This has the effect of
// remounting all children regardless of whether their their
// identity matches.
}reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);// Memoize props and state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
memoizeState(workInProgress,instance.state);memoizeProps(workInProgress,instance.props);// The context might have changed so we need to recalculate it.
if(hasContext){invalidateContextProvider(workInProgress,Component,true);}return workInProgress.child;}function pushHostRootContext(workInProgress){var root=workInProgress.stateNode;if(root.pendingContext){pushTopLevelContextObject(workInProgress,root.pendingContext,root.pendingContext!==root.context);}else if(root.context){// Should always be set
pushTopLevelContextObject(workInProgress,root.context,false);}pushHostContainer(workInProgress,root.containerInfo);}function updateHostRoot(current$$1,workInProgress,renderExpirationTime){pushHostRootContext(workInProgress);var updateQueue=workInProgress.updateQueue;!(updateQueue!==null)?invariant(false,'If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue.'):void 0;var nextProps=workInProgress.pendingProps;var prevState=workInProgress.memoizedState;var prevChildren=prevState!==null?prevState.element:null;processUpdateQueue(workInProgress,updateQueue,nextProps,null,renderExpirationTime);var nextState=workInProgress.memoizedState;// Caution: React DevTools currently depends on this property
// being called "element".
var nextChildren=nextState.element;if(nextChildren===prevChildren){// If the state is the same as before, that's a bailout because we had
// no work that expires at this time.
resetHydrationState();return bailoutOnAlreadyFinishedWork(current$$1,workInProgress,renderExpirationTime);}var root=workInProgress.stateNode;if((current$$1===null||current$$1.child===null)&&root.hydrate&&enterHydrationState(workInProgress)){// If we don't have any current children this might be the first pass.
// We always try to hydrate. If this isn't a hydration pass there won't
// be any children to hydrate which is effectively the same thing as
// not hydrating.
// This is a bit of a hack. We track the host root as a placement to
// know that we're currently in a mounting state. That way isMounted
// works as expected. We must reset this before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag|=Placement;// Ensure that children mount into this root without tracking
// side-effects. This ensures that we don't store Placement effects on
// nodes that will be hydrated.
workInProgress.child=mountChildFibers(workInProgress,null,nextChildren,renderExpirationTime);}else{// Otherwise reset hydration state in case we aborted and resumed another
// root.
reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);resetHydrationState();}return workInProgress.child;}function updateHostComponent(current$$1,workInProgress,renderExpirationTime){pushHostContext(workInProgress);if(current$$1===null){tryToClaimNextHydratableInstance(workInProgress);}var type=workInProgress.type;var nextProps=workInProgress.pendingProps;var prevProps=current$$1!==null?current$$1.memoizedProps:null;var nextChildren=nextProps.children;var isDirectTextChild=shouldSetTextContent(type,nextProps);if(isDirectTextChild){// We special case a direct text child of a host node. This is a common
// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also have access to this prop. That
// avoids allocating another HostText fiber and traversing it.
nextChildren=null;}else if(prevProps!==null&&shouldSetTextContent(type,prevProps)){// If we're switching from a direct text child to a normal child, or to
// empty, we need to schedule the text content to be reset.
workInProgress.effectTag|=ContentReset;}markRef(current$$1,workInProgress);// Check the host config to see if the children are offscreen/hidden.
if(renderExpirationTime!==Never&&workInProgress.mode&AsyncMode&&shouldDeprioritizeSubtree(type,nextProps)){// Schedule this fiber to re-render at offscreen priority. Then bailout.
workInProgress.expirationTime=Never;workInProgress.memoizedProps=nextProps;return null;}reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateHostText(current$$1,workInProgress){if(current$$1===null){tryToClaimNextHydratableInstance(workInProgress);}var nextProps=workInProgress.pendingProps;memoizeProps(workInProgress,nextProps);// Nothing to do here. This is terminal. We'll do the completion step
// immediately after.
return null;}function resolveDefaultProps(Component,baseProps){if(Component&&Component.defaultProps){// Resolve default props. Taken from ReactElement
var props=_assign({},baseProps);var defaultProps=Component.defaultProps;for(var propName in defaultProps){if(props[propName]===undefined){props[propName]=defaultProps[propName];}}return props;}return baseProps;}function mountIndeterminateComponent(current$$1,workInProgress,Component,renderExpirationTime){!(current$$1===null)?invariant(false,'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.'):void 0;var props=workInProgress.pendingProps;if(typeof Component==='object'&&Component!==null&&typeof Component.then==='function'){Component=readLazyComponentType(Component);var resolvedTag=workInProgress.tag=resolveLazyComponentTag(workInProgress,Component);var resolvedProps=resolveDefaultProps(Component,props);switch(resolvedTag){case FunctionalComponentLazy:{return updateFunctionalComponent(current$$1,workInProgress,Component,resolvedProps,renderExpirationTime);}case ClassComponentLazy:{return updateClassComponent(current$$1,workInProgress,Component,resolvedProps,renderExpirationTime);}case ForwardRefLazy:{return updateForwardRef(current$$1,workInProgress,Component,resolvedProps,renderExpirationTime);}default:{// This message intentionally doesn't metion ForwardRef because the
// fact that it's a separate type of work is an implementation detail.
invariant(false,'Element type is invalid. Received a promise that resolves to: %s. Promise elements must resolve to a class or function.',Component);}}}var unmaskedContext=getUnmaskedContext(workInProgress,Component,false);var context=getMaskedContext(workInProgress,unmaskedContext);prepareToReadContext(workInProgress,renderExpirationTime);var value=void 0;{if(Component.prototype&&typeof Component.prototype.render==='function'){var componentName=getComponentName(Component)||'Unknown';if(!didWarnAboutBadClass[componentName]){warningWithoutStack$1(false,"The <%s /> component appears to have a render method, but doesn't extend React.Component. "+'This is likely to cause errors. Change %s to extend React.Component instead.',componentName,componentName);didWarnAboutBadClass[componentName]=true;}}if(workInProgress.mode&StrictMode){ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress,null);}ReactCurrentOwner$3.current=workInProgress;value=Component(props,context);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;if(typeof value==='object'&&value!==null&&typeof value.render==='function'&&value.$$typeof===undefined){// Proceed under the assumption that this is a class instance
workInProgress.tag=ClassComponent;// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=false;if(isContextProvider(Component)){hasContext=true;pushContextProvider(workInProgress);}else{hasContext=false;}workInProgress.memoizedState=value.state!==null&&value.state!==undefined?value.state:null;var getDerivedStateFromProps=Component.getDerivedStateFromProps;if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,Component,getDerivedStateFromProps,props);}adoptClassInstance(workInProgress,value);mountClassInstance(workInProgress,Component,props,renderExpirationTime);return finishClassComponent(current$$1,workInProgress,Component,true,hasContext,renderExpirationTime);}else{// Proceed under the assumption that this is a functional component
workInProgress.tag=FunctionalComponent;{if(Component){!!Component.childContextTypes?warningWithoutStack$1(false,'%s(...): childContextTypes cannot be defined on a functional component.',Component.displayName||Component.name||'Component'):void 0;}if(workInProgress.ref!==null){var info='';var ownerName=getCurrentFiberOwnerNameInDevOrNull();if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}var warningKey=ownerName||workInProgress._debugID||'';var debugSource=workInProgress._debugSource;if(debugSource){warningKey=debugSource.fileName+':'+debugSource.lineNumber;}if(!didWarnAboutStatelessRefs[warningKey]){didWarnAboutStatelessRefs[warningKey]=true;warning$1(false,'Stateless function components cannot be given refs. '+'Attempts to access this ref will fail.%s',info);}}if(typeof Component.getDerivedStateFromProps==='function'){var _componentName=getComponentName(Component)||'Unknown';if(!didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]){warningWithoutStack$1(false,'%s: Stateless functional components do not support getDerivedStateFromProps.',_componentName);didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]=true;}}}reconcileChildren(current$$1,workInProgress,value,renderExpirationTime);memoizeProps(workInProgress,props);return workInProgress.child;}}function updatePlaceholderComponent(current$$1,workInProgress,renderExpirationTime){if(enableSuspense){var nextProps=workInProgress.pendingProps;// Check if we already attempted to render the normal state. If we did,
// and we timed out, render the placeholder state.
var alreadyCaptured=(workInProgress.effectTag&DidCapture)===NoEffect;var nextDidTimeout=void 0;if(current$$1!==null&&workInProgress.updateQueue!==null){// We're outside strict mode. Something inside this Placeholder boundary
// suspended during the last commit. Switch to the placholder.
workInProgress.updateQueue=null;nextDidTimeout=true;// If we're recovering from an error, reconcile twice: first to delete
// all the existing children.
reconcileChildren(current$$1,workInProgress,null,renderExpirationTime);current$$1.child=null;// Now we can continue reconciling like normal. This has the effect of
// remounting all children regardless of whether their their
// identity matches.
}else{nextDidTimeout=!alreadyCaptured;}if((workInProgress.mode&StrictMode)!==NoEffect){if(nextDidTimeout){// If the timed-out view commits, schedule an update effect to record
// the committed time.
workInProgress.effectTag|=Update;}else{// The state node points to the time at which placeholder timed out.
// We can clear it once we switch back to the normal children.
workInProgress.stateNode=null;}}// If the `children` prop is a function, treat it like a render prop.
// TODO: This is temporary until we finalize a lower level API.
var children=nextProps.children;var nextChildren=void 0;if(typeof children==='function'){nextChildren=children(nextDidTimeout);}else{nextChildren=nextDidTimeout?nextProps.fallback:children;}workInProgress.memoizedProps=nextProps;workInProgress.memoizedState=nextDidTimeout;reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);return workInProgress.child;}else{return null;}}function updatePortalComponent(current$$1,workInProgress,renderExpirationTime){pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);var nextChildren=workInProgress.pendingProps;if(current$$1===null){// Portals are special because we don't append the children during mount
// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
workInProgress.child=reconcileChildFibers(workInProgress,null,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextChildren);}else{reconcileChildren(current$$1,workInProgress,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextChildren);}return workInProgress.child;}function updateContextProvider(current$$1,workInProgress,renderExpirationTime){var providerType=workInProgress.type;var context=providerType._context;var newProps=workInProgress.pendingProps;var oldProps=workInProgress.memoizedProps;var newValue=newProps.value;workInProgress.memoizedProps=newProps;{var providerPropTypes=workInProgress.type.propTypes;if(providerPropTypes){checkPropTypes(providerPropTypes,newProps,'prop','Context.Provider',getCurrentFiberStackInDev);}}pushProvider(workInProgress,newValue);if(oldProps!==null){var oldValue=oldProps.value;var changedBits=calculateChangedBits(context,newValue,oldValue);if(changedBits===0){// No change. Bailout early if children are the same.
if(oldProps.children===newProps.children&&!hasContextChanged()){return bailoutOnAlreadyFinishedWork(current$$1,workInProgress,renderExpirationTime);}}else{// The context value changed. Search for matching consumers and schedule
// them to update.
propagateContextChange(workInProgress,context,changedBits,renderExpirationTime);}}var newChildren=newProps.children;reconcileChildren(current$$1,workInProgress,newChildren,renderExpirationTime);return workInProgress.child;}function updateContextConsumer(current$$1,workInProgress,renderExpirationTime){var context=workInProgress.type;var newProps=workInProgress.pendingProps;var render=newProps.children;{!(typeof render==='function')?warningWithoutStack$1(false,'A context consumer was rendered with multiple children, or a child '+"that isn't a function. A context consumer expects a single child "+'that is a function. If you did pass a function, make sure there '+'is no trailing or leading whitespace around it.'):void 0;}prepareToReadContext(workInProgress,renderExpirationTime);var newValue=readContext(context,newProps.unstable_observedBits);var newChildren=void 0;{ReactCurrentOwner$3.current=workInProgress;setCurrentPhase('render');newChildren=render(newValue);setCurrentPhase(null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;reconcileChildren(current$$1,workInProgress,newChildren,renderExpirationTime);workInProgress.memoizedProps=newProps;return workInProgress.child;}/*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */function bailoutOnAlreadyFinishedWork(current$$1,workInProgress,renderExpirationTime){cancelWorkTimer(workInProgress);if(current$$1!==null){// Reuse previous context list
workInProgress.firstContextDependency=current$$1.firstContextDependency;}if(enableProfilerTimer){// Don't update "base" render times for bailouts.
stopProfilerTimerIfRunning(workInProgress);}// Check if the children have any pending work.
var childExpirationTime=workInProgress.childExpirationTime;if(childExpirationTime===NoWork||childExpirationTime>renderExpirationTime){// The children don't have any work either. We can skip them.
// TODO: Once we add back resuming, we should check if the children are
// a work-in-progress set. If so, we need to transfer their effects.
return null;}else{// This fiber doesn't have work, but its subtree does. Clone the child
// fibers and continue.
cloneChildFibers(current$$1,workInProgress);return workInProgress.child;}}// TODO: Delete memoizeProps/State and move to reconcile/bailout instead
function memoizeProps(workInProgress,nextProps){workInProgress.memoizedProps=nextProps;}function memoizeState(workInProgress,nextState){workInProgress.memoizedState=nextState;// Don't reset the updateQueue, in case there are pending updates. Resetting
// is handled by processUpdateQueue.
}function beginWork(current$$1,workInProgress,renderExpirationTime){var updateExpirationTime=workInProgress.expirationTime;if(!hasContextChanged()&&(updateExpirationTime===NoWork||updateExpirationTime>renderExpirationTime)){// This fiber does not have any pending work. Bailout without entering
// the begin phase. There's still some bookkeeping we that needs to be done
// in this optimized path, mostly pushing stuff onto the stack.
switch(workInProgress.tag){case HostRoot:pushHostRootContext(workInProgress);resetHydrationState();break;case HostComponent:pushHostContext(workInProgress);break;case ClassComponent:{var Component=workInProgress.type;if(isContextProvider(Component)){pushContextProvider(workInProgress);}break;}case ClassComponentLazy:{var thenable=workInProgress.type;var _Component=getResultFromResolvedThenable(thenable);if(isContextProvider(_Component)){pushContextProvider(workInProgress);}break;}case HostPortal:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);break;case ContextProvider:{var newValue=workInProgress.memoizedProps.value;pushProvider(workInProgress,newValue);break;}case Profiler:if(enableProfilerTimer){workInProgress.effectTag|=Update;}break;}return bailoutOnAlreadyFinishedWork(current$$1,workInProgress,renderExpirationTime);}// Before entering the begin phase, clear the expiration time.
workInProgress.expirationTime=NoWork;switch(workInProgress.tag){case IndeterminateComponent:{var _Component3=workInProgress.type;return mountIndeterminateComponent(current$$1,workInProgress,_Component3,renderExpirationTime);}case FunctionalComponent:{var _Component4=workInProgress.type;var _unresolvedProps=workInProgress.pendingProps;return updateFunctionalComponent(current$$1,workInProgress,_Component4,_unresolvedProps,renderExpirationTime);}case FunctionalComponentLazy:{var _thenable2=workInProgress.type;var _Component5=getResultFromResolvedThenable(_thenable2);var _unresolvedProps2=workInProgress.pendingProps;var _child=updateFunctionalComponent(current$$1,workInProgress,_Component5,resolveDefaultProps(_Component5,_unresolvedProps2),renderExpirationTime);workInProgress.memoizedProps=_unresolvedProps2;return _child;}case ClassComponent:{var _Component6=workInProgress.type;var _unresolvedProps3=workInProgress.pendingProps;return updateClassComponent(current$$1,workInProgress,_Component6,_unresolvedProps3,renderExpirationTime);}case ClassComponentLazy:{var _thenable3=workInProgress.type;var _Component7=getResultFromResolvedThenable(_thenable3);var _unresolvedProps4=workInProgress.pendingProps;var _child2=updateClassComponent(current$$1,workInProgress,_Component7,resolveDefaultProps(_Component7,_unresolvedProps4),renderExpirationTime);workInProgress.memoizedProps=_unresolvedProps4;return _child2;}case HostRoot:return updateHostRoot(current$$1,workInProgress,renderExpirationTime);case HostComponent:return updateHostComponent(current$$1,workInProgress,renderExpirationTime);case HostText:return updateHostText(current$$1,workInProgress);case PlaceholderComponent:return updatePlaceholderComponent(current$$1,workInProgress,renderExpirationTime);case HostPortal:return updatePortalComponent(current$$1,workInProgress,renderExpirationTime);case ForwardRef:{var type=workInProgress.type;return updateForwardRef(current$$1,workInProgress,type,workInProgress.pendingProps,renderExpirationTime);}case ForwardRefLazy:var _thenable=workInProgress.type;var _Component2=getResultFromResolvedThenable(_thenable);var unresolvedProps=workInProgress.pendingProps;var child=updateForwardRef(current$$1,workInProgress,_Component2,resolveDefaultProps(_Component2,unresolvedProps),renderExpirationTime);workInProgress.memoizedProps=unresolvedProps;return child;case Fragment:return updateFragment(current$$1,workInProgress,renderExpirationTime);case Mode:return updateMode(current$$1,workInProgress,renderExpirationTime);case Profiler:return updateProfiler(current$$1,workInProgress,renderExpirationTime);case ContextProvider:return updateContextProvider(current$$1,workInProgress,renderExpirationTime);case ContextConsumer:return updateContextConsumer(current$$1,workInProgress,renderExpirationTime);default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}function markUpdate(workInProgress){// Tag the fiber with an update effect. This turns a Placement into
// a PlacementAndUpdate.
workInProgress.effectTag|=Update;}function markRef$1(workInProgress){workInProgress.effectTag|=Ref;}function appendAllChildren(parent,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendInitialChild(parent,node.stateNode);}else if(node.tag===HostPortal){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}var updateHostContainer=void 0;var updateHostComponent$1=void 0;var updateHostText$1=void 0;if(supportsMutation){// Mutation mode
updateHostContainer=function(workInProgress){// Noop
};updateHostComponent$1=function(current,workInProgress,type,newProps,rootContainerInstance){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var oldProps=current.memoizedProps;if(oldProps===newProps){// In mutation mode, this is sufficient for a bailout because
// we won't touch this node even if children changed.
return;}// If we get updated because one of our children updated, we don't
// have newProps so we'll have to reuse them.
// TODO: Split the update API as separate for the props vs. children.
// Even better would be if children weren't special cased at all tho.
var instance=workInProgress.stateNode;var currentHostContext=getHostContext();// TODO: Experiencing an error where oldProps is null. Suggests a host
// component is hitting the resume path. Figure out why. Possibly
// related to `hidden`.
var updatePayload=prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContext);// TODO: Type this specific to this type of component.
workInProgress.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update. All the work is done in commitWork.
if(updatePayload){markUpdate(workInProgress);}};updateHostText$1=function(current,workInProgress,oldText,newText){// If the text differs, mark it as an update. All the work in done in commitWork.
if(oldText!==newText){markUpdate(workInProgress);}};}else if(supportsPersistence){// Persistent host tree mode
// An unfortunate fork of appendAllChildren because we have two different parent types.
var appendAllChildrenToContainer=function(containerChildSet,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendChildToContainerChildSet(containerChildSet,node.stateNode);}else if(node.tag===HostPortal){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}};updateHostContainer=function(workInProgress){var portalOrRoot=workInProgress.stateNode;var childrenUnchanged=workInProgress.firstEffect===null;if(childrenUnchanged){// No changes, just reuse the existing instance.
}else{var container=portalOrRoot.containerInfo;var newChildSet=createContainerChildSet(container);// If children might have changed, we have to add them all to the set.
appendAllChildrenToContainer(newChildSet,workInProgress);portalOrRoot.pendingChildren=newChildSet;// Schedule an update on the container to swap out the container.
markUpdate(workInProgress);finalizeContainerChildren(container,newChildSet);}};updateHostComponent$1=function(current,workInProgress,type,newProps,rootContainerInstance){var currentInstance=current.stateNode;var oldProps=current.memoizedProps;// If there are no effects associated with this node, then none of our children had any updates.
// This guarantees that we can reuse all of them.
var childrenUnchanged=workInProgress.firstEffect===null;if(childrenUnchanged&&oldProps===newProps){// No changes, just reuse the existing instance.
// Note that this might release a previous clone.
workInProgress.stateNode=currentInstance;return;}var recyclableInstance=workInProgress.stateNode;var currentHostContext=getHostContext();var updatePayload=null;if(oldProps!==newProps){updatePayload=prepareUpdate(recyclableInstance,type,oldProps,newProps,rootContainerInstance,currentHostContext);}if(childrenUnchanged&&updatePayload===null){// No changes, just reuse the existing instance.
// Note that this might release a previous clone.
workInProgress.stateNode=currentInstance;return;}var newInstance=cloneInstance(currentInstance,updatePayload,type,oldProps,newProps,workInProgress,childrenUnchanged,recyclableInstance);if(finalizeInitialChildren(newInstance,type,newProps,rootContainerInstance,currentHostContext)){markUpdate(workInProgress);}workInProgress.stateNode=newInstance;if(childrenUnchanged){// If there are no other effects in this tree, we need to flag this node as having one.
// Even though we're not going to use it for anything.
// Otherwise parents won't know that there are new children to propagate upwards.
markUpdate(workInProgress);}else{// If children might have changed, we have to add them all to the set.
appendAllChildren(newInstance,workInProgress);}};updateHostText$1=function(current,workInProgress,oldText,newText){if(oldText!==newText){// If the text content differs, we'll create a new text instance for it.
var rootContainerInstance=getRootHostContainer();var currentHostContext=getHostContext();workInProgress.stateNode=createTextInstance(newText,rootContainerInstance,currentHostContext,workInProgress);// We'll have to mark it as having an effect, even though we won't use the effect for anything.
// This lets the parents know that at least one of their children has changed.
markUpdate(workInProgress);}};}else{// No host operations
updateHostContainer=function(workInProgress){// Noop
};updateHostComponent$1=function(current,workInProgress,type,newProps,rootContainerInstance){// Noop
};updateHostText$1=function(current,workInProgress,oldText,newText){// Noop
};}function completeWork(current,workInProgress,renderExpirationTime){var newProps=workInProgress.pendingProps;switch(workInProgress.tag){case FunctionalComponent:case FunctionalComponentLazy:break;case ClassComponent:{var Component=workInProgress.type;if(isContextProvider(Component)){popContext(workInProgress);}break;}case ClassComponentLazy:{var _Component=getResultFromResolvedThenable(workInProgress.type);if(isContextProvider(_Component)){popContext(workInProgress);}break;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);var fiberRoot=workInProgress.stateNode;if(fiberRoot.pendingContext){fiberRoot.context=fiberRoot.pendingContext;fiberRoot.pendingContext=null;}if(current===null||current.child===null){// If we hydrated, pop so that we can delete any remaining children
// that weren't hydrated.
popHydrationState(workInProgress);// This resets the hacky state to fix isMounted before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag&=~Placement;}updateHostContainer(workInProgress);break;}case HostComponent:{popHostContext(workInProgress);var rootContainerInstance=getRootHostContainer();var type=workInProgress.type;if(current!==null&&workInProgress.stateNode!=null){updateHostComponent$1(current,workInProgress,type,newProps,rootContainerInstance);if(current.ref!==workInProgress.ref){markRef$1(workInProgress);}}else{if(!newProps){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
break;}var currentHostContext=getHostContext();// TODO: Move createInstance to beginWork and keep it on a context
// "stack" as the parent. Then append children as we go in beginWork
// or completeWork depending on we want to add then top->down or
// bottom->up. Top->down is faster in IE11.
var wasHydrated=popHydrationState(workInProgress);if(wasHydrated){// TODO: Move this and createInstance step into the beginPhase
// to consolidate.
if(prepareToHydrateHostInstance(workInProgress,rootContainerInstance,currentHostContext)){// If changes to the hydrated node needs to be applied at the
// commit-phase we mark this as such.
markUpdate(workInProgress);}}else{var instance=createInstance(type,newProps,rootContainerInstance,currentHostContext,workInProgress);appendAllChildren(instance,workInProgress);// Certain renderers require commit-time effects for initial mount.
// (eg DOM renderer supports auto-focus for certain elements).
// Make sure such renderers get scheduled for later work.
if(finalizeInitialChildren(instance,type,newProps,rootContainerInstance,currentHostContext)){markUpdate(workInProgress);}workInProgress.stateNode=instance;}if(workInProgress.ref!==null){// If there is a ref on a host node we need to schedule a callback
markRef$1(workInProgress);}}break;}case HostText:{var newText=newProps;if(current&&workInProgress.stateNode!=null){var oldText=current.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
updateHostText$1(current,workInProgress,oldText,newText);}else{if(typeof newText!=='string'){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
}var _rootContainerInstance=getRootHostContainer();var _currentHostContext=getHostContext();var _wasHydrated=popHydrationState(workInProgress);if(_wasHydrated){if(prepareToHydrateHostTextInstance(workInProgress)){markUpdate(workInProgress);}}else{workInProgress.stateNode=createTextInstance(newText,_rootContainerInstance,_currentHostContext,workInProgress);}}break;}case ForwardRef:case ForwardRefLazy:break;case PlaceholderComponent:break;case Fragment:break;case Mode:break;case Profiler:break;case HostPortal:popHostContainer(workInProgress);updateHostContainer(workInProgress);break;case ContextProvider:// Pop provider fiber
popProvider(workInProgress);break;case ContextConsumer:break;// Error cases
case IndeterminateComponent:invariant(false,'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');// eslint-disable-next-line no-fallthrough
default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}return null;}// This module is forked in different environments.
// By default, return `true` to log errors to the console.
// Forks can return `false` if this isn't desirable.
function showErrorDialog(capturedError){return true;}function logCapturedError(capturedError){var logError=showErrorDialog(capturedError);// Allow injected showErrorDialog() to prevent default console.error logging.
// This enables renderers like ReactNative to better manage redbox behavior.
if(logError===false){return;}var error=capturedError.error;{var componentName=capturedError.componentName,componentStack=capturedError.componentStack,errorBoundaryName=capturedError.errorBoundaryName,errorBoundaryFound=capturedError.errorBoundaryFound,willRetry=capturedError.willRetry;// Browsers support silencing uncaught errors by calling
// `preventDefault()` in window `error` handler.
// We record this information as an expando on the error.
if(error!=null&&error._suppressLogging){if(errorBoundaryFound&&willRetry){// The error is recoverable and was silenced.
// Ignore it and don't print the stack addendum.
// This is handy for testing error boundaries without noise.
return;}// The error is fatal. Since the silencing might have
// been accidental, we'll surface it anyway.
// However, the browser would have silenced the original error
// so we'll print it first, and then print the stack addendum.
console.error(error);// For a more detailed description of this block, see:
// https://github.com/facebook/react/pull/13384
}var componentNameMessage=componentName?'The above error occurred in the <'+componentName+'> component:':'The above error occurred in one of your React components:';var errorBoundaryMessage=void 0;// errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
if(errorBoundaryFound&&errorBoundaryName){if(willRetry){errorBoundaryMessage='React will try to recreate this component tree from scratch '+('using the error boundary you provided, '+errorBoundaryName+'.');}else{errorBoundaryMessage='This error was initially handled by the error boundary '+errorBoundaryName+'.\n'+'Recreating the tree from scratch failed so React will unmount the tree.';}}else{errorBoundaryMessage='Consider adding an error boundary to your tree to customize error handling behavior.\n'+'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';}var combinedMessage=''+componentNameMessage+componentStack+'\n\n'+(''+errorBoundaryMessage);// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console.error(combinedMessage);}}var emptyObject={};var didWarnAboutUndefinedSnapshotBeforeUpdate=null;{didWarnAboutUndefinedSnapshotBeforeUpdate=new Set();}function logError(boundary,errorInfo){var source=errorInfo.source;var stack=errorInfo.stack;if(stack===null&&source!==null){stack=getStackByFiberInDevAndProd(source);}var capturedError={componentName:source!==null?getComponentName(source.type):null,componentStack:stack!==null?stack:'',error:errorInfo.value,errorBoundary:null,errorBoundaryName:null,errorBoundaryFound:false,willRetry:false};if(boundary!==null&&boundary.tag===ClassComponent){capturedError.errorBoundary=boundary.stateNode;capturedError.errorBoundaryName=getComponentName(boundary.type);capturedError.errorBoundaryFound=true;capturedError.willRetry=true;}try{logCapturedError(capturedError);}catch(e){// This method must not throw, or React internal state will get messed up.
// If console.error is overridden, or logCapturedError() shows a dialog that throws,
// we want to report this error outside of the normal stack as a last resort.
// https://github.com/facebook/react/issues/13188
setTimeout(function(){throw e;});}}var callComponentWillUnmountWithTimer=function(current$$1,instance){startPhaseTimer(current$$1,'componentWillUnmount');instance.props=current$$1.memoizedProps;instance.state=current$$1.memoizedState;instance.componentWillUnmount();stopPhaseTimer();};// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current$$1,instance){{invokeGuardedCallback(null,callComponentWillUnmountWithTimer,null,current$$1,instance);if(hasCaughtError()){var unmountError=clearCaughtError();captureCommitPhaseError(current$$1,unmountError);}}}function safelyDetachRef(current$$1){var ref=current$$1.ref;if(ref!==null){if(typeof ref==='function'){{invokeGuardedCallback(null,ref,null,null);if(hasCaughtError()){var refError=clearCaughtError();captureCommitPhaseError(current$$1,refError);}}}else{ref.current=null;}}}function commitBeforeMutationLifeCycles(current$$1,finishedWork){switch(finishedWork.tag){case ClassComponent:case ClassComponentLazy:{if(finishedWork.effectTag&Snapshot){if(current$$1!==null){var prevProps=current$$1.memoizedProps;var prevState=current$$1.memoizedState;startPhaseTimer(finishedWork,'getSnapshotBeforeUpdate');var instance=finishedWork.stateNode;instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;var snapshot=instance.getSnapshotBeforeUpdate(prevProps,prevState);{var didWarnSet=didWarnAboutUndefinedSnapshotBeforeUpdate;if(snapshot===undefined&&!didWarnSet.has(finishedWork.type)){didWarnSet.add(finishedWork.type);warningWithoutStack$1(false,'%s.getSnapshotBeforeUpdate(): A snapshot value (or null) '+'must be returned. You have returned undefined.',getComponentName(finishedWork.type));}}instance.__reactInternalSnapshotBeforeUpdate=snapshot;stopPhaseTimer();}}return;}case HostRoot:case HostComponent:case HostText:case HostPortal:// Nothing to do for these component types
return;default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitLifeCycles(finishedRoot,current$$1,finishedWork,committedExpirationTime){switch(finishedWork.tag){case ClassComponent:case ClassComponentLazy:{var instance=finishedWork.stateNode;if(finishedWork.effectTag&Update){if(current$$1===null){startPhaseTimer(finishedWork,'componentDidMount');instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidMount();stopPhaseTimer();}else{var prevProps=current$$1.memoizedProps;var prevState=current$$1.memoizedState;startPhaseTimer(finishedWork,'componentDidUpdate');instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidUpdate(prevProps,prevState,instance.__reactInternalSnapshotBeforeUpdate);stopPhaseTimer();}}var updateQueue=finishedWork.updateQueue;if(updateQueue!==null){instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;commitUpdateQueue(finishedWork,updateQueue,instance,committedExpirationTime);}return;}case HostRoot:{var _updateQueue=finishedWork.updateQueue;if(_updateQueue!==null){var _instance=null;if(finishedWork.child!==null){switch(finishedWork.child.tag){case HostComponent:_instance=getPublicInstance(finishedWork.child.stateNode);break;case ClassComponent:case ClassComponentLazy:_instance=finishedWork.child.stateNode;break;}}commitUpdateQueue(finishedWork,_updateQueue,_instance,committedExpirationTime);}return;}case HostComponent:{var _instance2=finishedWork.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
if(current$$1===null&&finishedWork.effectTag&Update){var type=finishedWork.type;var props=finishedWork.memoizedProps;commitMount(_instance2,type,props,finishedWork);}return;}case HostText:{// We have no life-cycles associated with text.
return;}case HostPortal:{// We have no life-cycles associated with portals.
return;}case Profiler:{if(enableProfilerTimer){var onRender=finishedWork.memoizedProps.onRender;if(enableSchedulerTracing){onRender(finishedWork.memoizedProps.id,current$$1===null?'mount':'update',finishedWork.actualDuration,finishedWork.treeBaseDuration,finishedWork.actualStartTime,getCommitTime(),finishedRoot.memoizedInteractions);}else{onRender(finishedWork.memoizedProps.id,current$$1===null?'mount':'update',finishedWork.actualDuration,finishedWork.treeBaseDuration,finishedWork.actualStartTime,getCommitTime());}}return;}case PlaceholderComponent:{if(enableSuspense){if((finishedWork.mode&StrictMode)===NoEffect){// In loose mode, a placeholder times out by scheduling a synchronous
// update in the commit phase. Use `updateQueue` field to signal that
// the Timeout needs to switch to the placeholder. We don't need an
// entire queue. Any non-null value works.
// $FlowFixMe - Intentionally using a value other than an UpdateQueue.
finishedWork.updateQueue=emptyObject;scheduleWork(finishedWork,Sync);}else{// In strict mode, the Update effect is used to record the time at
// which the placeholder timed out.
var currentTime=requestCurrentTime();finishedWork.stateNode={timedOutAt:currentTime};}}return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitAttachRef(finishedWork){var ref=finishedWork.ref;if(ref!==null){var instance=finishedWork.stateNode;var instanceToUse=void 0;switch(finishedWork.tag){case HostComponent:instanceToUse=getPublicInstance(instance);break;default:instanceToUse=instance;}if(typeof ref==='function'){ref(instanceToUse);}else{{if(!ref.hasOwnProperty('current')){warningWithoutStack$1(false,'Unexpected ref object provided for %s. '+'Use either a ref-setter function or React.createRef().%s',getComponentName(finishedWork.type),getStackByFiberInDevAndProd(finishedWork));}}ref.current=instanceToUse;}}}function commitDetachRef(current$$1){var currentRef=current$$1.ref;if(currentRef!==null){if(typeof currentRef==='function'){currentRef(null);}else{currentRef.current=null;}}}// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(current$$1){onCommitUnmount(current$$1);switch(current$$1.tag){case ClassComponent:case ClassComponentLazy:{safelyDetachRef(current$$1);var instance=current$$1.stateNode;if(typeof instance.componentWillUnmount==='function'){safelyCallComponentWillUnmount(current$$1,instance);}return;}case HostComponent:{safelyDetachRef(current$$1);return;}case HostPortal:{// TODO: this is recursive.
// We are also not using this parent because
// the portal will get pushed immediately.
if(supportsMutation){unmountHostComponents(current$$1);}else if(supportsPersistence){emptyPortalContainer(current$$1);}return;}}}function commitNestedUnmounts(root){// While we're inside a removed host node we don't want to call
// removeChild on the inner nodes because they're removed by the top
// call anyway. We also want to call componentWillUnmount on all
// composites before this host node is removed from the tree. Therefore
var node=root;while(true){commitUnmount(node);// Visit children because they may contain more composite or host nodes.
// Skip portals because commitUnmount() currently visits them recursively.
if(node.child!==null&&(// If we use mutation we drill down into portals using commitUnmount above.
// If we don't use mutation we drill down into portals here instead.
!supportsMutation||node.tag!==HostPortal)){node.child.return=node;node=node.child;continue;}if(node===root){return;}while(node.sibling===null){if(node.return===null||node.return===root){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}function detachFiber(current$$1){// Cut off the return pointers to disconnect it from the tree. Ideally, we
// should clear the child pointer of the parent alternate to let this
// get GC:ed but we don't know which for sure which parent is the current
// one so we'll settle for GC:ing the subtree of this child. This child
// itself will be GC:ed when the parent updates the next time.
current$$1.return=null;current$$1.child=null;if(current$$1.alternate){current$$1.alternate.child=null;current$$1.alternate.return=null;}}function emptyPortalContainer(current$$1){if(!supportsPersistence){return;}var portal=current$$1.stateNode;var containerInfo=portal.containerInfo;var emptyChildSet=createContainerChildSet(containerInfo);replaceContainerChildren(containerInfo,emptyChildSet);}function commitContainer(finishedWork){if(!supportsPersistence){return;}switch(finishedWork.tag){case ClassComponent:case ClassComponentLazy:{return;}case HostComponent:{return;}case HostText:{return;}case HostRoot:case HostPortal:{var portalOrRoot=finishedWork.stateNode;var containerInfo=portalOrRoot.containerInfo,_pendingChildren=portalOrRoot.pendingChildren;replaceContainerChildren(containerInfo,_pendingChildren);return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function getHostParentFiber(fiber){var parent=fiber.return;while(parent!==null){if(isHostParent(parent)){return parent;}parent=parent.return;}invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');}function isHostParent(fiber){return fiber.tag===HostComponent||fiber.tag===HostRoot||fiber.tag===HostPortal;}function getHostSibling(fiber){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
var node=fiber;siblings:while(true){// If we didn't find anything, let's try the next sibling.
while(node.sibling===null){if(node.return===null||isHostParent(node.return)){// If we pop out of the root or hit the parent the fiber we are the
// last sibling.
return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;while(node.tag!==HostComponent&&node.tag!==HostText){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(node.effectTag&Placement){// If we don't have a child, try the siblings instead.
continue siblings;}// If we don't have a child, try the siblings instead.
// We also skip portals because they are not part of this host tree.
if(node.child===null||node.tag===HostPortal){continue siblings;}else{node.child.return=node;node=node.child;}}// Check if this host node is stable or about to be placed.
if(!(node.effectTag&Placement)){// Found it!
return node.stateNode;}}}function commitPlacement(finishedWork){if(!supportsMutation){return;}// Recursively insert all host nodes into the parent.
var parentFiber=getHostParentFiber(finishedWork);// Note: these two variables *must* always be updated together.
var parent=void 0;var isContainer=void 0;switch(parentFiber.tag){case HostComponent:parent=parentFiber.stateNode;isContainer=false;break;case HostRoot:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;case HostPortal:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;default:invariant(false,'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');}if(parentFiber.effectTag&ContentReset){// Reset the text content of the parent before doing any insertions
resetTextContent(parent);// Clear ContentReset from the effect tag
parentFiber.effectTag&=~ContentReset;}var before=getHostSibling(finishedWork);// We only have the top Fiber that was inserted but we need recurse down its
// children to find all the terminal nodes.
var node=finishedWork;while(true){if(node.tag===HostComponent||node.tag===HostText){if(before){if(isContainer){insertInContainerBefore(parent,node.stateNode,before);}else{insertBefore(parent,node.stateNode,before);}}else{if(isContainer){appendChildToContainer(parent,node.stateNode);}else{appendChild(parent,node.stateNode);}}}else if(node.tag===HostPortal){// If the insertion itself is a portal, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===finishedWork){return;}while(node.sibling===null){if(node.return===null||node.return===finishedWork){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}function unmountHostComponents(current$$1){// We only have the top Fiber that was deleted but we need recurse down its
var node=current$$1;// Each iteration, currentParent is populated with node's host parent if not
// currentParentIsValid.
var currentParentIsValid=false;// Note: these two variables *must* always be updated together.
var currentParent=void 0;var currentParentIsContainer=void 0;while(true){if(!currentParentIsValid){var parent=node.return;findParent:while(true){!(parent!==null)?invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;switch(parent.tag){case HostComponent:currentParent=parent.stateNode;currentParentIsContainer=false;break findParent;case HostRoot:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;case HostPortal:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;}parent=parent.return;}currentParentIsValid=true;}if(node.tag===HostComponent||node.tag===HostText){commitNestedUnmounts(node);// After all the children have unmounted, it is now safe to remove the
// node from the tree.
if(currentParentIsContainer){removeChildFromContainer(currentParent,node.stateNode);}else{removeChild(currentParent,node.stateNode);}// Don't visit children because we already visited them.
}else if(node.tag===HostPortal){// When we go into a portal, it becomes the parent to remove from.
// We will reassign it back when we pop the portal on the way up.
currentParent=node.stateNode.containerInfo;currentParentIsContainer=true;// Visit children because portals might contain host components.
if(node.child!==null){node.child.return=node;node=node.child;continue;}}else{commitUnmount(node);// Visit children because we may find more host components below.
if(node.child!==null){node.child.return=node;node=node.child;continue;}}if(node===current$$1){return;}while(node.sibling===null){if(node.return===null||node.return===current$$1){return;}node=node.return;if(node.tag===HostPortal){// When we go out of the portal, we need to restore the parent.
// Since we don't keep a stack of them, we will search for it.
currentParentIsValid=false;}}node.sibling.return=node.return;node=node.sibling;}}function commitDeletion(current$$1){if(supportsMutation){// Recursively delete all host nodes from the parent.
// Detach refs and call componentWillUnmount() on the whole subtree.
unmountHostComponents(current$$1);}else{// Detach refs and call componentWillUnmount() on the whole subtree.
commitNestedUnmounts(current$$1);}detachFiber(current$$1);}function commitWork(current$$1,finishedWork){if(!supportsMutation){commitContainer(finishedWork);return;}switch(finishedWork.tag){case ClassComponent:case ClassComponentLazy:{return;}case HostComponent:{var instance=finishedWork.stateNode;if(instance!=null){// Commit the work prepared earlier.
var newProps=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldProps=current$$1!==null?current$$1.memoizedProps:newProps;var type=finishedWork.type;// TODO: Type the updateQueue to be specific to host components.
var updatePayload=finishedWork.updateQueue;finishedWork.updateQueue=null;if(updatePayload!==null){commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork);}}return;}case HostText:{!(finishedWork.stateNode!==null)?invariant(false,'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.'):void 0;var textInstance=finishedWork.stateNode;var newText=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldText=current$$1!==null?current$$1.memoizedProps:newText;commitTextUpdate(textInstance,oldText,newText);return;}case HostRoot:{return;}case Profiler:{return;}case PlaceholderComponent:{return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitResetTextContent(current$$1){if(!supportsMutation){return;}resetTextContent(current$$1.stateNode);}function NoopComponent(){return null;}function createRootErrorUpdate(fiber,errorInfo,expirationTime){var update=createUpdate(expirationTime);// Unmount the root by rendering null.
update.tag=CaptureUpdate;// Caution: React DevTools currently depends on this property
// being called "element".
update.payload={element:null};var error=errorInfo.value;update.callback=function(){onUncaughtError(error);logError(fiber,errorInfo);};return update;}function createClassErrorUpdate(fiber,errorInfo,expirationTime){var update=createUpdate(expirationTime);update.tag=CaptureUpdate;var getDerivedStateFromCatch=fiber.type.getDerivedStateFromCatch;if(enableGetDerivedStateFromCatch&&typeof getDerivedStateFromCatch==='function'){var error=errorInfo.value;update.payload=function(){return getDerivedStateFromCatch(error);};}var inst=fiber.stateNode;if(inst!==null&&typeof inst.componentDidCatch==='function'){update.callback=function callback(){if(!enableGetDerivedStateFromCatch||getDerivedStateFromCatch!=='function'){// To preserve the preexisting retry behavior of error boundaries,
// we keep track of which ones already failed during this batch.
// This gets reset before we yield back to the browser.
// TODO: Warn in strict mode if getDerivedStateFromCatch is
// not defined.
markLegacyErrorBoundaryAsFailed(this);}var error=errorInfo.value;var stack=errorInfo.stack;logError(fiber,errorInfo);this.componentDidCatch(error,{componentStack:stack!==null?stack:''});};}return update;}function throwException(root,returnFiber,sourceFiber,value,renderExpirationTime){// The source fiber did not complete.
sourceFiber.effectTag|=Incomplete;// Its effect list is no longer valid.
sourceFiber.firstEffect=sourceFiber.lastEffect=null;if(enableSuspense&&value!==null&&typeof value==='object'&&typeof value.then==='function'){// This is a thenable.
var thenable=value;// Find the earliest timeout threshold of all the placeholders in the
// ancestor path. We could avoid this traversal by storing the thresholds on
// the stack, but we choose not to because we only hit this path if we're
// IO-bound (i.e. if something suspends). Whereas the stack is used even in
// the non-IO- bound case.
var _workInProgress=returnFiber;var earliestTimeoutMs=-1;var startTimeMs=-1;do{if(_workInProgress.tag===PlaceholderComponent){var current=_workInProgress.alternate;if(current!==null&&current.memoizedState===true&&current.stateNode!==null){// Reached a placeholder that already timed out. Each timed out
// placeholder acts as the root of a new suspense boundary.
// Use the time at which the placeholder timed out as the start time
// for the current render.
var timedOutAt=current.stateNode.timedOutAt;startTimeMs=expirationTimeToMs(timedOutAt);// Do not search any further.
break;}var timeoutPropMs=_workInProgress.pendingProps.delayMs;if(typeof timeoutPropMs==='number'){if(timeoutPropMs<=0){earliestTimeoutMs=0;}else if(earliestTimeoutMs===-1||timeoutPropMs<earliestTimeoutMs){earliestTimeoutMs=timeoutPropMs;}}}_workInProgress=_workInProgress.return;}while(_workInProgress!==null);// Schedule the nearest Placeholder to re-render the timed out view.
_workInProgress=returnFiber;do{if(_workInProgress.tag===PlaceholderComponent){var didTimeout=_workInProgress.memoizedState;if(!didTimeout){// Found the nearest boundary.
// If the boundary is not in async mode, we should not suspend, and
// likewise, when the promise resolves, we should ping synchronously.
var pingTime=(_workInProgress.mode&AsyncMode)===NoEffect?Sync:renderExpirationTime;// Attach a listener to the promise to "ping" the root and retry.
var onResolveOrReject=retrySuspendedRoot.bind(null,root,_workInProgress,pingTime);thenable.then(onResolveOrReject,onResolveOrReject);// If the boundary is outside of strict mode, we should *not* suspend
// the commit. Pretend as if the suspended component rendered null and
// keep rendering. In the commit phase, we'll schedule a subsequent
// synchronous update to re-render the Placeholder.
//
// Note: It doesn't matter whether the component that suspended was
// inside a strict mode tree. If the Placeholder is outside of it, we
// should *not* suspend the commit.
if((_workInProgress.mode&StrictMode)===NoEffect){_workInProgress.effectTag|=Update;// Unmount the source fiber's children
var nextChildren=null;reconcileChildren(sourceFiber.alternate,sourceFiber,nextChildren,renderExpirationTime);sourceFiber.effectTag&=~Incomplete;if(sourceFiber.tag===IndeterminateComponent){// Let's just assume it's a functional component. This fiber will
// be unmounted in the immediate next commit, anyway.
sourceFiber.tag=FunctionalComponent;}if(sourceFiber.tag===ClassComponent||sourceFiber.tag===ClassComponentLazy){// We're going to commit this fiber even though it didn't
// complete. But we shouldn't call any lifecycle methods or
// callbacks. Remove all lifecycle effect tags.
sourceFiber.effectTag&=~LifecycleEffectMask;if(sourceFiber.alternate===null){// We're about to mount a class component that doesn't have an
// instance. Turn this into a dummy functional component instead,
// to prevent type errors. This is a bit weird but it's an edge
// case and we're about to synchronously delete this
// component, anyway.
sourceFiber.tag=FunctionalComponent;sourceFiber.type=NoopComponent;}}// Exit without suspending.
return;}// Confirmed that the boundary is in a strict mode tree. Continue with
// the normal suspend path.
var absoluteTimeoutMs=void 0;if(earliestTimeoutMs===-1){// If no explicit threshold is given, default to an abitrarily large
// value. The actual size doesn't matter because the threshold for the
// whole tree will be clamped to the expiration time.
absoluteTimeoutMs=maxSigned31BitInt;}else{if(startTimeMs===-1){// This suspend happened outside of any already timed-out
// placeholders. We don't know exactly when the update was scheduled,
// but we can infer an approximate start time from the expiration
// time. First, find the earliest uncommitted expiration time in the
// tree, including work that is suspended. Then subtract the offset
// used to compute an async update's expiration time. This will cause
// high priority (interactive) work to expire earlier than necessary,
// but we can account for this by adjusting for the Just Noticeable
// Difference.
var earliestExpirationTime=findEarliestOutstandingPriorityLevel(root,renderExpirationTime);var earliestExpirationTimeMs=expirationTimeToMs(earliestExpirationTime);startTimeMs=earliestExpirationTimeMs-LOW_PRIORITY_EXPIRATION;}absoluteTimeoutMs=startTimeMs+earliestTimeoutMs;}// Mark the earliest timeout in the suspended fiber's ancestor path.
// After completing the root, we'll take the largest of all the
// suspended fiber's timeouts and use it to compute a timeout for the
// whole tree.
renderDidSuspend(root,absoluteTimeoutMs,renderExpirationTime);_workInProgress.effectTag|=ShouldCapture;_workInProgress.expirationTime=renderExpirationTime;return;}// This boundary already captured during this render. Continue to the
// next boundary.
}_workInProgress=_workInProgress.return;}while(_workInProgress!==null);// No boundary was found. Fallthrough to error mode.
value=new Error('An update was suspended, but no placeholder UI was provided.');}// We didn't find a boundary that could handle this type of exception. Start
// over and traverse parent path again, this time treating the exception
// as an error.
renderDidError();value=createCapturedValue(value,sourceFiber);var workInProgress=returnFiber;do{switch(workInProgress.tag){case HostRoot:{var _errorInfo=value;workInProgress.effectTag|=ShouldCapture;workInProgress.expirationTime=renderExpirationTime;var update=createRootErrorUpdate(workInProgress,_errorInfo,renderExpirationTime);enqueueCapturedUpdate(workInProgress,update);return;}case ClassComponent:case ClassComponentLazy:// Capture and retry
var errorInfo=value;var ctor=workInProgress.type;var instance=workInProgress.stateNode;if((workInProgress.effectTag&DidCapture)===NoEffect&&(typeof ctor.getDerivedStateFromCatch==='function'&&enableGetDerivedStateFromCatch||instance!==null&&typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance))){workInProgress.effectTag|=ShouldCapture;workInProgress.expirationTime=renderExpirationTime;// Schedule the error boundary to re-render using updated state
var _update=createClassErrorUpdate(workInProgress,errorInfo,renderExpirationTime);enqueueCapturedUpdate(workInProgress,_update);return;}break;default:break;}workInProgress=workInProgress.return;}while(workInProgress!==null);}function unwindWork(workInProgress,renderExpirationTime){switch(workInProgress.tag){case ClassComponent:{var Component=workInProgress.type;if(isContextProvider(Component)){popContext(workInProgress);}var effectTag=workInProgress.effectTag;if(effectTag&ShouldCapture){workInProgress.effectTag=effectTag&~ShouldCapture|DidCapture;return workInProgress;}return null;}case ClassComponentLazy:{var _Component=workInProgress.type._reactResult;if(isContextProvider(_Component)){popContext(workInProgress);}var _effectTag=workInProgress.effectTag;if(_effectTag&ShouldCapture){workInProgress.effectTag=_effectTag&~ShouldCapture|DidCapture;return workInProgress;}return null;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);var _effectTag2=workInProgress.effectTag;!((_effectTag2&DidCapture)===NoEffect)?invariant(false,'The root failed to unmount after an error. This is likely a bug in React. Please file an issue.'):void 0;workInProgress.effectTag=_effectTag2&~ShouldCapture|DidCapture;return workInProgress;}case HostComponent:{popHostContext(workInProgress);return null;}case PlaceholderComponent:{var _effectTag3=workInProgress.effectTag;if(_effectTag3&ShouldCapture){workInProgress.effectTag=_effectTag3&~ShouldCapture|DidCapture;return workInProgress;}return null;}case HostPortal:popHostContainer(workInProgress);return null;case ContextProvider:popProvider(workInProgress);return null;default:return null;}}function unwindInterruptedWork(interruptedWork){switch(interruptedWork.tag){case ClassComponent:{var childContextTypes=interruptedWork.type.childContextTypes;if(childContextTypes!==null&&childContextTypes!==undefined){popContext(interruptedWork);}break;}case ClassComponentLazy:{var _childContextTypes=interruptedWork.type._reactResult.childContextTypes;if(_childContextTypes!==null&&_childContextTypes!==undefined){popContext(interruptedWork);}break;}case HostRoot:{popHostContainer(interruptedWork);popTopLevelContextObject(interruptedWork);break;}case HostComponent:{popHostContext(interruptedWork);break;}case HostPortal:popHostContainer(interruptedWork);break;case ContextProvider:popProvider(interruptedWork);break;default:break;}}var Dispatcher={readContext:readContext};var ReactCurrentOwner$2=ReactSharedInternals.ReactCurrentOwner;var didWarnAboutStateTransition=void 0;var didWarnSetStateChildContext=void 0;var warnAboutUpdateOnUnmounted=void 0;var warnAboutInvalidUpdates=void 0;if(enableSchedulerTracing){// Provide explicit error message when production+profiling bundle of e.g. react-dom
// is used with production (non-profiling) bundle of schedule/tracing
!(tracing.__interactionsRef!=null&&tracing.__interactionsRef.current!=null)?invariant(false,'It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `schedule/tracing` module with `schedule/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at http://fb.me/react-profiling'):void 0;}{didWarnAboutStateTransition=false;didWarnSetStateChildContext=false;var didWarnStateUpdateForUnmountedComponent={};warnAboutUpdateOnUnmounted=function(fiber){// We show the whole stack but dedupe on the top component's name because
// the problematic code almost always lies inside that component.
var componentName=getComponentName(fiber.type)||'ReactClass';if(didWarnStateUpdateForUnmountedComponent[componentName]){return;}warningWithoutStack$1(false,"Can't call setState (or forceUpdate) on an unmounted component. This "+'is a no-op, but it indicates a memory leak in your application. To '+'fix, cancel all subscriptions and asynchronous tasks in the '+'componentWillUnmount method.%s',getStackByFiberInDevAndProd(fiber));didWarnStateUpdateForUnmountedComponent[componentName]=true;};warnAboutInvalidUpdates=function(instance){switch(phase){case'getChildContext':if(didWarnSetStateChildContext){return;}warningWithoutStack$1(false,'setState(...): Cannot call setState() inside getChildContext()');didWarnSetStateChildContext=true;break;case'render':if(didWarnAboutStateTransition){return;}warningWithoutStack$1(false,'Cannot update during an existing state transition (such as within '+'`render`). Render methods should be a pure function of props and state.');didWarnAboutStateTransition=true;break;}};}// Used to ensure computeUniqueAsyncExpiration is monotonically increasing.
var lastUniqueAsyncExpiration=0;// Represents the expiration time that incoming updates should use. (If this
// is NoWork, use the default strategy: async updates in async mode, sync
// updates in sync mode.)
var expirationContext=NoWork;var isWorking=false;// The next work in progress fiber that we're currently working on.
var nextUnitOfWork=null;var nextRoot=null;// The time at which we're currently rendering work.
var nextRenderExpirationTime=NoWork;var nextLatestAbsoluteTimeoutMs=-1;var nextRenderDidError=false;// The next fiber with an effect that we're currently committing.
var nextEffect=null;var isCommitting$1=false;var legacyErrorBoundariesThatAlreadyFailed=null;// Used for performance tracking.
var interruptedBy=null;// Do not decrement interaction counts in the event of suspense timeouts.
// This would lead to prematurely calling the interaction-complete hook.
var suspenseDidTimeout=false;var stashedWorkInProgressProperties=void 0;var replayUnitOfWork=void 0;var isReplayingFailedUnitOfWork=void 0;var originalReplayError=void 0;var rethrowOriginalError=void 0;if(true&&replayFailedUnitOfWorkWithInvokeGuardedCallback){stashedWorkInProgressProperties=null;isReplayingFailedUnitOfWork=false;originalReplayError=null;replayUnitOfWork=function(failedUnitOfWork,thrownValue,isYieldy){if(thrownValue!==null&&typeof thrownValue==='object'&&typeof thrownValue.then==='function'){// Don't replay promises. Treat everything else like an error.
// TODO: Need to figure out a different strategy if/when we add
// support for catching other types.
return;}// Restore the original state of the work-in-progress
if(stashedWorkInProgressProperties===null){// This should never happen. Don't throw because this code is DEV-only.
warningWithoutStack$1(false,'Could not replay rendering after an error. This is likely a bug in React. '+'Please file an issue.');return;}assignFiberPropertiesInDEV(failedUnitOfWork,stashedWorkInProgressProperties);switch(failedUnitOfWork.tag){case HostRoot:popHostContainer(failedUnitOfWork);popTopLevelContextObject(failedUnitOfWork);break;case HostComponent:popHostContext(failedUnitOfWork);break;case ClassComponent:{var Component=failedUnitOfWork.type;if(isContextProvider(Component)){popContext(failedUnitOfWork);}break;}case ClassComponentLazy:{var _Component=getResultFromResolvedThenable(failedUnitOfWork.type);if(isContextProvider(_Component)){popContext(failedUnitOfWork);}break;}case HostPortal:popHostContainer(failedUnitOfWork);break;case ContextProvider:popProvider(failedUnitOfWork);break;}// Replay the begin phase.
isReplayingFailedUnitOfWork=true;originalReplayError=thrownValue;invokeGuardedCallback(null,workLoop,null,isYieldy);isReplayingFailedUnitOfWork=false;originalReplayError=null;if(hasCaughtError()){var replayError=clearCaughtError();if(replayError!=null&&thrownValue!=null){try{// Reading the expando property is intentionally
// inside `try` because it might be a getter or Proxy.
if(replayError._suppressLogging){// Also suppress logging for the original error.
thrownValue._suppressLogging=true;}}catch(inner){// Ignore.
}}}else{// If the begin phase did not fail the second time, set this pointer
// back to the original value.
nextUnitOfWork=failedUnitOfWork;}};rethrowOriginalError=function(){throw originalReplayError;};}function resetStack(){if(nextUnitOfWork!==null){var interruptedWork=nextUnitOfWork.return;while(interruptedWork!==null){unwindInterruptedWork(interruptedWork);interruptedWork=interruptedWork.return;}}{ReactStrictModeWarnings.discardPendingWarnings();checkThatStackIsEmpty();}nextRoot=null;nextRenderExpirationTime=NoWork;nextLatestAbsoluteTimeoutMs=-1;nextRenderDidError=false;nextUnitOfWork=null;}function commitAllHostEffects(){while(nextEffect!==null){{setCurrentFiber(nextEffect);}recordEffect();var effectTag=nextEffect.effectTag;if(effectTag&ContentReset){commitResetTextContent(nextEffect);}if(effectTag&Ref){var current$$1=nextEffect.alternate;if(current$$1!==null){commitDetachRef(current$$1);}}// The following switch statement is only concerned about placement,
// updates, and deletions. To avoid needing to add a case for every
// possible bitmap value, we remove the secondary effects from the
// effect tag and switch on that value.
var primaryEffectTag=effectTag&(Placement|Update|Deletion);switch(primaryEffectTag){case Placement:{commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted
// does and isMounted is deprecated anyway so we should be able
// to kill this.
nextEffect.effectTag&=~Placement;break;}case PlacementAndUpdate:{// Placement
commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
nextEffect.effectTag&=~Placement;// Update
var _current=nextEffect.alternate;commitWork(_current,nextEffect);break;}case Update:{var _current2=nextEffect.alternate;commitWork(_current2,nextEffect);break;}case Deletion:{commitDeletion(nextEffect);break;}}nextEffect=nextEffect.nextEffect;}{resetCurrentFiber();}}function commitBeforeMutationLifecycles(){while(nextEffect!==null){{setCurrentFiber(nextEffect);}var effectTag=nextEffect.effectTag;if(effectTag&Snapshot){recordEffect();var current$$1=nextEffect.alternate;commitBeforeMutationLifeCycles(current$$1,nextEffect);}// Don't cleanup effects yet;
// This will be done by commitAllLifeCycles()
nextEffect=nextEffect.nextEffect;}{resetCurrentFiber();}}function commitAllLifeCycles(finishedRoot,committedExpirationTime){{ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();if(warnAboutDeprecatedLifecycles){ReactStrictModeWarnings.flushPendingDeprecationWarnings();}if(warnAboutLegacyContextAPI){ReactStrictModeWarnings.flushLegacyContextWarning();}}while(nextEffect!==null){var effectTag=nextEffect.effectTag;if(effectTag&(Update|Callback)){recordEffect();var current$$1=nextEffect.alternate;commitLifeCycles(finishedRoot,current$$1,nextEffect,committedExpirationTime);}if(effectTag&Ref){recordEffect();commitAttachRef(nextEffect);}var next=nextEffect.nextEffect;// Ensure that we clean these up so that we don't accidentally keep them.
// I'm not actually sure this matters because we can't reset firstEffect
// and lastEffect since they're on every node, not just the effectful
// ones. So we have to clean everything as we reuse nodes anyway.
nextEffect.nextEffect=null;// Ensure that we reset the effectTag here so that we can rely on effect
// tags to reason about the current life-cycle.
nextEffect=next;}}function isAlreadyFailedLegacyErrorBoundary(instance){return legacyErrorBoundariesThatAlreadyFailed!==null&&legacyErrorBoundariesThatAlreadyFailed.has(instance);}function markLegacyErrorBoundaryAsFailed(instance){if(legacyErrorBoundariesThatAlreadyFailed===null){legacyErrorBoundariesThatAlreadyFailed=new Set([instance]);}else{legacyErrorBoundariesThatAlreadyFailed.add(instance);}}function commitRoot(root,finishedWork){isWorking=true;isCommitting$1=true;startCommitTimer();!(root.current!==finishedWork)?invariant(false,'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.'):void 0;var committedExpirationTime=root.pendingCommitExpirationTime;!(committedExpirationTime!==NoWork)?invariant(false,'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.'):void 0;root.pendingCommitExpirationTime=NoWork;// Update the pending priority levels to account for the work that we are
// about to commit. This needs to happen before calling the lifecycles, since
// they may schedule additional updates.
var updateExpirationTimeBeforeCommit=finishedWork.expirationTime;var childExpirationTimeBeforeCommit=finishedWork.childExpirationTime;var earliestRemainingTimeBeforeCommit=updateExpirationTimeBeforeCommit===NoWork||childExpirationTimeBeforeCommit!==NoWork&&childExpirationTimeBeforeCommit<updateExpirationTimeBeforeCommit?childExpirationTimeBeforeCommit:updateExpirationTimeBeforeCommit;markCommittedPriorityLevels(root,earliestRemainingTimeBeforeCommit);var prevInteractions=null;var committedInteractions=enableSchedulerTracing?[]:null;if(enableSchedulerTracing){// Restore any pending interactions at this point,
// So that cascading work triggered during the render phase will be accounted for.
prevInteractions=tracing.__interactionsRef.current;tracing.__interactionsRef.current=root.memoizedInteractions;// We are potentially finished with the current batch of interactions.
// So we should clear them out of the pending interaction map.
// We do this at the start of commit in case cascading work is scheduled by commit phase lifecycles.
// In that event, interaction data may be added back into the pending map for a future commit.
// We also store the interactions we are about to commit so that we can notify subscribers after we're done.
// These are stored as an Array rather than a Set,
// Because the same interaction may be pending for multiple expiration times,
// In which case it's important that we decrement the count the right number of times after finishing.
root.pendingInteractionMap.forEach(function(scheduledInteractions,scheduledExpirationTime){if(scheduledExpirationTime<=committedExpirationTime){committedInteractions.push.apply(committedInteractions,Array.from(scheduledInteractions));root.pendingInteractionMap.delete(scheduledExpirationTime);}});}// Reset this to null before calling lifecycles
ReactCurrentOwner$2.current=null;var firstEffect=void 0;if(finishedWork.effectTag>PerformedWork){// A fiber's effect list consists only of its children, not itself. So if
// the root has an effect, we need to add it to the end of the list. The
// resulting list is the set that would belong to the root's parent, if
// it had one; that is, all the effects in the tree including the root.
if(finishedWork.lastEffect!==null){finishedWork.lastEffect.nextEffect=finishedWork;firstEffect=finishedWork.firstEffect;}else{firstEffect=finishedWork;}}else{// There is no effect on the root.
firstEffect=finishedWork.firstEffect;}prepareForCommit(root.containerInfo);// Invoke instances of getSnapshotBeforeUpdate before mutation.
nextEffect=firstEffect;startCommitSnapshotEffectsTimer();while(nextEffect!==null){var didError=false;var error=void 0;{invokeGuardedCallback(null,commitBeforeMutationLifecycles,null);if(hasCaughtError()){didError=true;error=clearCaughtError();}}if(didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureCommitPhaseError(nextEffect,error);// Clean-up
if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}stopCommitSnapshotEffectsTimer();if(enableProfilerTimer){// Mark the current commit time to be shared by all Profilers in this batch.
// This enables them to be grouped later.
recordCommitTime();}// Commit all the side-effects within a tree. We'll do this in two passes.
// The first pass performs all the host insertions, updates, deletions and
// ref unmounts.
nextEffect=firstEffect;startCommitHostEffectsTimer();while(nextEffect!==null){var _didError=false;var _error=void 0;{invokeGuardedCallback(null,commitAllHostEffects,null);if(hasCaughtError()){_didError=true;_error=clearCaughtError();}}if(_didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureCommitPhaseError(nextEffect,_error);// Clean-up
if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}stopCommitHostEffectsTimer();resetAfterCommit(root.containerInfo);// The work-in-progress tree is now the current tree. This must come after
// the first pass of the commit phase, so that the previous tree is still
// current during componentWillUnmount, but before the second pass, so that
// the finished work is current during componentDidMount/Update.
root.current=finishedWork;// In the second pass we'll perform all life-cycles and ref callbacks.
// Life-cycles happen as a separate pass so that all placements, updates,
// and deletions in the entire tree have already been invoked.
// This pass also triggers any renderer-specific initial effects.
nextEffect=firstEffect;startCommitLifeCyclesTimer();while(nextEffect!==null){var _didError2=false;var _error2=void 0;{invokeGuardedCallback(null,commitAllLifeCycles,null,root,committedExpirationTime);if(hasCaughtError()){_didError2=true;_error2=clearCaughtError();}}if(_didError2){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureCommitPhaseError(nextEffect,_error2);if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}isCommitting$1=false;isWorking=false;stopCommitLifeCyclesTimer();stopCommitTimer();onCommitRoot(finishedWork.stateNode);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);}var updateExpirationTimeAfterCommit=finishedWork.expirationTime;var childExpirationTimeAfterCommit=finishedWork.childExpirationTime;var earliestRemainingTimeAfterCommit=updateExpirationTimeAfterCommit===NoWork||childExpirationTimeAfterCommit!==NoWork&&childExpirationTimeAfterCommit<updateExpirationTimeAfterCommit?childExpirationTimeAfterCommit:updateExpirationTimeAfterCommit;if(earliestRemainingTimeAfterCommit===NoWork){// If there's no remaining work, we can clear the set of already failed
// error boundaries.
legacyErrorBoundariesThatAlreadyFailed=null;}onCommit(root,earliestRemainingTimeAfterCommit);if(enableSchedulerTracing){tracing.__interactionsRef.current=prevInteractions;var subscriber=void 0;try{subscriber=tracing.__subscriberRef.current;if(subscriber!==null&&root.memoizedInteractions.size>0){var threadID=computeThreadID(committedExpirationTime,root.interactionThreadID);subscriber.onWorkStopped(root.memoizedInteractions,threadID);}}catch(error){// It's not safe for commitRoot() to throw.
// Store the error for now and we'll re-throw in finishRendering().
if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}finally{// Don't update interaction counts if we're frozen due to suspense.
// In this case, we can skip the completed-work check entirely.
if(!suspenseDidTimeout){// Now that we're done, check the completed batch of interactions.
// If no more work is outstanding for a given interaction,
// We need to notify the subscribers that it's finished.
committedInteractions.forEach(function(interaction){interaction.__count--;if(subscriber!==null&&interaction.__count===0){try{subscriber.onInteractionScheduledWorkCompleted(interaction);}catch(error){// It's not safe for commitRoot() to throw.
// Store the error for now and we'll re-throw in finishRendering().
if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}}});}}}}function resetChildExpirationTime(workInProgress,renderTime){if(renderTime!==Never&&workInProgress.childExpirationTime===Never){// The children of this component are hidden. Don't bubble their
// expiration times.
return;}var newChildExpirationTime=NoWork;// Bubble up the earliest expiration time.
if(enableProfilerTimer&&workInProgress.mode&ProfileMode){// We're in profiling mode.
// Let's use this same traversal to update the render durations.
var actualDuration=workInProgress.actualDuration;var treeBaseDuration=workInProgress.selfBaseDuration;// When a fiber is cloned, its actualDuration is reset to 0.
// This value will only be updated if work is done on the fiber (i.e. it doesn't bailout).
// When work is done, it should bubble to the parent's actualDuration.
// If the fiber has not been cloned though, (meaning no work was done),
// Then this value will reflect the amount of time spent working on a previous render.
// In that case it should not bubble.
// We determine whether it was cloned by comparing the child pointer.
var shouldBubbleActualDurations=workInProgress.alternate===null||workInProgress.child!==workInProgress.alternate.child;var child=workInProgress.child;while(child!==null){var childUpdateExpirationTime=child.expirationTime;var childChildExpirationTime=child.childExpirationTime;if(newChildExpirationTime===NoWork||childUpdateExpirationTime!==NoWork&&childUpdateExpirationTime<newChildExpirationTime){newChildExpirationTime=childUpdateExpirationTime;}if(newChildExpirationTime===NoWork||childChildExpirationTime!==NoWork&&childChildExpirationTime<newChildExpirationTime){newChildExpirationTime=childChildExpirationTime;}if(shouldBubbleActualDurations){actualDuration+=child.actualDuration;}treeBaseDuration+=child.treeBaseDuration;child=child.sibling;}workInProgress.actualDuration=actualDuration;workInProgress.treeBaseDuration=treeBaseDuration;}else{var _child=workInProgress.child;while(_child!==null){var _childUpdateExpirationTime=_child.expirationTime;var _childChildExpirationTime=_child.childExpirationTime;if(newChildExpirationTime===NoWork||_childUpdateExpirationTime!==NoWork&&_childUpdateExpirationTime<newChildExpirationTime){newChildExpirationTime=_childUpdateExpirationTime;}if(newChildExpirationTime===NoWork||_childChildExpirationTime!==NoWork&&_childChildExpirationTime<newChildExpirationTime){newChildExpirationTime=_childChildExpirationTime;}_child=_child.sibling;}}workInProgress.childExpirationTime=newChildExpirationTime;}function completeUnitOfWork(workInProgress){// Attempt to complete the current unit of work, then move to the
// next sibling. If there are no more siblings, return to the
// parent fiber.
while(true){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current$$1=workInProgress.alternate;{setCurrentFiber(workInProgress);}var returnFiber=workInProgress.return;var siblingFiber=workInProgress.sibling;if((workInProgress.effectTag&Incomplete)===NoEffect){// This fiber completed.
if(enableProfilerTimer){if(workInProgress.mode&ProfileMode){startProfilerTimer(workInProgress);}nextUnitOfWork=completeWork(current$$1,workInProgress,nextRenderExpirationTime);if(workInProgress.mode&ProfileMode){// Update render duration assuming we didn't error.
stopProfilerTimerIfRunningAndRecordDelta(workInProgress,false);}}else{nextUnitOfWork=completeWork(current$$1,workInProgress,nextRenderExpirationTime);}var next=nextUnitOfWork;stopWorkTimer(workInProgress);resetChildExpirationTime(workInProgress,nextRenderExpirationTime);{resetCurrentFiber();}if(next!==null){stopWorkTimer(workInProgress);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}// If completing this work spawned new work, do that next. We'll come
// back here again.
return next;}if(returnFiber!==null&&// Do not append effects to parents if a sibling failed to complete
(returnFiber.effectTag&Incomplete)===NoEffect){// Append all the effects of the subtree and this fiber onto the effect
// list of the parent. The completion order of the children affects the
// side-effect order.
if(returnFiber.firstEffect===null){returnFiber.firstEffect=workInProgress.firstEffect;}if(workInProgress.lastEffect!==null){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress.firstEffect;}returnFiber.lastEffect=workInProgress.lastEffect;}// If this fiber had side-effects, we append it AFTER the children's
// side-effects. We can perform certain side-effects earlier if
// needed, by doing multiple passes over the effect list. We don't want
// to schedule our own side-effect on our own list because if end up
// reusing children we'll schedule this effect onto itself since we're
// at the end.
var effectTag=workInProgress.effectTag;// Skip both NoWork and PerformedWork tags when creating the effect list.
// PerformedWork effect is read by React DevTools but shouldn't be committed.
if(effectTag>PerformedWork){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress;}else{returnFiber.firstEffect=workInProgress;}returnFiber.lastEffect=workInProgress;}}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
return siblingFiber;}else if(returnFiber!==null){// If there's no more work in this returnFiber. Complete the returnFiber.
workInProgress=returnFiber;continue;}else{// We've reached the root.
return null;}}else{if(workInProgress.mode&ProfileMode){// Record the render duration for the fiber that errored.
stopProfilerTimerIfRunningAndRecordDelta(workInProgress,false);}// This fiber did not complete because something threw. Pop values off
// the stack without entering the complete phase. If this is a boundary,
// capture values if possible.
var _next=unwindWork(workInProgress,nextRenderExpirationTime);// Because this fiber did not complete, don't reset its expiration time.
if(workInProgress.effectTag&DidCapture){// Restarting an error boundary
stopFailedWorkTimer(workInProgress);}else{stopWorkTimer(workInProgress);}{resetCurrentFiber();}if(_next!==null){stopWorkTimer(workInProgress);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}if(enableProfilerTimer){// Include the time spent working on failed children before continuing.
if(_next.mode&ProfileMode){var actualDuration=_next.actualDuration;var child=_next.child;while(child!==null){actualDuration+=child.actualDuration;child=child.sibling;}_next.actualDuration=actualDuration;}}// If completing this work spawned new work, do that next. We'll come
// back here again.
// Since we're restarting, remove anything that is not a host effect
// from the effect tag.
_next.effectTag&=HostEffectMask;return _next;}if(returnFiber!==null){// Mark the parent fiber as incomplete and clear its effect list.
returnFiber.firstEffect=returnFiber.lastEffect=null;returnFiber.effectTag|=Incomplete;}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
return siblingFiber;}else if(returnFiber!==null){// If there's no more work in this returnFiber. Complete the returnFiber.
workInProgress=returnFiber;continue;}else{return null;}}}// Without this explicit null return Flow complains of invalid return type
// TODO Remove the above while(true) loop
// eslint-disable-next-line no-unreachable
return null;}function performUnitOfWork(workInProgress){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current$$1=workInProgress.alternate;// See if beginning this work spawns more work.
startWorkTimer(workInProgress);{setCurrentFiber(workInProgress);}if(true&&replayFailedUnitOfWorkWithInvokeGuardedCallback){stashedWorkInProgressProperties=assignFiberPropertiesInDEV(stashedWorkInProgressProperties,workInProgress);}var next=void 0;if(enableProfilerTimer){if(workInProgress.mode&ProfileMode){startProfilerTimer(workInProgress);}next=beginWork(current$$1,workInProgress,nextRenderExpirationTime);if(workInProgress.mode&ProfileMode){// Record the render duration assuming we didn't bailout (or error).
stopProfilerTimerIfRunningAndRecordDelta(workInProgress,true);}}else{next=beginWork(current$$1,workInProgress,nextRenderExpirationTime);}{resetCurrentFiber();if(isReplayingFailedUnitOfWork){// Currently replaying a failed unit of work. This should be unreachable,
// because the render phase is meant to be idempotent, and it should
// have thrown again. Since it didn't, rethrow the original error, so
// React's internal stack is not misaligned.
rethrowOriginalError();}}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);}if(next===null){// If this doesn't spawn new work, complete the current work.
next=completeUnitOfWork(workInProgress);}ReactCurrentOwner$2.current=null;return next;}function workLoop(isYieldy){if(!isYieldy){// Flush work without yielding
while(nextUnitOfWork!==null){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}else{// Flush asynchronous work until the deadline runs out of time.
while(nextUnitOfWork!==null&&!shouldYield()){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}}function renderRoot(root,isYieldy,isExpired){!!isWorking?invariant(false,'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isWorking=true;ReactCurrentOwner$2.currentDispatcher=Dispatcher;var expirationTime=root.nextExpirationTimeToWorkOn;var prevInteractions=null;if(enableSchedulerTracing){// We're about to start new traced work.
// Restore pending interactions so cascading work triggered during the render phase will be accounted for.
prevInteractions=tracing.__interactionsRef.current;tracing.__interactionsRef.current=root.memoizedInteractions;}// Check if we're starting from a fresh stack, or if we're resuming from
// previously yielded work.
if(expirationTime!==nextRenderExpirationTime||root!==nextRoot||nextUnitOfWork===null){// Reset the stack and start working from the root.
resetStack();nextRoot=root;nextRenderExpirationTime=expirationTime;nextUnitOfWork=createWorkInProgress(nextRoot.current,null,nextRenderExpirationTime);root.pendingCommitExpirationTime=NoWork;if(enableSchedulerTracing){// Determine which interactions this batch of work currently includes,
// So that we can accurately attribute time spent working on it,
var interactions=new Set();root.pendingInteractionMap.forEach(function(scheduledInteractions,scheduledExpirationTime){if(scheduledExpirationTime<=expirationTime){scheduledInteractions.forEach(function(interaction){return interactions.add(interaction);});}});// Store the current set of interactions on the FiberRoot for a few reasons:
// We can re-use it in hot functions like renderRoot() without having to recalculate it.
// We will also use it in commitWork() to pass to any Profiler onRender() hooks.
// This also provides DevTools with a way to access it when the onCommitRoot() hook is called.
root.memoizedInteractions=interactions;if(interactions.size>0){var subscriber=tracing.__subscriberRef.current;if(subscriber!==null){var threadID=computeThreadID(expirationTime,root.interactionThreadID);try{subscriber.onWorkStarted(interactions,threadID);}catch(error){// Work thrown by an interaction tracing subscriber should be rethrown,
// But only once it's safe (to avoid leaveing the scheduler in an invalid state).
// Store the error for now and we'll re-throw in finishRendering().
if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}}}}}var didFatal=false;startWorkLoopTimer(nextUnitOfWork);do{try{workLoop(isYieldy);}catch(thrownValue){if(nextUnitOfWork===null){// This is a fatal error.
didFatal=true;onUncaughtError(thrownValue);}else{{// Reset global debug state
// We assume this is defined in DEV
resetCurrentlyProcessingQueue();}var failedUnitOfWork=nextUnitOfWork;if(true&&replayFailedUnitOfWorkWithInvokeGuardedCallback){replayUnitOfWork(failedUnitOfWork,thrownValue,isYieldy);}// TODO: we already know this isn't true in some cases.
// At least this shows a nicer error message until we figure out the cause.
// https://github.com/facebook/react/issues/12449#issuecomment-386727431
!(nextUnitOfWork!==null)?invariant(false,'Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.'):void 0;var sourceFiber=nextUnitOfWork;var returnFiber=sourceFiber.return;if(returnFiber===null){// This is the root. The root could capture its own errors. However,
// we don't know if it errors before or after we pushed the host
// context. This information is needed to avoid a stack mismatch.
// Because we're not sure, treat this as a fatal error. We could track
// which phase it fails in, but doesn't seem worth it. At least
// for now.
didFatal=true;onUncaughtError(thrownValue);}else{throwException(root,returnFiber,sourceFiber,thrownValue,nextRenderExpirationTime);nextUnitOfWork=completeUnitOfWork(sourceFiber);continue;}}}break;}while(true);if(enableSchedulerTracing){// Traced work is done for now; restore the previous interactions.
tracing.__interactionsRef.current=prevInteractions;}// We're done performing work. Time to clean up.
isWorking=false;ReactCurrentOwner$2.currentDispatcher=null;resetContextDependences();// Yield back to main thread.
if(didFatal){var _didCompleteRoot=false;stopWorkLoopTimer(interruptedBy,_didCompleteRoot);interruptedBy=null;// There was a fatal error.
{resetStackAfterFatalErrorInDev();}// `nextRoot` points to the in-progress root. A non-null value indicates
// that we're in the middle of an async render. Set it to null to indicate
// there's no more work to be done in the current batch.
nextRoot=null;onFatal(root);return;}if(nextUnitOfWork!==null){// There's still remaining async work in this tree, but we ran out of time
// in the current frame. Yield back to the renderer. Unless we're
// interrupted by a higher priority update, we'll continue later from where
// we left off.
var _didCompleteRoot2=false;stopWorkLoopTimer(interruptedBy,_didCompleteRoot2);interruptedBy=null;onYield(root);return;}// We completed the whole tree.
var didCompleteRoot=true;stopWorkLoopTimer(interruptedBy,didCompleteRoot);var rootWorkInProgress=root.current.alternate;!(rootWorkInProgress!==null)?invariant(false,'Finished root should have a work-in-progress. This error is likely caused by a bug in React. Please file an issue.'):void 0;// `nextRoot` points to the in-progress root. A non-null value indicates
// that we're in the middle of an async render. Set it to null to indicate
// there's no more work to be done in the current batch.
nextRoot=null;interruptedBy=null;if(nextRenderDidError){// There was an error
if(hasLowerPriorityWork(root,expirationTime)){// There's lower priority work. If so, it may have the effect of fixing
// the exception that was just thrown. Exit without committing. This is
// similar to a suspend, but without a timeout because we're not waiting
// for a promise to resolve. React will restart at the lower
// priority level.
markSuspendedPriorityLevel(root,expirationTime);var suspendedExpirationTime=expirationTime;var rootExpirationTime=root.expirationTime;onSuspend(root,rootWorkInProgress,suspendedExpirationTime,rootExpirationTime,-1// Indicates no timeout
);return;}else if(// There's no lower priority work, but we're rendering asynchronously.
// Synchronsouly attempt to render the same level one more time. This is
// similar to a suspend, but without a timeout because we're not waiting
// for a promise to resolve.
!root.didError&&!isExpired){root.didError=true;var _suspendedExpirationTime=root.nextExpirationTimeToWorkOn=expirationTime;var _rootExpirationTime=root.expirationTime=Sync;onSuspend(root,rootWorkInProgress,_suspendedExpirationTime,_rootExpirationTime,-1// Indicates no timeout
);return;}}if(enableSuspense&&!isExpired&&nextLatestAbsoluteTimeoutMs!==-1){// The tree was suspended.
var _suspendedExpirationTime2=expirationTime;markSuspendedPriorityLevel(root,_suspendedExpirationTime2);// Find the earliest uncommitted expiration time in the tree, including
// work that is suspended. The timeout threshold cannot be longer than
// the overall expiration.
var earliestExpirationTime=findEarliestOutstandingPriorityLevel(root,expirationTime);var earliestExpirationTimeMs=expirationTimeToMs(earliestExpirationTime);if(earliestExpirationTimeMs<nextLatestAbsoluteTimeoutMs){nextLatestAbsoluteTimeoutMs=earliestExpirationTimeMs;}// Subtract the current time from the absolute timeout to get the number
// of milliseconds until the timeout. In other words, convert an absolute
// timestamp to a relative time. This is the value that is passed
// to `setTimeout`.
var currentTimeMs=expirationTimeToMs(requestCurrentTime());var msUntilTimeout=nextLatestAbsoluteTimeoutMs-currentTimeMs;msUntilTimeout=msUntilTimeout<0?0:msUntilTimeout;// TODO: Account for the Just Noticeable Difference
var _rootExpirationTime2=root.expirationTime;onSuspend(root,rootWorkInProgress,_suspendedExpirationTime2,_rootExpirationTime2,msUntilTimeout);return;}// Ready to commit.
onComplete(root,rootWorkInProgress,expirationTime);}function dispatch(sourceFiber,value,expirationTime){!(!isWorking||isCommitting$1)?invariant(false,'dispatch: Cannot dispatch during the render phase.'):void 0;var fiber=sourceFiber.return;while(fiber!==null){switch(fiber.tag){case ClassComponent:case ClassComponentLazy:var ctor=fiber.type;var instance=fiber.stateNode;if(typeof ctor.getDerivedStateFromCatch==='function'||typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance)){var errorInfo=createCapturedValue(value,sourceFiber);var update=createClassErrorUpdate(fiber,errorInfo,expirationTime);enqueueUpdate(fiber,update);scheduleWork(fiber,expirationTime);return;}break;case HostRoot:{var _errorInfo=createCapturedValue(value,sourceFiber);var _update=createRootErrorUpdate(fiber,_errorInfo,expirationTime);enqueueUpdate(fiber,_update);scheduleWork(fiber,expirationTime);return;}}fiber=fiber.return;}if(sourceFiber.tag===HostRoot){// Error was thrown at the root. There is no parent, so the root
// itself should capture it.
var rootFiber=sourceFiber;var _errorInfo2=createCapturedValue(value,rootFiber);var _update2=createRootErrorUpdate(rootFiber,_errorInfo2,expirationTime);enqueueUpdate(rootFiber,_update2);scheduleWork(rootFiber,expirationTime);}}function captureCommitPhaseError(fiber,error){return dispatch(fiber,error,Sync);}function computeThreadID(expirationTime,interactionThreadID){// Interaction threads are unique per root and expiration time.
return expirationTime*1000+interactionThreadID;}// Creates a unique async expiration time.
function computeUniqueAsyncExpiration(){var currentTime=requestCurrentTime();var result=computeAsyncExpiration(currentTime);if(result<=lastUniqueAsyncExpiration){// Since we assume the current time monotonically increases, we only hit
// this branch when computeUniqueAsyncExpiration is fired multiple times
// within a 200ms window (or whatever the async bucket size is).
result=lastUniqueAsyncExpiration+1;}lastUniqueAsyncExpiration=result;return lastUniqueAsyncExpiration;}function computeExpirationForFiber(currentTime,fiber){var expirationTime=void 0;if(expirationContext!==NoWork){// An explicit expiration context was set;
expirationTime=expirationContext;}else if(isWorking){if(isCommitting$1){// Updates that occur during the commit phase should have sync priority
// by default.
expirationTime=Sync;}else{// Updates during the render phase should expire at the same time as
// the work that is being rendered.
expirationTime=nextRenderExpirationTime;}}else{// No explicit expiration context was set, and we're not currently
// performing work. Calculate a new expiration time.
if(fiber.mode&AsyncMode){if(isBatchingInteractiveUpdates){// This is an interactive update
expirationTime=computeInteractiveExpiration(currentTime);}else{// This is an async update
expirationTime=computeAsyncExpiration(currentTime);}// If we're in the middle of rendering a tree, do not update at the same
// expiration time that is already rendering.
if(nextRoot!==null&&expirationTime===nextRenderExpirationTime){expirationTime+=1;}}else{// This is a sync update
expirationTime=Sync;}}if(isBatchingInteractiveUpdates){// This is an interactive update. Keep track of the lowest pending
// interactive expiration time. This allows us to synchronously flush
// all interactive updates when needed.
if(lowestPriorityPendingInteractiveExpirationTime===NoWork||expirationTime>lowestPriorityPendingInteractiveExpirationTime){lowestPriorityPendingInteractiveExpirationTime=expirationTime;}}return expirationTime;}function renderDidSuspend(root,absoluteTimeoutMs,suspendedTime){// Schedule the timeout.
if(absoluteTimeoutMs>=0&&nextLatestAbsoluteTimeoutMs<absoluteTimeoutMs){nextLatestAbsoluteTimeoutMs=absoluteTimeoutMs;}}function renderDidError(){nextRenderDidError=true;}function retrySuspendedRoot(root,fiber,suspendedTime){if(enableSuspense){var retryTime=void 0;if(isPriorityLevelSuspended(root,suspendedTime)){// Ping at the original level
retryTime=suspendedTime;markPingedPriorityLevel(root,retryTime);}else{// Placeholder already timed out. Compute a new expiration time
var currentTime=requestCurrentTime();retryTime=computeExpirationForFiber(currentTime,fiber);markPendingPriorityLevel(root,retryTime);}scheduleWorkToRoot(fiber,retryTime);var rootExpirationTime=root.expirationTime;if(rootExpirationTime!==NoWork){if(enableSchedulerTracing){// Restore previous interactions so that new work is associated with them.
var prevInteractions=tracing.__interactionsRef.current;tracing.__interactionsRef.current=root.memoizedInteractions;// Because suspense timeouts do not decrement the interaction count,
// Continued suspense work should also not increment the count.
storeInteractionsForExpirationTime(root,rootExpirationTime,false);requestWork(root,rootExpirationTime);tracing.__interactionsRef.current=prevInteractions;}else{requestWork(root,rootExpirationTime);}}}}function scheduleWorkToRoot(fiber,expirationTime){// Update the source fiber's expiration time
if(fiber.expirationTime===NoWork||fiber.expirationTime>expirationTime){fiber.expirationTime=expirationTime;}var alternate=fiber.alternate;if(alternate!==null&&(alternate.expirationTime===NoWork||alternate.expirationTime>expirationTime)){alternate.expirationTime=expirationTime;}// Walk the parent path to the root and update the child expiration time.
var node=fiber.return;if(node===null&&fiber.tag===HostRoot){return fiber.stateNode;}while(node!==null){alternate=node.alternate;if(node.childExpirationTime===NoWork||node.childExpirationTime>expirationTime){node.childExpirationTime=expirationTime;if(alternate!==null&&(alternate.childExpirationTime===NoWork||alternate.childExpirationTime>expirationTime)){alternate.childExpirationTime=expirationTime;}}else if(alternate!==null&&(alternate.childExpirationTime===NoWork||alternate.childExpirationTime>expirationTime)){alternate.childExpirationTime=expirationTime;}if(node.return===null&&node.tag===HostRoot){return node.stateNode;}node=node.return;}return null;}function storeInteractionsForExpirationTime(root,expirationTime,updateInteractionCounts){if(!enableSchedulerTracing){return;}var interactions=tracing.__interactionsRef.current;if(interactions.size>0){var pendingInteractions=root.pendingInteractionMap.get(expirationTime);if(pendingInteractions!=null){interactions.forEach(function(interaction){if(updateInteractionCounts&&!pendingInteractions.has(interaction)){// Update the pending async work count for previously unscheduled interaction.
interaction.__count++;}pendingInteractions.add(interaction);});}else{root.pendingInteractionMap.set(expirationTime,new Set(interactions));// Update the pending async work count for the current interactions.
if(updateInteractionCounts){interactions.forEach(function(interaction){interaction.__count++;});}}var subscriber=tracing.__subscriberRef.current;if(subscriber!==null){var threadID=computeThreadID(expirationTime,root.interactionThreadID);subscriber.onWorkScheduled(interactions,threadID);}}}function scheduleWork(fiber,expirationTime){recordScheduleUpdate();{if(fiber.tag===ClassComponent||fiber.tag===ClassComponentLazy){var instance=fiber.stateNode;warnAboutInvalidUpdates(instance);}}var root=scheduleWorkToRoot(fiber,expirationTime);if(root===null){if(true&&(fiber.tag===ClassComponent||fiber.tag===ClassComponentLazy)){warnAboutUpdateOnUnmounted(fiber);}return;}if(enableSchedulerTracing){storeInteractionsForExpirationTime(root,expirationTime,true);}if(!isWorking&&nextRenderExpirationTime!==NoWork&&expirationTime<nextRenderExpirationTime){// This is an interruption. (Used for performance tracking.)
interruptedBy=fiber;resetStack();}markPendingPriorityLevel(root,expirationTime);if(// If we're in the render phase, we don't need to schedule this root
// for an update, because we'll do it before we exit...
!isWorking||isCommitting$1||// ...unless this is a different root than the one we're rendering.
nextRoot!==root){var rootExpirationTime=root.expirationTime;requestWork(root,rootExpirationTime);}if(nestedUpdateCount>NESTED_UPDATE_LIMIT){// Reset this back to zero so subsequent updates don't throw.
nestedUpdateCount=0;invariant(false,'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');}}function syncUpdates(fn,a,b,c,d){var previousExpirationContext=expirationContext;expirationContext=Sync;try{return fn(a,b,c,d);}finally{expirationContext=previousExpirationContext;}}// TODO: Everything below this is written as if it has been lifted to the
// renderers. I'll do this in a follow-up.
// Linked-list of roots
var firstScheduledRoot=null;var lastScheduledRoot=null;var callbackExpirationTime=NoWork;var callbackID=void 0;var isRendering=false;var nextFlushedRoot=null;var nextFlushedExpirationTime=NoWork;var lowestPriorityPendingInteractiveExpirationTime=NoWork;var deadlineDidExpire=false;var hasUnhandledError=false;var unhandledError=null;var deadline=null;var isBatchingUpdates=false;var isUnbatchingUpdates=false;var isBatchingInteractiveUpdates=false;var completedBatches=null;var originalStartTimeMs=schedule.unstable_now();var currentRendererTime=msToExpirationTime(originalStartTimeMs);var currentSchedulerTime=currentRendererTime;// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT=50;var nestedUpdateCount=0;var lastCommittedRootDuringThisBatch=null;var timeHeuristicForUnitOfWork=1;function recomputeCurrentRendererTime(){var currentTimeMs=schedule.unstable_now()-originalStartTimeMs;currentRendererTime=msToExpirationTime(currentTimeMs);}function scheduleCallbackWithExpirationTime(root,expirationTime){if(callbackExpirationTime!==NoWork){// A callback is already scheduled. Check its expiration time (timeout).
if(expirationTime>callbackExpirationTime){// Existing callback has sufficient timeout. Exit.
return;}else{if(callbackID!==null){// Existing callback has insufficient timeout. Cancel and schedule a
// new one.
schedule.unstable_cancelScheduledWork(callbackID);}}// The request callback timer is already running. Don't start a new one.
}else{startRequestCallbackTimer();}callbackExpirationTime=expirationTime;var currentMs=schedule.unstable_now()-originalStartTimeMs;var expirationTimeMs=expirationTimeToMs(expirationTime);var timeout=expirationTimeMs-currentMs;callbackID=schedule.unstable_scheduleWork(performAsyncWork,{timeout:timeout});}// For every call to renderRoot, one of onFatal, onComplete, onSuspend, and
// onYield is called upon exiting. We use these in lieu of returning a tuple.
// I've also chosen not to inline them into renderRoot because these will
// eventually be lifted into the renderer.
function onFatal(root){root.finishedWork=null;}function onComplete(root,finishedWork,expirationTime){root.pendingCommitExpirationTime=expirationTime;root.finishedWork=finishedWork;}function onSuspend(root,finishedWork,suspendedExpirationTime,rootExpirationTime,msUntilTimeout){root.expirationTime=rootExpirationTime;if(enableSuspense&&msUntilTimeout===0&&!shouldYield()){// Don't wait an additional tick. Commit the tree immediately.
root.pendingCommitExpirationTime=suspendedExpirationTime;root.finishedWork=finishedWork;}else if(msUntilTimeout>0){// Wait `msUntilTimeout` milliseconds before committing.
root.timeoutHandle=scheduleTimeout(onTimeout.bind(null,root,finishedWork,suspendedExpirationTime),msUntilTimeout);}}function onYield(root){root.finishedWork=null;}function onTimeout(root,finishedWork,suspendedExpirationTime){if(enableSuspense){// The root timed out. Commit it.
root.pendingCommitExpirationTime=suspendedExpirationTime;root.finishedWork=finishedWork;// Read the current time before entering the commit phase. We can be
// certain this won't cause tearing related to batching of event updates
// because we're at the top of a timer event.
recomputeCurrentRendererTime();currentSchedulerTime=currentRendererTime;if(enableSchedulerTracing){// Don't update pending interaction counts for suspense timeouts,
// Because we know we still need to do more work in this case.
suspenseDidTimeout=true;flushRoot(root,suspendedExpirationTime);suspenseDidTimeout=false;}else{flushRoot(root,suspendedExpirationTime);}}}function onCommit(root,expirationTime){root.expirationTime=expirationTime;root.finishedWork=null;}function requestCurrentTime(){// requestCurrentTime is called by the scheduler to compute an expiration
// time.
//
// Expiration times are computed by adding to the current time (the start
// time). However, if two updates are scheduled within the same event, we
// should treat their start times as simultaneous, even if the actual clock
// time has advanced between the first and second call.
// In other words, because expiration times determine how updates are batched,
// we want all updates of like priority that occur within the same event to
// receive the same expiration time. Otherwise we get tearing.
//
// We keep track of two separate times: the current "renderer" time and the
// current "scheduler" time. The renderer time can be updated whenever; it
// only exists to minimize the calls performance.now.
//
// But the scheduler time can only be updated if there's no pending work, or
// if we know for certain that we're not in the middle of an event.
if(isRendering){// We're already rendering. Return the most recently read time.
return currentSchedulerTime;}// Check if there's pending work.
findHighestPriorityRoot();if(nextFlushedExpirationTime===NoWork||nextFlushedExpirationTime===Never){// If there's no pending work, or if the pending work is offscreen, we can
// read the current time without risk of tearing.
recomputeCurrentRendererTime();currentSchedulerTime=currentRendererTime;return currentSchedulerTime;}// There's already pending work. We might be in the middle of a browser
// event. If we were to read the current time, it could cause multiple updates
// within the same event to receive different expiration times, leading to
// tearing. Return the last read time. During the next idle callback, the
// time will be updated.
return currentSchedulerTime;}// requestWork is called by the scheduler whenever a root receives an update.
// It's up to the renderer to call renderRoot at some point in the future.
function requestWork(root,expirationTime){addRootToSchedule(root,expirationTime);if(isRendering){// Prevent reentrancy. Remaining work will be scheduled at the end of
// the currently rendering batch.
return;}if(isBatchingUpdates){// Flush work at the end of the batch.
if(isUnbatchingUpdates){// ...unless we're inside unbatchedUpdates, in which case we should
// flush it now.
nextFlushedRoot=root;nextFlushedExpirationTime=Sync;performWorkOnRoot(root,Sync,true);}return;}// TODO: Get rid of Sync and use current time?
if(expirationTime===Sync){performSyncWork();}else{scheduleCallbackWithExpirationTime(root,expirationTime);}}function addRootToSchedule(root,expirationTime){// Add the root to the schedule.
// Check if this root is already part of the schedule.
if(root.nextScheduledRoot===null){// This root is not already scheduled. Add it.
root.expirationTime=expirationTime;if(lastScheduledRoot===null){firstScheduledRoot=lastScheduledRoot=root;root.nextScheduledRoot=root;}else{lastScheduledRoot.nextScheduledRoot=root;lastScheduledRoot=root;lastScheduledRoot.nextScheduledRoot=firstScheduledRoot;}}else{// This root is already scheduled, but its priority may have increased.
var remainingExpirationTime=root.expirationTime;if(remainingExpirationTime===NoWork||expirationTime<remainingExpirationTime){// Update the priority.
root.expirationTime=expirationTime;}}}function findHighestPriorityRoot(){var highestPriorityWork=NoWork;var highestPriorityRoot=null;if(lastScheduledRoot!==null){var previousScheduledRoot=lastScheduledRoot;var root=firstScheduledRoot;while(root!==null){var remainingExpirationTime=root.expirationTime;if(remainingExpirationTime===NoWork){// This root no longer has work. Remove it from the scheduler.
// TODO: This check is redudant, but Flow is confused by the branch
// below where we set lastScheduledRoot to null, even though we break
// from the loop right after.
!(previousScheduledRoot!==null&&lastScheduledRoot!==null)?invariant(false,'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(root===root.nextScheduledRoot){// This is the only root in the list.
root.nextScheduledRoot=null;firstScheduledRoot=lastScheduledRoot=null;break;}else if(root===firstScheduledRoot){// This is the first root in the list.
var next=root.nextScheduledRoot;firstScheduledRoot=next;lastScheduledRoot.nextScheduledRoot=next;root.nextScheduledRoot=null;}else if(root===lastScheduledRoot){// This is the last root in the list.
lastScheduledRoot=previousScheduledRoot;lastScheduledRoot.nextScheduledRoot=firstScheduledRoot;root.nextScheduledRoot=null;break;}else{previousScheduledRoot.nextScheduledRoot=root.nextScheduledRoot;root.nextScheduledRoot=null;}root=previousScheduledRoot.nextScheduledRoot;}else{if(highestPriorityWork===NoWork||remainingExpirationTime<highestPriorityWork){// Update the priority, if it's higher
highestPriorityWork=remainingExpirationTime;highestPriorityRoot=root;}if(root===lastScheduledRoot){break;}if(highestPriorityWork===Sync){// Sync is highest priority by definition so
// we can stop searching.
break;}previousScheduledRoot=root;root=root.nextScheduledRoot;}}}nextFlushedRoot=highestPriorityRoot;nextFlushedExpirationTime=highestPriorityWork;}function performAsyncWork(dl){if(dl.didTimeout){// The callback timed out. That means at least one update has expired.
// Iterate through the root schedule. If they contain expired work, set
// the next render expiration time to the current time. This has the effect
// of flushing all expired work in a single batch, instead of flushing each
// level one at a time.
if(firstScheduledRoot!==null){recomputeCurrentRendererTime();var root=firstScheduledRoot;do{didExpireAtExpirationTime(root,currentRendererTime);// The root schedule is circular, so this is never null.
root=root.nextScheduledRoot;}while(root!==firstScheduledRoot);}}performWork(NoWork,dl);}function performSyncWork(){performWork(Sync,null);}function performWork(minExpirationTime,dl){deadline=dl;// Keep working on roots until there's no more work, or until we reach
// the deadline.
findHighestPriorityRoot();if(deadline!==null){recomputeCurrentRendererTime();currentSchedulerTime=currentRendererTime;if(enableUserTimingAPI){var didExpire=nextFlushedExpirationTime<currentRendererTime;var timeout=expirationTimeToMs(nextFlushedExpirationTime);stopRequestCallbackTimer(didExpire,timeout);}while(nextFlushedRoot!==null&&nextFlushedExpirationTime!==NoWork&&(minExpirationTime===NoWork||minExpirationTime>=nextFlushedExpirationTime)&&(!deadlineDidExpire||currentRendererTime>=nextFlushedExpirationTime)){performWorkOnRoot(nextFlushedRoot,nextFlushedExpirationTime,currentRendererTime>=nextFlushedExpirationTime);findHighestPriorityRoot();recomputeCurrentRendererTime();currentSchedulerTime=currentRendererTime;}}else{while(nextFlushedRoot!==null&&nextFlushedExpirationTime!==NoWork&&(minExpirationTime===NoWork||minExpirationTime>=nextFlushedExpirationTime)){performWorkOnRoot(nextFlushedRoot,nextFlushedExpirationTime,true);findHighestPriorityRoot();}}// We're done flushing work. Either we ran out of time in this callback,
// or there's no more work left with sufficient priority.
// If we're inside a callback, set this to false since we just completed it.
if(deadline!==null){callbackExpirationTime=NoWork;callbackID=null;}// If there's work left over, schedule a new callback.
if(nextFlushedExpirationTime!==NoWork){scheduleCallbackWithExpirationTime(nextFlushedRoot,nextFlushedExpirationTime);}// Clean-up.
deadline=null;deadlineDidExpire=false;finishRendering();}function flushRoot(root,expirationTime){!!isRendering?invariant(false,'work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method.'):void 0;// Perform work on root as if the given expiration time is the current time.
// This has the effect of synchronously flushing all work up to and
// including the given time.
nextFlushedRoot=root;nextFlushedExpirationTime=expirationTime;performWorkOnRoot(root,expirationTime,true);// Flush any sync work that was scheduled by lifecycles
performSyncWork();}function finishRendering(){nestedUpdateCount=0;lastCommittedRootDuringThisBatch=null;if(completedBatches!==null){var batches=completedBatches;completedBatches=null;for(var i=0;i<batches.length;i++){var batch=batches[i];try{batch._onComplete();}catch(error){if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}}}if(hasUnhandledError){var error=unhandledError;unhandledError=null;hasUnhandledError=false;throw error;}}function performWorkOnRoot(root,expirationTime,isExpired){!!isRendering?invariant(false,'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isRendering=true;// Check if this is async work or sync/expired work.
if(deadline===null||isExpired){// Flush work without yielding.
// TODO: Non-yieldy work does not necessarily imply expired work. A renderer
// may want to perform some work without yielding, but also without
// requiring the root to complete (by triggering placeholders).
var finishedWork=root.finishedWork;if(finishedWork!==null){// This root is already complete. We can commit it.
completeRoot(root,finishedWork,expirationTime);}else{root.finishedWork=null;// If this root previously suspended, clear its existing timeout, since
// we're about to try rendering again.
var timeoutHandle=root.timeoutHandle;if(enableSuspense&&timeoutHandle!==noTimeout){root.timeoutHandle=noTimeout;// $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
cancelTimeout(timeoutHandle);}var isYieldy=false;renderRoot(root,isYieldy,isExpired);finishedWork=root.finishedWork;if(finishedWork!==null){// We've completed the root. Commit it.
completeRoot(root,finishedWork,expirationTime);}}}else{// Flush async work.
var _finishedWork=root.finishedWork;if(_finishedWork!==null){// This root is already complete. We can commit it.
completeRoot(root,_finishedWork,expirationTime);}else{root.finishedWork=null;// If this root previously suspended, clear its existing timeout, since
// we're about to try rendering again.
var _timeoutHandle=root.timeoutHandle;if(enableSuspense&&_timeoutHandle!==noTimeout){root.timeoutHandle=noTimeout;// $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
cancelTimeout(_timeoutHandle);}var _isYieldy=true;renderRoot(root,_isYieldy,isExpired);_finishedWork=root.finishedWork;if(_finishedWork!==null){// We've completed the root. Check the deadline one more time
// before committing.
if(!shouldYield()){// Still time left. Commit the root.
completeRoot(root,_finishedWork,expirationTime);}else{// There's no time left. Mark this root as complete. We'll come
// back and commit it later.
root.finishedWork=_finishedWork;}}}}isRendering=false;}function completeRoot(root,finishedWork,expirationTime){// Check if there's a batch that matches this expiration time.
var firstBatch=root.firstBatch;if(firstBatch!==null&&firstBatch._expirationTime<=expirationTime){if(completedBatches===null){completedBatches=[firstBatch];}else{completedBatches.push(firstBatch);}if(firstBatch._defer){// This root is blocked from committing by a batch. Unschedule it until
// we receive another update.
root.finishedWork=finishedWork;root.expirationTime=NoWork;return;}}// Commit the root.
root.finishedWork=null;// Check if this is a nested update (a sync update scheduled during the
// commit phase).
if(root===lastCommittedRootDuringThisBatch){// If the next root is the same as the previous root, this is a nested
// update. To prevent an infinite loop, increment the nested update count.
nestedUpdateCount++;}else{// Reset whenever we switch roots.
lastCommittedRootDuringThisBatch=root;nestedUpdateCount=0;}commitRoot(root,finishedWork);}// When working on async work, the reconciler asks the renderer if it should
// yield execution. For DOM, we implement this with requestIdleCallback.
function shouldYield(){if(deadlineDidExpire){return true;}if(deadline===null||deadline.timeRemaining()>timeHeuristicForUnitOfWork){// Disregard deadline.didTimeout. Only expired work should be flushed
// during a timeout. This path is only hit for non-expired work.
return false;}deadlineDidExpire=true;return true;}function onUncaughtError(error){!(nextFlushedRoot!==null)?invariant(false,'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.'):void 0;// Unschedule this root so we don't work on it again until there's
// another update.
nextFlushedRoot.expirationTime=NoWork;if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function batchedUpdates$1(fn,a){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return fn(a);}finally{isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performSyncWork();}}}// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function unbatchedUpdates(fn,a){if(isBatchingUpdates&&!isUnbatchingUpdates){isUnbatchingUpdates=true;try{return fn(a);}finally{isUnbatchingUpdates=false;}}return fn(a);}// TODO: Batching should be implemented at the renderer level, not within
// the reconciler.
function flushSync(fn,a){!!isRendering?invariant(false,'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.'):void 0;var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return syncUpdates(fn,a);}finally{isBatchingUpdates=previousIsBatchingUpdates;performSyncWork();}}function interactiveUpdates$1(fn,a,b){if(isBatchingInteractiveUpdates){return fn(a,b);}// If there are any pending interactive updates, synchronously flush them.
// This needs to happen before we read any handlers, because the effect of
// the previous event may influence which handlers are called during
// this event.
if(!isBatchingUpdates&&!isRendering&&lowestPriorityPendingInteractiveExpirationTime!==NoWork){// Synchronously flush pending interactive updates.
performWork(lowestPriorityPendingInteractiveExpirationTime,null);lowestPriorityPendingInteractiveExpirationTime=NoWork;}var previousIsBatchingInteractiveUpdates=isBatchingInteractiveUpdates;var previousIsBatchingUpdates=isBatchingUpdates;isBatchingInteractiveUpdates=true;isBatchingUpdates=true;try{return fn(a,b);}finally{isBatchingInteractiveUpdates=previousIsBatchingInteractiveUpdates;isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performSyncWork();}}}function flushInteractiveUpdates$1(){if(!isRendering&&lowestPriorityPendingInteractiveExpirationTime!==NoWork){// Synchronously flush pending interactive updates.
performWork(lowestPriorityPendingInteractiveExpirationTime,null);lowestPriorityPendingInteractiveExpirationTime=NoWork;}}function flushControlled(fn){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{syncUpdates(fn);}finally{isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performSyncWork();}}}// 0 is PROD, 1 is DEV.
// Might add PROFILE later.
var didWarnAboutNestedUpdates=void 0;{didWarnAboutNestedUpdates=false;}function getContextForSubtree(parentComponent){if(!parentComponent){return emptyContextObject;}var fiber=get(parentComponent);var parentContext=findCurrentUnmaskedContext(fiber);if(fiber.tag===ClassComponent){var Component=fiber.type;if(isContextProvider(Component)){return processChildContext(fiber,Component,parentContext);}}else if(fiber.tag===ClassComponentLazy){var _Component=getResultFromResolvedThenable(fiber.type);if(isContextProvider(_Component)){return processChildContext(fiber,_Component,parentContext);}}return parentContext;}function scheduleRootUpdate(current$$1,element,expirationTime,callback){{if(phase==='render'&&current!==null&&!didWarnAboutNestedUpdates){didWarnAboutNestedUpdates=true;warningWithoutStack$1(false,'Render methods should be a pure function of props and state; '+'triggering nested component updates from render is not allowed. '+'If necessary, trigger nested updates in componentDidUpdate.\n\n'+'Check the render method of %s.',getComponentName(current.type)||'Unknown');}}var update=createUpdate(expirationTime);// Caution: React DevTools currently depends on this property
// being called "element".
update.payload={element:element};callback=callback===undefined?null:callback;if(callback!==null){!(typeof callback==='function')?warningWithoutStack$1(false,'render(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callback):void 0;update.callback=callback;}enqueueUpdate(current$$1,update);scheduleWork(current$$1,expirationTime);return expirationTime;}function updateContainerAtExpirationTime(element,container,parentComponent,expirationTime,callback){// TODO: If this is a nested container, this won't be the root.
var current$$1=container.current;{if(ReactFiberInstrumentation_1.debugTool){if(current$$1.alternate===null){ReactFiberInstrumentation_1.debugTool.onMountContainer(container);}else if(element===null){ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);}else{ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);}}}var context=getContextForSubtree(parentComponent);if(container.context===null){container.context=context;}else{container.pendingContext=context;}return scheduleRootUpdate(current$$1,element,expirationTime,callback);}function findHostInstance(component){var fiber=get(component);if(fiber===undefined){if(typeof component.render==='function'){invariant(false,'Unable to find node on an unmounted component.');}else{invariant(false,'Argument appears to not be a ReactComponent. Keys: %s',Object.keys(component));}}var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}function createContainer(containerInfo,isAsync,hydrate){return createFiberRoot(containerInfo,isAsync,hydrate);}function updateContainer(element,container,parentComponent,callback){var current$$1=container.current;var currentTime=requestCurrentTime();var expirationTime=computeExpirationForFiber(currentTime,current$$1);return updateContainerAtExpirationTime(element,container,parentComponent,expirationTime,callback);}function getPublicRootInstance(container){var containerFiber=container.current;if(!containerFiber.child){return null;}switch(containerFiber.child.tag){case HostComponent:return getPublicInstance(containerFiber.child.stateNode);default:return containerFiber.child.stateNode;}}function findHostInstanceWithNoPortals(fiber){var hostFiber=findCurrentHostFiberWithNoPortals(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}function injectIntoDevTools(devToolsConfig){var findFiberByHostInstance=devToolsConfig.findFiberByHostInstance;return injectInternals(_assign({},devToolsConfig,{findHostInstanceByFiber:function(fiber){var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;},findFiberByHostInstance:function(instance){if(!findFiberByHostInstance){// Might not be implemented by the renderer.
return null;}return findFiberByHostInstance(instance);}}));}// This file intentionally does *not* have the Flow annotation.
// Don't add it. See `./inline-typed.js` for an explanation.
function createPortal$1(children,containerInfo,// TODO: figure out the API for cross-renderer implementation.
implementation){var key=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;return{// This tag allow us to uniquely identify this as a React Portal
$$typeof:REACT_PORTAL_TYPE,key:key==null?null:''+key,children:children,containerInfo:containerInfo,implementation:implementation};}// TODO: this is special because it gets imported during build.
var ReactVersion='16.5.2';// TODO: This type is shared between the reconciler and ReactDOM, but will
// eventually be lifted out to the renderer.
var ReactCurrentOwner=ReactSharedInternals.ReactCurrentOwner;var topLevelUpdateWarnings=void 0;var warnOnInvalidCallback=void 0;var didWarnAboutUnstableCreatePortal=false;{if(typeof Map!=='function'||// $FlowIssue Flow incorrectly thinks Map has no prototype
Map.prototype==null||typeof Map.prototype.forEach!=='function'||typeof Set!=='function'||// $FlowIssue Flow incorrectly thinks Set has no prototype
Set.prototype==null||typeof Set.prototype.clear!=='function'||typeof Set.prototype.forEach!=='function'){warningWithoutStack$1(false,'React depends on Map and Set built-in types. Make sure that you load a '+'polyfill in older browsers. https://fb.me/react-polyfills');}topLevelUpdateWarnings=function(container){if(container._reactRootContainer&&container.nodeType!==COMMENT_NODE){var hostInstance=findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);if(hostInstance){!(hostInstance.parentNode===container)?warningWithoutStack$1(false,'render(...): It looks like the React-rendered content of this '+'container was removed without using React. This is not '+'supported and will cause errors. Instead, call '+'ReactDOM.unmountComponentAtNode to empty a container.'):void 0;}}var isRootRenderedBySomeReact=!!container._reactRootContainer;var rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(rootEl&&getInstanceFromNode$1(rootEl));!(!hasNonRootReactChild||isRootRenderedBySomeReact)?warningWithoutStack$1(false,'render(...): Replacing React-rendered children with a new root '+'component. If you intended to update the children of this node, '+'you should instead have the existing children update their state '+'and render the new components instead of calling ReactDOM.render.'):void 0;!(container.nodeType!==ELEMENT_NODE||!container.tagName||container.tagName.toUpperCase()!=='BODY')?warningWithoutStack$1(false,'render(): Rendering components directly into document.body is '+'discouraged, since its children are often manipulated by third-party '+'scripts and browser extensions. This may lead to subtle '+'reconciliation issues. Try rendering into a container element created '+'for your app.'):void 0;};warnOnInvalidCallback=function(callback,callerName){!(callback===null||typeof callback==='function')?warningWithoutStack$1(false,'%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback):void 0;};}setRestoreImplementation(restoreControlledState$1);/* eslint-disable no-use-before-define */ /* eslint-enable no-use-before-define */function ReactBatch(root){var expirationTime=computeUniqueAsyncExpiration();this._expirationTime=expirationTime;this._root=root;this._next=null;this._callbacks=null;this._didComplete=false;this._hasChildren=false;this._children=null;this._defer=true;}ReactBatch.prototype.render=function(children){!this._defer?invariant(false,'batch.render: Cannot render a batch that already committed.'):void 0;this._hasChildren=true;this._children=children;var internalRoot=this._root._internalRoot;var expirationTime=this._expirationTime;var work=new ReactWork();updateContainerAtExpirationTime(children,internalRoot,null,expirationTime,work._onCommit);return work;};ReactBatch.prototype.then=function(onComplete){if(this._didComplete){onComplete();return;}var callbacks=this._callbacks;if(callbacks===null){callbacks=this._callbacks=[];}callbacks.push(onComplete);};ReactBatch.prototype.commit=function(){var internalRoot=this._root._internalRoot;var firstBatch=internalRoot.firstBatch;!(this._defer&&firstBatch!==null)?invariant(false,'batch.commit: Cannot commit a batch multiple times.'):void 0;if(!this._hasChildren){// This batch is empty. Return.
this._next=null;this._defer=false;return;}var expirationTime=this._expirationTime;// Ensure this is the first batch in the list.
if(firstBatch!==this){// This batch is not the earliest batch. We need to move it to the front.
// Update its expiration time to be the expiration time of the earliest
// batch, so that we can flush it without flushing the other batches.
if(this._hasChildren){expirationTime=this._expirationTime=firstBatch._expirationTime;// Rendering this batch again ensures its children will be the final state
// when we flush (updates are processed in insertion order: last
// update wins).
// TODO: This forces a restart. Should we print a warning?
this.render(this._children);}// Remove the batch from the list.
var previous=null;var batch=firstBatch;while(batch!==this){previous=batch;batch=batch._next;}!(previous!==null)?invariant(false,'batch.commit: Cannot commit a batch multiple times.'):void 0;previous._next=batch._next;// Add it to the front.
this._next=firstBatch;firstBatch=internalRoot.firstBatch=this;}// Synchronously flush all the work up to this batch's expiration time.
this._defer=false;flushRoot(internalRoot,expirationTime);// Pop the batch from the list.
var next=this._next;this._next=null;firstBatch=internalRoot.firstBatch=next;// Append the next earliest batch's children to the update queue.
if(firstBatch!==null&&firstBatch._hasChildren){firstBatch.render(firstBatch._children);}};ReactBatch.prototype._onComplete=function(){if(this._didComplete){return;}this._didComplete=true;var callbacks=this._callbacks;if(callbacks===null){return;}// TODO: Error handling.
for(var i=0;i<callbacks.length;i++){var _callback=callbacks[i];_callback();}};function ReactWork(){this._callbacks=null;this._didCommit=false;// TODO: Avoid need to bind by replacing callbacks in the update queue with
// list of Work objects.
this._onCommit=this._onCommit.bind(this);}ReactWork.prototype.then=function(onCommit){if(this._didCommit){onCommit();return;}var callbacks=this._callbacks;if(callbacks===null){callbacks=this._callbacks=[];}callbacks.push(onCommit);};ReactWork.prototype._onCommit=function(){if(this._didCommit){return;}this._didCommit=true;var callbacks=this._callbacks;if(callbacks===null){return;}// TODO: Error handling.
for(var i=0;i<callbacks.length;i++){var _callback2=callbacks[i];!(typeof _callback2==='function')?invariant(false,'Invalid argument passed as callback. Expected a function. Instead received: %s',_callback2):void 0;_callback2();}};function ReactRoot(container,isAsync,hydrate){var root=createContainer(container,isAsync,hydrate);this._internalRoot=root;}ReactRoot.prototype.render=function(children,callback){var root=this._internalRoot;var work=new ReactWork();callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'render');}if(callback!==null){work.then(callback);}updateContainer(children,root,null,work._onCommit);return work;};ReactRoot.prototype.unmount=function(callback){var root=this._internalRoot;var work=new ReactWork();callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'render');}if(callback!==null){work.then(callback);}updateContainer(null,root,null,work._onCommit);return work;};ReactRoot.prototype.legacy_renderSubtreeIntoContainer=function(parentComponent,children,callback){var root=this._internalRoot;var work=new ReactWork();callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'render');}if(callback!==null){work.then(callback);}updateContainer(children,root,parentComponent,work._onCommit);return work;};ReactRoot.prototype.createBatch=function(){var batch=new ReactBatch(this);var expirationTime=batch._expirationTime;var internalRoot=this._internalRoot;var firstBatch=internalRoot.firstBatch;if(firstBatch===null){internalRoot.firstBatch=batch;batch._next=null;}else{// Insert sorted by expiration time then insertion order
var insertAfter=null;var insertBefore=firstBatch;while(insertBefore!==null&&insertBefore._expirationTime<=expirationTime){insertAfter=insertBefore;insertBefore=insertBefore._next;}batch._next=insertBefore;if(insertAfter!==null){insertAfter._next=batch;}}return batch;};/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */function isValidContainer(node){return!!(node&&(node.nodeType===ELEMENT_NODE||node.nodeType===DOCUMENT_NODE||node.nodeType===DOCUMENT_FRAGMENT_NODE||node.nodeType===COMMENT_NODE&&node.nodeValue===' react-mount-point-unstable '));}function getReactRootElementInContainer(container){if(!container){return null;}if(container.nodeType===DOCUMENT_NODE){return container.documentElement;}else{return container.firstChild;}}function shouldHydrateDueToLegacyHeuristic(container){var rootElement=getReactRootElementInContainer(container);return!!(rootElement&&rootElement.nodeType===ELEMENT_NODE&&rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));}setBatchingImplementation(batchedUpdates$1,interactiveUpdates$1,flushInteractiveUpdates$1);var warnedAboutHydrateAPI=false;function legacyCreateRootFromDOMContainer(container,forceHydrate){var shouldHydrate=forceHydrate||shouldHydrateDueToLegacyHeuristic(container);// First clear any existing content.
if(!shouldHydrate){var warned=false;var rootSibling=void 0;while(rootSibling=container.lastChild){{if(!warned&&rootSibling.nodeType===ELEMENT_NODE&&rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)){warned=true;warningWithoutStack$1(false,'render(): Target node has markup rendered by React, but there '+'are unrelated nodes as well. This is most commonly caused by '+'white-space inserted around server-rendered markup.');}}container.removeChild(rootSibling);}}{if(shouldHydrate&&!forceHydrate&&!warnedAboutHydrateAPI){warnedAboutHydrateAPI=true;lowPriorityWarning$1(false,'render(): Calling ReactDOM.render() to hydrate server-rendered markup '+'will stop working in React v17. Replace the ReactDOM.render() call '+'with ReactDOM.hydrate() if you want React to attach to the server HTML.');}}// Legacy roots are not async by default.
var isAsync=false;return new ReactRoot(container,isAsync,shouldHydrate);}function legacyRenderSubtreeIntoContainer(parentComponent,children,container,forceHydrate,callback){// TODO: Ensure all entry points contain this check
!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;{topLevelUpdateWarnings(container);}// TODO: Without `any` type, Flow says "Property cannot be accessed on any
// member of intersection type." Whyyyyyy.
var root=container._reactRootContainer;if(!root){// Initial mount
root=container._reactRootContainer=legacyCreateRootFromDOMContainer(container,forceHydrate);if(typeof callback==='function'){var originalCallback=callback;callback=function(){var instance=getPublicRootInstance(root._internalRoot);originalCallback.call(instance);};}// Initial mount should not be batched.
unbatchedUpdates(function(){if(parentComponent!=null){root.legacy_renderSubtreeIntoContainer(parentComponent,children,callback);}else{root.render(children,callback);}});}else{if(typeof callback==='function'){var _originalCallback=callback;callback=function(){var instance=getPublicRootInstance(root._internalRoot);_originalCallback.call(instance);};}// Update
if(parentComponent!=null){root.legacy_renderSubtreeIntoContainer(parentComponent,children,callback);}else{root.render(children,callback);}}return getPublicRootInstance(root._internalRoot);}function createPortal(children,container){var key=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;// TODO: pass ReactDOM portal implementation as third argument
return createPortal$1(children,container,null,key);}var ReactDOM={createPortal:createPortal,findDOMNode:function(componentOrElement){{var owner=ReactCurrentOwner.current;if(owner!==null&&owner.stateNode!==null){var warnedAboutRefsInRender=owner.stateNode._warnedAboutRefsInRender;!warnedAboutRefsInRender?warningWithoutStack$1(false,'%s is accessing findDOMNode inside its render(). '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(owner.type)||'A component'):void 0;owner.stateNode._warnedAboutRefsInRender=true;}}if(componentOrElement==null){return null;}if(componentOrElement.nodeType===ELEMENT_NODE){return componentOrElement;}return findHostInstance(componentOrElement);},hydrate:function(element,container,callback){// TODO: throw or warn if we couldn't hydrate?
return legacyRenderSubtreeIntoContainer(null,element,container,true,callback);},render:function(element,container,callback){return legacyRenderSubtreeIntoContainer(null,element,container,false,callback);},unstable_renderSubtreeIntoContainer:function(parentComponent,element,containerNode,callback){!(parentComponent!=null&&has(parentComponent))?invariant(false,'parentComponent must be a valid React Component'):void 0;return legacyRenderSubtreeIntoContainer(parentComponent,element,containerNode,false,callback);},unmountComponentAtNode:function(container){!isValidContainer(container)?invariant(false,'unmountComponentAtNode(...): Target container is not a DOM element.'):void 0;if(container._reactRootContainer){{var rootEl=getReactRootElementInContainer(container);var renderedByDifferentReact=rootEl&&!getInstanceFromNode$1(rootEl);!!renderedByDifferentReact?warningWithoutStack$1(false,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by another copy of React.'):void 0;}// Unmount should not be batched.
unbatchedUpdates(function(){legacyRenderSubtreeIntoContainer(null,null,container,false,function(){container._reactRootContainer=null;});});// If you call unmountComponentAtNode twice in quick succession, you'll
// get `true` twice. That's probably fine?
return true;}else{{var _rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(_rootEl&&getInstanceFromNode$1(_rootEl));// Check if the container itself is a React root node.
var isContainerReactRoot=container.nodeType===ELEMENT_NODE&&isValidContainer(container.parentNode)&&!!container.parentNode._reactRootContainer;!!hasNonRootReactChild?warningWithoutStack$1(false,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by React and is not a top-level container. %s',isContainerReactRoot?'You may have accidentally passed in a React root node instead '+'of its container.':'Instead, have the parent component update its state and '+'rerender in order to remove this component.'):void 0;}return false;}},// Temporary alias since we already shipped React 16 RC with it.
// TODO: remove in React 17.
unstable_createPortal:function(){if(!didWarnAboutUnstableCreatePortal){didWarnAboutUnstableCreatePortal=true;lowPriorityWarning$1(false,'The ReactDOM.unstable_createPortal() alias has been deprecated, '+'and will be removed in React 17+. Update your code to use '+'ReactDOM.createPortal() instead. It has the exact same API, '+'but without the "unstable_" prefix.');}return createPortal.apply(undefined,arguments);},unstable_batchedUpdates:batchedUpdates$1,unstable_interactiveUpdates:interactiveUpdates$1,flushSync:flushSync,unstable_flushControlled:flushControlled,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{// Keep in sync with ReactDOMUnstableNativeDependencies.js
// and ReactTestUtils.js. This is an array for better minification.
Events:[getInstanceFromNode$1,getNodeFromInstance$1,getFiberCurrentPropsFromNode$1,injection.injectEventPluginsByName,eventNameDispatchConfigs,accumulateTwoPhaseDispatches,accumulateDirectDispatches,enqueueStateRestore,restoreStateIfNeeded,dispatchEvent,runEventsInBatch]}};ReactDOM.unstable_createRoot=function createRoot(container,options){!isValidContainer(container)?invariant(false,'unstable_createRoot(...): Target container is not a DOM element.'):void 0;var hydrate=options!=null&&options.hydrate===true;return new ReactRoot(container,true,hydrate);};var foundDevTools=injectIntoDevTools({findFiberByHostInstance:getClosestInstanceFromNode,bundleType:1,version:ReactVersion,rendererPackageName:'react-dom'});{if(!foundDevTools&&canUseDOM&&window.top===window.self){// If we're in Chrome or Firefox, provide a download link if not installed.
if(navigator.userAgent.indexOf('Chrome')>-1&&navigator.userAgent.indexOf('Edge')===-1||navigator.userAgent.indexOf('Firefox')>-1){var protocol=window.location.protocol;// Don't warn in exotic cases like chrome-extension://.
if(/^(https?|file):$/.test(protocol)){console.info('%cDownload the React DevTools '+'for a better development experience: '+'https://fb.me/react-devtools'+(protocol==='file:'?'\nYou might need to use a local HTTP server (instead of file://): '+'https://fb.me/react-devtools-faq':''),'font-weight:bold');}}}}var ReactDOM$2=Object.freeze({default:ReactDOM});var ReactDOM$3=ReactDOM$2&&ReactDOM||ReactDOM$2;// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactDom=ReactDOM$3.default||ReactDOM$3;module.exports=reactDom;})();}

/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: render */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  if (true) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-dom.development.js */ "./node_modules/react-dom/cjs/react-dom.development.js");
}

/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.5.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

    var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js"); // TODO: this is special because it gets imported during build.


    var ReactVersion = '16.5.2'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_PLACEHOLDER_TYPE = hasSymbol ? Symbol.for('react.placeholder') : 0xead1;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    } // Exports ReactDOM.createRoot
    // Experimental error-boundary API that can recover from errors within a single
    // render phase
    // Suspense


    var enableSuspense = false; // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:
    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.
    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
    // Warn about legacy context API
    // Gather advanced timing metrics for Profiler subtrees.
    // Trace which interactions trigger each commit.
    // Only used in www builds.
    // Only used in www builds.
    // React Fire: prevent the value and checked attributes from syncing
    // with their related DOM properties

    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */

    var validateFormat = function () {};

    {
      validateFormat = function (format) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      };
    }

    function invariant(condition, format, a, b, c, d, e, f) {
      validateFormat(format);

      if (!condition) {
        var error = void 0;

        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function () {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }

        error.framesToPop = 1; // we don't care about invariant's own frame

        throw error;
      }
    } // Relying on the `invariant()` implementation lets us
    // preserve the format and params in the www builds.

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */


    var lowPriorityWarning = function () {};

    {
      var printWarning = function (format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });

        if (typeof console !== 'undefined') {
          console.warn(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function (condition, format) {
        if (format === undefined) {
          throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;
    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warningWithoutStack = function () {};

    {
      warningWithoutStack = function (condition, format) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        if (format === undefined) {
          throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (args.length > 8) {
          // Check before the condition to catch violations early.
          throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
        }

        if (condition) {
          return;
        }

        if (typeof console !== 'undefined') {
          var _args$map = args.map(function (item) {
            return '' + item;
          }),
              a = _args$map[0],
              b = _args$map[1],
              c = _args$map[2],
              d = _args$map[3],
              e = _args$map[4],
              f = _args$map[5],
              g = _args$map[6],
              h = _args$map[7];

          var message = 'Warning: ' + format; // We intentionally don't use spread (or .apply) because it breaks IE9:
          // https://github.com/facebook/react/issues/13610

          switch (args.length) {
            case 0:
              console.error(message);
              break;

            case 1:
              console.error(message, a);
              break;

            case 2:
              console.error(message, a, b);
              break;

            case 3:
              console.error(message, a, b, c);
              break;

            case 4:
              console.error(message, a, b, c, d);
              break;

            case 5:
              console.error(message, a, b, c, d, e);
              break;

            case 6:
              console.error(message, a, b, c, d, e, f);
              break;

            case 7:
              console.error(message, a, b, c, d, e, f, g);
              break;

            case 8:
              console.error(message, a, b, c, d, e, f, g, h);
              break;

            default:
              throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
          }
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          var argIndex = 0;

          var _message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          throw new Error(_message);
        } catch (x) {}
      };
    }
    var warningWithoutStack$1 = warningWithoutStack;
    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }
    /**
     * This is the abstract API for an update queue.
     */


    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function (publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    var emptyObject = {};
    {
      Object.freeze(emptyObject);
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */

    Component.prototype.setState = function (partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function (methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function () {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    /**
     * Convenience component with default shallow equality check for sCU.
     */

    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }
    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */


    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null,
      currentDispatcher: null
    };
    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

    var describeComponentFrame = function (name, source, ownerName) {
      var sourceInfo = '';

      if (source) {
        var path = source.fileName;
        var fileName = path.replace(BEFORE_SLASH_RE, '');
        {
          // In DEV, include code for a common special case:
          // prefer "folder/index.js" instead of just "index.js".
          if (/^index\./.test(fileName)) {
            var match = path.match(BEFORE_SLASH_RE);

            if (match) {
              var pathBeforeSlash = match[1];

              if (pathBeforeSlash) {
                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                fileName = folderName + '/' + fileName;
              }
            }
          }
        }
        sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
      } else if (ownerName) {
        sourceInfo = ' (created by ' + ownerName + ')';
      }

      return '\n    in ' + (name || 'Unknown') + sourceInfo;
    };

    var Resolved = 1;

    function refineResolvedThenable(thenable) {
      return thenable._reactStatus === Resolved ? thenable._reactResult : null;
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case REACT_ASYNC_MODE_TYPE:
          return 'AsyncMode';

        case REACT_FRAGMENT_TYPE:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return 'Profiler';

        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';

        case REACT_PLACEHOLDER_TYPE:
          return 'Placeholder';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return 'Context.Consumer';

          case REACT_PROVIDER_TYPE:
            return 'Context.Provider';

          case REACT_FORWARD_REF_TYPE:
            var renderFn = type.render;
            var functionName = renderFn.displayName || renderFn.name || '';
            return type.displayName || (functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef');
        }

        if (typeof type.then === 'function') {
          var thenable = type;
          var resolvedThenable = refineResolvedThenable(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
        }
      }

      return null;
    }

    var ReactDebugCurrentFrame = {};
    var currentlyValidatingElement = null;

    function setCurrentlyValidatingElement(element) {
      {
        currentlyValidatingElement = element;
      }
    }

    {
      // Stack implementation injected by the current renderer.
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var stack = ''; // Add an extra top frame while an element is being validated

        if (currentlyValidatingElement) {
          var name = getComponentName(currentlyValidatingElement.type);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
        } // Delegate to the injected renderer-specific implementation


        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          stack += impl() || '';
        }

        return stack;
      };
    }
    var ReactSharedInternals = {
      ReactCurrentOwner: ReactCurrentOwner,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: _assign
    };
    {
      _assign(ReactSharedInternals, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }
    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warning = warningWithoutStack$1;
    {
      warning = function (condition, format) {
        if (condition) {
          return;
        }

        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum(); // eslint-disable-next-line react-internal/warning-and-invariant-args

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
      };
    }
    var warning$1 = warning;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown = void 0;
    var specialPropRefWarningShown = void 0;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function () {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */


    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName = void 0; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */


    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;
      var propName = void 0; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps = void 0;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */


    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }
    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child = void 0;
      var nextName = void 0;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step = void 0;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }
    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof component === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
          return c;
        });
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }

        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';

      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */


    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }

      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children) {
      return traverseAllChildren(children, function () {
        return null;
      }, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
        return child;
      });
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */


    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    function readContext(context, observedBits) {
      var dispatcher = ReactCurrentOwner.currentDispatcher;
      !(dispatcher !== null) ? invariant(false, 'Context.unstable_read(): Context can only be read while React is rendering, e.g. inside the render method or getDerivedStateFromProps.') : void 0;
      return dispatcher.readContext(context, observedBits);
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        // These are circular
        Provider: null,
        Consumer: null,
        unstable_read: null
      };
      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      context.Consumer = context;
      context.unstable_read = readContext.bind(null, context);
      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }
      return context;
    }

    function lazy(ctor) {
      var thenable = null;
      return {
        then: function (resolve, reject) {
          if (thenable === null) {
            // Lazily create thenable by wrapping in an extra thenable.
            thenable = ctor();
            ctor = null;
          }

          return thenable.then(resolve, reject);
        },
        // React uses these fields to store the result.
        _reactStatus: -1,
        _reactResult: null
      };
    }

    function forwardRef(render) {
      {
        if (typeof render !== 'function') {
          warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        } else {
          !( // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
          render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
        }

        if (render != null) {
          !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
        }
      }
      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_PLACEHOLDER_TYPE || typeof type === 'object' && type !== null && (typeof type.then === 'function' || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }
    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */


    var propTypesMisspellWarningShown = void 0;
    {
      propTypesMisspellWarningShown = false;
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }

      return info;
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
      }

      setCurrentlyValidatingElement(element);
      {
        warning$1(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
      }
      setCurrentlyValidatingElement(null);
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step = void 0;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      var type = element.type;
      var name = void 0,
          propTypes = void 0;

      if (typeof type === 'function') {
        // Class or functional component
        name = type.displayName || type.name;
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        // ForwardRef
        var functionName = type.render.displayName || type.render.name || '';
        name = type.displayName || (functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef');
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        setCurrentlyValidatingElement(element);
        checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
        setCurrentlyValidatingElement(null);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function') {
        !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      setCurrentlyValidatingElement(fragment);
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
          break;
        }
      }

      if (fragment.ref !== null) {
        warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
      }

      setCurrentlyValidatingElement(null);
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString = void 0;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type; // Legacy hook: remove it

      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },
      createRef: createRef,
      Component: Component,
      PureComponent: PureComponent,
      createContext: createContext,
      forwardRef: forwardRef,
      Fragment: REACT_FRAGMENT_TYPE,
      StrictMode: REACT_STRICT_MODE_TYPE,
      unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
      unstable_Profiler: REACT_PROFILER_TYPE,
      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,
      version: ReactVersion,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
    };

    if (enableSuspense) {
      React.Placeholder = REACT_PLACEHOLDER_TYPE;
      React.lazy = lazy;
    }

    var React$2 = Object.freeze({
      default: React
    });
    var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.

    var react = React$3.default || React$3;
    module.exports = react;
  })();
}

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}

/***/ }),

/***/ "./node_modules/schedule/cjs/schedule-tracing.development.js":
/*!*******************************************************************!*\
  !*** ./node_modules/schedule/cjs/schedule-tracing.development.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.5.2
 * schedule-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    }); // Exports ReactDOM.createRoot
    // Experimental error-boundary API that can recover from errors within a single
    // render phase
    // Suspense
    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:
    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.
    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
    // Warn about legacy context API
    // Gather advanced timing metrics for Profiler subtrees.
    // Trace which interactions trigger each commit.

    var enableSchedulerTracing = true; // Only used in www builds.
    // Only used in www builds.
    // React Fire: prevent the value and checked attributes from syncing
    // with their related DOM properties

    var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

    var interactionIDCounter = 0;
    var threadIDCounter = 0; // Set of currently traced interactions.
    // Interactions "stack"–
    // Meaning that newly traced interactions are appended to the previously active set.
    // When an interaction goes out of scope, the previous set (if any) is restored.

    exports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.

    exports.__subscriberRef = null;

    if (enableSchedulerTracing) {
      exports.__interactionsRef = {
        current: new Set()
      };
      exports.__subscriberRef = {
        current: null
      };
    }

    function unstable_clear(callback) {
      if (!enableSchedulerTracing) {
        return callback();
      }

      var prevInteractions = exports.__interactionsRef.current;
      exports.__interactionsRef.current = new Set();

      try {
        return callback();
      } finally {
        exports.__interactionsRef.current = prevInteractions;
      }
    }

    function unstable_getCurrent() {
      if (!enableSchedulerTracing) {
        return null;
      } else {
        return exports.__interactionsRef.current;
      }
    }

    function unstable_getThreadID() {
      return ++threadIDCounter;
    }

    function unstable_trace(name, timestamp, callback) {
      var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;

      if (!enableSchedulerTracing) {
        return callback();
      }

      var interaction = {
        __count: 1,
        id: interactionIDCounter++,
        name: name,
        timestamp: timestamp
      };
      var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.
      // To do that, clone the current interactions.
      // The previous set will be restored upon completion.

      var interactions = new Set(prevInteractions);
      interactions.add(interaction);
      exports.__interactionsRef.current = interactions;
      var subscriber = exports.__subscriberRef.current;
      var returnValue = void 0;

      try {
        if (subscriber !== null) {
          subscriber.onInteractionTraced(interaction);
        }
      } finally {
        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(interactions, threadID);
          }
        } finally {
          try {
            returnValue = callback();
          } finally {
            exports.__interactionsRef.current = prevInteractions;

            try {
              if (subscriber !== null) {
                subscriber.onWorkStopped(interactions, threadID);
              }
            } finally {
              interaction.__count--; // If no async work was scheduled for this interaction,
              // Notify subscribers that it's completed.

              if (subscriber !== null && interaction.__count === 0) {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              }
            }
          }
        }
      }

      return returnValue;
    }

    function unstable_wrap(callback) {
      var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;

      if (!enableSchedulerTracing) {
        return callback;
      }

      var wrappedInteractions = exports.__interactionsRef.current;
      var subscriber = exports.__subscriberRef.current;

      if (subscriber !== null) {
        subscriber.onWorkScheduled(wrappedInteractions, threadID);
      } // Update the pending async work count for the current interactions.
      // Update after calling subscribers in case of error.


      wrappedInteractions.forEach(function (interaction) {
        interaction.__count++;
      });
      var hasRun = false;

      function wrapped() {
        var prevInteractions = exports.__interactionsRef.current;
        exports.__interactionsRef.current = wrappedInteractions;
        subscriber = exports.__subscriberRef.current;

        try {
          var returnValue = void 0;

          try {
            if (subscriber !== null) {
              subscriber.onWorkStarted(wrappedInteractions, threadID);
            }
          } finally {
            try {
              returnValue = callback.apply(undefined, arguments);
            } finally {
              exports.__interactionsRef.current = prevInteractions;

              if (subscriber !== null) {
                subscriber.onWorkStopped(wrappedInteractions, threadID);
              }
            }
          }

          return returnValue;
        } finally {
          if (!hasRun) {
            // We only expect a wrapped function to be executed once,
            // But in the event that it's executed more than once–
            // Only decrement the outstanding interaction counts once.
            hasRun = true; // Update pending async counts for all wrapped interactions.
            // If this was the last scheduled async work for any of them,
            // Mark them as completed.

            wrappedInteractions.forEach(function (interaction) {
              interaction.__count--;

              if (subscriber !== null && interaction.__count === 0) {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              }
            });
          }
        }
      }

      wrapped.cancel = function cancel() {
        subscriber = exports.__subscriberRef.current;

        try {
          if (subscriber !== null) {
            subscriber.onWorkCanceled(wrappedInteractions, threadID);
          }
        } finally {
          // Update pending async counts for all wrapped interactions.
          // If this was the last scheduled async work for any of them,
          // Mark them as completed.
          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      };

      return wrapped;
    }

    var subscribers = null;

    if (enableSchedulerTracing) {
      subscribers = new Set();
    }

    function unstable_subscribe(subscriber) {
      if (enableSchedulerTracing) {
        subscribers.add(subscriber);

        if (subscribers.size === 1) {
          exports.__subscriberRef.current = {
            onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
            onInteractionTraced: onInteractionTraced,
            onWorkCanceled: onWorkCanceled,
            onWorkScheduled: onWorkScheduled,
            onWorkStarted: onWorkStarted,
            onWorkStopped: onWorkStopped
          };
        }
      }
    }

    function unstable_unsubscribe(subscriber) {
      if (enableSchedulerTracing) {
        subscribers.delete(subscriber);

        if (subscribers.size === 0) {
          exports.__subscriberRef.current = null;
        }
      }
    }

    function onInteractionTraced(interaction) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onInteractionTraced(interaction);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onInteractionScheduledWorkCompleted(interaction) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onInteractionScheduledWorkCompleted(interaction);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkScheduled(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkScheduled(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkStarted(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkStarted(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkStopped(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkStopped(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkCanceled(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkCanceled(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    exports.unstable_clear = unstable_clear;
    exports.unstable_getCurrent = unstable_getCurrent;
    exports.unstable_getThreadID = unstable_getThreadID;
    exports.unstable_trace = unstable_trace;
    exports.unstable_wrap = unstable_wrap;
    exports.unstable_subscribe = unstable_subscribe;
    exports.unstable_unsubscribe = unstable_unsubscribe;
  })();
}

/***/ }),

/***/ "./node_modules/schedule/cjs/schedule.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/schedule/cjs/schedule.development.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.5.2
 * schedule.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /* eslint-disable no-var */
    // TODO: Currently there's only a single priority level, Deferred. Will add
    // additional priorities.

    var DEFERRED_TIMEOUT = 5000; // Callbacks are stored as a circular, doubly linked list.

    var firstCallbackNode = null;
    var isPerformingWork = false;
    var isHostCallbackScheduled = false;
    var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
    var timeRemaining;

    if (hasNativePerformanceNow) {
      timeRemaining = function () {
        // We assume that if we have a performance timer that the rAF callback
        // gets a performance timer value. Not sure if this is always true.
        var remaining = getFrameDeadline() - performance.now();
        return remaining > 0 ? remaining : 0;
      };
    } else {
      timeRemaining = function () {
        // Fallback to Date.now()
        var remaining = getFrameDeadline() - Date.now();
        return remaining > 0 ? remaining : 0;
      };
    }

    var deadlineObject = {
      timeRemaining: timeRemaining,
      didTimeout: false
    };

    function ensureHostCallbackIsScheduled() {
      if (isPerformingWork) {
        // Don't schedule work yet; wait until the next time we yield.
        return;
      } // Schedule the host callback using the earliest timeout in the list.


      var timesOutAt = firstCallbackNode.timesOutAt;

      if (!isHostCallbackScheduled) {
        isHostCallbackScheduled = true;
      } else {
        // Cancel the existing host callback.
        cancelCallback();
      }

      requestCallback(flushWork, timesOutAt);
    }

    function flushFirstCallback(node) {
      var flushedNode = firstCallbackNode; // Remove the node from the list before calling the callback. That way the
      // list is in a consistent state even if the callback throws.

      var next = firstCallbackNode.next;

      if (firstCallbackNode === next) {
        // This is the last callback in the list.
        firstCallbackNode = null;
        next = null;
      } else {
        var previous = firstCallbackNode.previous;
        firstCallbackNode = previous.next = next;
        next.previous = previous;
      }

      flushedNode.next = flushedNode.previous = null; // Now it's safe to call the callback.

      var callback = flushedNode.callback;
      callback(deadlineObject);
    }

    function flushWork(didTimeout) {
      isPerformingWork = true;
      deadlineObject.didTimeout = didTimeout;

      try {
        if (didTimeout) {
          // Flush all the timed out callbacks without yielding.
          while (firstCallbackNode !== null) {
            // Read the current time. Flush all the callbacks that expire at or
            // earlier than that time. Then read the current time again and repeat.
            // This optimizes for as few performance.now calls as possible.
            var currentTime = exports.unstable_now();

            if (firstCallbackNode.timesOutAt <= currentTime) {
              do {
                flushFirstCallback();
              } while (firstCallbackNode !== null && firstCallbackNode.timesOutAt <= currentTime);

              continue;
            }

            break;
          }
        } else {
          // Keep flushing callbacks until we run out of time in the frame.
          if (firstCallbackNode !== null) {
            do {
              flushFirstCallback();
            } while (firstCallbackNode !== null && getFrameDeadline() - exports.unstable_now() > 0);
          }
        }
      } finally {
        isPerformingWork = false;

        if (firstCallbackNode !== null) {
          // There's still work remaining. Request another callback.
          ensureHostCallbackIsScheduled(firstCallbackNode);
        } else {
          isHostCallbackScheduled = false;
        }
      }
    }

    function unstable_scheduleWork(callback, options) {
      var currentTime = exports.unstable_now();
      var timesOutAt;

      if (options !== undefined && options !== null && options.timeout !== null && options.timeout !== undefined) {
        // Check for an explicit timeout
        timesOutAt = currentTime + options.timeout;
      } else {
        // Compute an absolute timeout using the default constant.
        timesOutAt = currentTime + DEFERRED_TIMEOUT;
      }

      var newNode = {
        callback: callback,
        timesOutAt: timesOutAt,
        next: null,
        previous: null
      }; // Insert the new callback into the list, sorted by its timeout.

      if (firstCallbackNode === null) {
        // This is the first callback in the list.
        firstCallbackNode = newNode.next = newNode.previous = newNode;
        ensureHostCallbackIsScheduled(firstCallbackNode);
      } else {
        var next = null;
        var node = firstCallbackNode;

        do {
          if (node.timesOutAt > timesOutAt) {
            // The new callback times out before this one.
            next = node;
            break;
          }

          node = node.next;
        } while (node !== firstCallbackNode);

        if (next === null) {
          // No callback with a later timeout was found, which means the new
          // callback has the latest timeout in the list.
          next = firstCallbackNode;
        } else if (next === firstCallbackNode) {
          // The new callback has the earliest timeout in the entire list.
          firstCallbackNode = newNode;
          ensureHostCallbackIsScheduled(firstCallbackNode);
        }

        var previous = next.previous;
        previous.next = next.previous = newNode;
        newNode.next = next;
        newNode.previous = previous;
      }

      return newNode;
    }

    function unstable_cancelScheduledWork(callbackNode) {
      var next = callbackNode.next;

      if (next === null) {
        // Already cancelled.
        return;
      }

      if (next === callbackNode) {
        // This is the only scheduled callback. Clear the list.
        firstCallbackNode = null;
      } else {
        // Remove the callback from its position in the list.
        if (callbackNode === firstCallbackNode) {
          firstCallbackNode = next;
        }

        var previous = callbackNode.previous;
        previous.next = next;
        next.previous = previous;
      }

      callbackNode.next = callbackNode.previous = null;
    } // The remaining code is essentially a polyfill for requestIdleCallback. It
    // works by scheduling a requestAnimationFrame, storing the time for the start
    // of the frame, then scheduling a postMessage which gets scheduled after paint.
    // Within the postMessage handler do as much work as possible until time + frame
    // rate. By separating the idle call into a separate event tick we ensure that
    // layout, paint and other browser work is counted against the available time.
    // The frame rate is dynamically adjusted.
    // We capture a local reference to any global, in case it gets polyfilled after
    // this module is initially evaluated. We want to be using a
    // consistent implementation.


    var localDate = Date; // This initialization code may run even on server environments if a component
    // just imports ReactDOM (e.g. for findDOMNode). Some environments might not
    // have setTimeout or clearTimeout. However, we always expect them to be defined
    // on the client. https://github.com/facebook/react/pull/13088

    var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : undefined;
    var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : undefined; // We don't expect either of these to necessarily be defined, but we will error
    // later if they are missing on the client.

    var localRequestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;
    var localCancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined; // requestAnimationFrame does not run when the tab is in the background. If
    // we're backgrounded we prefer for that work to happen so that the page
    // continues to load in the background. So we also schedule a 'setTimeout' as
    // a fallback.
    // TODO: Need a better heuristic for backgrounded work.

    var ANIMATION_FRAME_TIMEOUT = 100;
    var rAFID;
    var rAFTimeoutID;

    var requestAnimationFrameWithTimeout = function (callback) {
      // schedule rAF and also a setTimeout
      rAFID = localRequestAnimationFrame(function (timestamp) {
        // cancel the setTimeout
        localClearTimeout(rAFTimeoutID);
        callback(timestamp);
      });
      rAFTimeoutID = localSetTimeout(function () {
        // cancel the requestAnimationFrame
        localCancelAnimationFrame(rAFID);
        callback(exports.unstable_now());
      }, ANIMATION_FRAME_TIMEOUT);
    };

    if (hasNativePerformanceNow) {
      var Performance = performance;

      exports.unstable_now = function () {
        return Performance.now();
      };
    } else {
      exports.unstable_now = function () {
        return localDate.now();
      };
    }

    var requestCallback;
    var cancelCallback;
    var getFrameDeadline;

    if (typeof window === 'undefined') {
      // If this accidentally gets imported in a non-browser environment, fallback
      // to a naive implementation.
      var timeoutID = -1;

      requestCallback = function (callback, absoluteTimeout) {
        timeoutID = setTimeout(callback, 0, true);
      };

      cancelCallback = function () {
        clearTimeout(timeoutID);
      };

      getFrameDeadline = function () {
        return 0;
      };
    } else if (window._schedMock) {
      // Dynamic injection, only for testing purposes.
      var impl = window._schedMock;
      requestCallback = impl[0];
      cancelCallback = impl[1];
      getFrameDeadline = impl[2];
    } else {
      if (typeof console !== 'undefined') {
        if (typeof localRequestAnimationFrame !== 'function') {
          console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
        }

        if (typeof localCancelAnimationFrame !== 'function') {
          console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
        }
      }

      var scheduledCallback = null;
      var isIdleScheduled = false;
      var timeoutTime = -1;
      var isAnimationFrameScheduled = false;
      var isPerformingIdleWork = false;
      var frameDeadline = 0; // We start out assuming that we run at 30fps but then the heuristic tracking
      // will adjust this value to a faster fps if we get more frequent animation
      // frames.

      var previousFrameTime = 33;
      var activeFrameTime = 33;

      getFrameDeadline = function () {
        return frameDeadline;
      }; // We use the postMessage trick to defer idle work until after the repaint.


      var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);

      var idleTick = function (event) {
        if (event.source !== window || event.data !== messageKey) {
          return;
        }

        isIdleScheduled = false;
        var currentTime = exports.unstable_now();
        var didTimeout = false;

        if (frameDeadline - currentTime <= 0) {
          // There's no time left in this idle period. Check if the callback has
          // a timeout and whether it's been exceeded.
          if (timeoutTime !== -1 && timeoutTime <= currentTime) {
            // Exceeded the timeout. Invoke the callback even though there's no
            // time left.
            didTimeout = true;
          } else {
            // No timeout.
            if (!isAnimationFrameScheduled) {
              // Schedule another animation callback so we retry later.
              isAnimationFrameScheduled = true;
              requestAnimationFrameWithTimeout(animationTick);
            } // Exit without invoking the callback.


            return;
          }
        }

        timeoutTime = -1;
        var callback = scheduledCallback;
        scheduledCallback = null;

        if (callback !== null) {
          isPerformingIdleWork = true;

          try {
            callback(didTimeout);
          } finally {
            isPerformingIdleWork = false;
          }
        }
      }; // Assumes that we have addEventListener in this environment. Might need
      // something better for old IE.


      window.addEventListener('message', idleTick, false);

      var animationTick = function (rafTime) {
        isAnimationFrameScheduled = false;
        var nextFrameTime = rafTime - frameDeadline + activeFrameTime;

        if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
          if (nextFrameTime < 8) {
            // Defensive coding. We don't support higher frame rates than 120hz.
            // If we get lower than that, it is probably a bug.
            nextFrameTime = 8;
          } // If one frame goes long, then the next one can be short to catch up.
          // If two frames are short in a row, then that's an indication that we
          // actually have a higher frame rate than what we're currently optimizing.
          // We adjust our heuristic dynamically accordingly. For example, if we're
          // running on 120hz display or 90hz VR display.
          // Take the max of the two in case one of them was an anomaly due to
          // missed frame deadlines.


          activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
        } else {
          previousFrameTime = nextFrameTime;
        }

        frameDeadline = rafTime + activeFrameTime;

        if (!isIdleScheduled) {
          isIdleScheduled = true;
          window.postMessage(messageKey, '*');
        }
      };

      requestCallback = function (callback, absoluteTimeout) {
        scheduledCallback = callback;
        timeoutTime = absoluteTimeout;

        if (isPerformingIdleWork) {
          // If we're already performing idle work, an error must have been thrown.
          // Don't wait for the next frame. Continue working ASAP, in a new event.
          window.postMessage(messageKey, '*');
        } else if (!isAnimationFrameScheduled) {
          // If rAF didn't already schedule one, we need to schedule a frame.
          // TODO: If this rAF doesn't materialize because the browser throttles, we
          // might want to still have setTimeout trigger rIC as a backup to ensure
          // that we keep performing work.
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
      };

      cancelCallback = function () {
        scheduledCallback = null;
        isIdleScheduled = false;
        timeoutTime = -1;
      };
    }

    exports.unstable_scheduleWork = unstable_scheduleWork;
    exports.unstable_cancelScheduledWork = unstable_cancelScheduledWork;
  })();
}

/***/ }),

/***/ "./node_modules/schedule/index.js":
/*!****************************************!*\
  !*** ./node_modules/schedule/index.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/schedule.development.js */ "./node_modules/schedule/cjs/schedule.development.js");
}

/***/ }),

/***/ "./node_modules/schedule/tracing.js":
/*!******************************************!*\
  !*** ./node_modules/schedule/tracing.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/schedule-tracing.development.js */ "./node_modules/schedule/cjs/schedule-tracing.development.js");
}

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

module.exports = function (str) {
  return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/
var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};

var Entities = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/index.js").AllHtmlEntities;

var entities = new Entities();

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function (msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });

  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType(type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow
  };
  var color = problemColors[type] || colors.red;
  return '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' + type.slice(0, -1).toUpperCase() + '</span>';
}

module.exports = function (options) {
  for (var color in options.overlayColors) {
    if (color in colors) {
      colors[color] = options.overlayColors[color];
    }

    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear
  };
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?path=http://localhost:3000/__webpack_hmr":
/*!***********************************************************************************!*\
  !*** (webpack)-hot-middleware/client.js?path=http://localhost:3000/__webpack_hmr ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/

/*global __resourceQuery __webpack_public_path__*/
var options = {
  path: "/__webpack_hmr",
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {}
};

if (true) {
  var querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {// do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn("webpack-hot-middleware's client requires EventSource to work. " + "You should include a polyfill if you want to support this browser: " + "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools");
} else {
  if (options.autoConnect) {
    connect();
  }
}
/* istanbul ignore next */


function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';

  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }

  if (overrides.name) {
    options.name = overrides.name;
  }

  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors) options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles) options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];
  init();
  var timer = setInterval(function () {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function (fn) {
      listeners.push(fn);
    }
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }

  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }

  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == "\uD83D\uDC93") {
      return;
    }

    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
      }
    }
  }
} // the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients


var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;

if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }

  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

  var overlay;

  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ "./node_modules/webpack-hot-middleware/client-overlay.js")({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles
    });
  }

  var styles = {
    errors: "color: #ff0000;",
    warnings: "color: #999933;"
  };
  var previousProblems = null;

  function log(type, obj) {
    var newProblems = obj[type].map(function (msg) {
      return strip(msg);
    }).join('\n');

    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : "";
    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type; // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.

    if (console.group && console.groupEnd) {
      console.group("%c" + title, style);
      console.log("%c" + newProblems, style);
      console.groupEnd();
    } else {
      console.log("%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"), style + "font-weight: bold;", style + "font-weight: normal;");
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function (type, obj) {
      if (options.warn) {
        log(type, obj);
      }

      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }

        overlay.clear();
      }

      return true;
    },
    success: function () {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function (customOverlay) {
      overlay = customOverlay;
    }
  };
}

var processUpdate = __webpack_require__(/*! ./process-update */ "./node_modules/webpack-hot-middleware/process-update.js");

var customHandler;
var subscribeAllHandler;

function processMessage(obj) {
  switch (obj.action) {
    case "building":
      if (options.log) {
        console.log("[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") + "rebuilding");
      }

      break;

    case "built":
      if (options.log) {
        console.log("[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") + "rebuilt in " + obj.time + "ms");
      }

    // fall through

    case "sync":
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }

      var applyUpdate = true;

      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }

      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }

      break;

    default:
      if (customHandler) {
        customHandler(obj);
      }

  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect
  };
}
/* WEBPACK VAR INJECTION */}.call(this, "?path=http://localhost:3000/__webpack_hmr", __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */
if (false) {}

var hmrDocsUrl = "https://webpack.js.org/concepts/hot-module-replacement/"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = {
  abort: 1,
  fail: 1
};
var applyOptions = {
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function (data) {
    console.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
  },
  onDeclined: function (data) {
    console.warn("Ignored an update to declined module " + data.chain.join(" -> "));
  },
  onErrored: function (data) {
    console.error(data.error);
    console.warn("Ignored an error while updating module " + data.moduleId + " (" + data.type + ")");
  }
};

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function (hash, moduleMap, options) {
  var reload = options.reload;

  if (!upToDate(hash) && module.hot.status() == "idle") {
    if (options.log) console.log("[HMR] Checking for updates on the server...");
    check();
  }

  function check() {
    var cb = function (err, updatedModules) {
      if (err) return handleError(err);

      if (!updatedModules) {
        if (options.warn) {
          console.warn("[HMR] Cannot find update (Full reload needed)");
          console.warn("[HMR] (Probably because of restarting the server)");
        }

        performReload();
        return null;
      }

      var applyCallback = function (applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);
        if (!upToDate()) check();
        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback); // webpack 2 promise

      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function (outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }
    };

    var result = module.hot.check(false, cb); // webpack 2 promise

    if (result && result.then) {
      result.then(function (updatedModules) {
        cb(null, updatedModules);
      });
      result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function (moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if (unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn("[HMR] The following modules couldn't be hot updated: " + "(Full reload needed)\n" + "This is usually because the modules which have changed " + "(and their parents) do not know how to hot reload themselves. " + "See " + hmrDocsUrl + " for more details.");
        unacceptedModules.forEach(function (moduleId) {
          console.warn("[HMR]  - " + (moduleMap[moduleId] || moduleId));
        });
      }

      performReload();
      return;
    }

    if (options.log) {
      if (!renewedModules || renewedModules.length === 0) {
        console.log("[HMR] Nothing hot updated.");
      } else {
        console.log("[HMR] Updated modules:");
        renewedModules.forEach(function (moduleId) {
          console.log("[HMR]  - " + (moduleMap[moduleId] || moduleId));
        });
      }

      if (upToDate()) {
        console.log("[HMR] App is up to date.");
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn("[HMR] Cannot check for update (Full reload needed)");
        console.warn("[HMR] " + (err.stack || err.message));
      }

      performReload();
      return;
    }

    if (options.warn) {
      console.warn("[HMR] Update check failed: " + (err.stack || err.message));
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn("[HMR] Reloading page");
      window.location.reload();
    }
  }
};

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./unused.js":
/*!*******************!*\
  !*** ./unused.js ***!
  \*******************/
/*! exports provided: abcdefgh, demo, xyz */
/*! exports used: demo, xyz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export abcdefgh */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return demo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return xyz; });
function abcdefgh() {
  console.log(1);
}
function demo() {}
function xyz() {}

/***/ }),

/***/ 0:
/*!***********************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr ./index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr */"./node_modules/webpack-hot-middleware/client.js?path=http://localhost:3000/__webpack_hmr");
module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map