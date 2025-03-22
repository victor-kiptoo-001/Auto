"use strict";
exports.id = 220;
exports.ids = [220];
exports.modules = {

/***/ 8386:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ AuthProvider),
/* harmony export */   "V": () => (/* binding */ AuthContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9830);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3590);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__, react_toastify__WEBPACK_IMPORTED_MODULE_5__]);
([axios__WEBPACK_IMPORTED_MODULE_1__, react_toastify__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const defaultState = {
    user: null,
    orders: [],
    loading: false
};
const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(defaultState);
const AuthProvider = ({ children  })=>{
    const { 0: user , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const { 0: orders , 1: setOrders  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: order , 1: setOrder  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const placeOrder = (order, callBack)=>{
        setLoading(true);
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/orders`, {
            data: {
                ...order,
                user_id: user.user.id
            }
        }, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        }).then(function(response) {
            setOrders((prev)=>[
                    ...prev,
                    response.data
                ]);
            callBack();
            next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/orders/${response.data.data.id}`);
            setLoading(false);
        }).catch(function(error) {
            console.log(error.response.data);
            setLoading(false);
        });
    };
    const updateUser = (updateUser)=>{
        setLoading(true);
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].put(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/users/${user.user.id}`, {
            phone: updateUser.phone,
            email: updateUser.email,
            username: updateUser.username
        }, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        }).then(function(response) {
            setUser({
                jwt: user.jwt,
                user: response.data
            });
            setLoading(false);
        }).catch(function(error) {
            console.log(error.response.data);
            setLoading(false);
        });
    };
    const fetchOrders = ()=>{
        if (user?.jwt) {
            axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/orders?filters[user_id][$eq]=${user.user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            }).then((res)=>{
                setOrders(res.data.data);
            }).catch((err)=>{});
        }
    };
    const fetchOrder = (url)=>{
        if (!user?.jwt) return;
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/orders/${url}`, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        }).then((res)=>{
            setOrder(res.data.data);
        }).catch((err)=>{
            console.log(err);
        });
    };
    const signIn = (user)=>{
        if (loading) return;
        setLoading(true);
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/auth/local`, user).then(function(response) {
            setUser(response.data);
            if (router.query.redirect) return next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/${router.query.redirect}`);
            next_router__WEBPACK_IMPORTED_MODULE_3___default().push("/");
            setLoading(false);
        }).catch(function(error) {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("invalid credentials");
            setLoading(false);
        });
    };
    const signOut = ()=>{
        localStorage.removeItem("user");
        setUser(null);
    };
    const signUp = (user)=>{
        setLoading(true);
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/auth/local/register`, user).then(function(response) {
            setUser(response.data);
            next_router__WEBPACK_IMPORTED_MODULE_3___default().push("/");
            setLoading(false);
        }).catch(function(error) {
            if (error?.response?.data?.error?.message) {
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(error?.response?.data?.error?.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("Something wrong happpned");
            }
            setLoading(false);
        });
    };
    const authUser = (jwt)=>{
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${_utils_constants__WEBPACK_IMPORTED_MODULE_4__/* .baseUrl */ .FH}/users/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res)=>{
            setUser({
                jwt: jwt,
                user: res.data
            });
        }).catch((err)=>{
            signOut();
            if (isRouteProtected()) {
                next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/signin?redirect=${router.pathname.replace("/", "")}`);
            }
        });
    };
    const isRouteProtected = ()=>{
        const protectedRoutes = [
            "/profile",
            "/checkout"
        ];
        if (protectedRoutes.includes(router.pathname)) {
            return true;
        }
        return false;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            if (router.pathname === "/signin" || router.pathname === "/signup") {
                if (router.query.redirect) next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/${router.query.redirect}`);
                else next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/`);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!user) {
            const savedUserString = localStorage.getItem("user");
            //@ts-ignore
            const savedUser = JSON.parse(savedUserString);
            if (savedUser) {
                if (savedUser) {
                    authUser(savedUser.jwt);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isRouteProtected() && !user) {
            next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/signin?redirect=${router.pathname.replace("/", "")}`);
        } else {
            if (user) {
                if (router.pathname === "/signin" || router.pathname === "/signup") {
                    if (router.query.redirect) next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/${router.query.redirect}`);
                    else next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/`);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        router.pathname,
        router.query.redirect,
        user
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            user,
            loading,
            placeOrder,
            updateUser,
            order,
            orders,
            fetchOrders,
            fetchOrder,
            signIn,
            signOut,
            signUp
        },
        children: children
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3057:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ PartsContext),
/* harmony export */   "j": () => (/* binding */ PartsProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9830);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7104);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3590);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_4__]);
react_toastify__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





// const defaultCartState: CartState = cart
const defaultCartState = {
    amount: 0,
    count: 0,
    items: [],
    shippingPrice: [
        {
            name: "Standard shipping",
            price: 120
        }
    ]
};
const PartsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    carParts: [],
    cart: defaultCartState,
    partsCount: 0,
    isLoading: true
});
const CartReducer = (state, action)=>{
    switch(action.type){
        case "seed":
            return action.payload;
        case "erase":
            return defaultCartState;
        case "add":
            (0,react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast)("Item added to cart");
            return {
                shippingPrice: state.shippingPrice,
                count: state.count + 1,
                amount: state.amount + action.payload.attributes.price,
                items: [
                    ...state.items.filter((el)=>el.id !== action.payload.id),
                    {
                        ...action.payload,
                        total: action.payload.total * action.payload.quantity,
                        quantity: action.payload.quantity + 1
                    }
                ]
            };
        case "remove":
            (0,react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast)("Item removed from cart");
            return {
                shippingPrice: state.shippingPrice,
                count: state.count - 1,
                amount: state.amount - action.payload.attributes.price,
                items: state.items.filter((el)=>el.id !== action.payload.id)
            };
        default:
            return state;
    }
};
const PartsProvider = ({ children  })=>{
    const { 0: carParts , 1: setCarParts  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: cart , 1: cartDispatch  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(CartReducer, defaultCartState);
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: partsCount , 1: setPartsCount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [
        cart
    ]);
    const fetchCarParts = async (start = 0)=>{
        try {
            setIsLoading(true);
            //orders?filters[isActive][$eq]=true
            const res = await fetch(`${_utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .baseUrl */ .FH}/products?filters[isActive][$eq]=true&populate=*&sort[0]=createdAt:desc&pagination[start]=${start}&pagination[limit]=12`);
            const { data , meta  } = await res.json();
            setCarParts(data);
            setPartsCount(meta.pagination.total);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const addItemToCart = (item)=>{
        cartDispatch({
            payload: item,
            type: "add"
        });
    };
    const removeItemFromCart = (item)=>{
        cartDispatch({
            payload: item,
            type: "remove"
        });
    };
    const clearCart = ()=>{
        cartDispatch({
            type: "erase"
        });
    };
    const search = async (searchKeyword)=>{
        if (searchKeyword) {
            const searchQuery = qs__WEBPACK_IMPORTED_MODULE_3___default().stringify({
                filters: {
                    $or: [
                        {
                            title: {
                                $containsi: searchKeyword
                            }
                        },
                        {
                            description: {
                                $containsi: searchKeyword
                            }
                        },
                        {
                            brand: {
                                $containsi: searchKeyword
                            }
                        },
                        {
                            category: {
                                $containsi: searchKeyword
                            }
                        }
                    ]
                }
            });
            const res = await fetch(`${_utils_constants__WEBPACK_IMPORTED_MODULE_2__/* .baseUrl */ .FH}/products?populate=*&` + searchQuery);
            const { data , meta  } = await res.json();
            setCarParts(data);
            setPartsCount(meta.pagination.total);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PartsContext.Provider, {
        value: {
            fetchCarParts,
            cart,
            carParts,
            removeItemFromCart,
            clearCart,
            addItemToCart,
            search,
            isLoading,
            partsCount
        },
        children: children
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FH": () => (/* binding */ baseUrl),
/* harmony export */   "Ok": () => (/* binding */ links),
/* harmony export */   "PY": () => (/* binding */ storeInfo),
/* harmony export */   "hI": () => (/* binding */ carImages)
/* harmony export */ });
const links = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Car Parts",
        url: "/parts"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Services",
        url: "/services"
    },
    {
        name: "Contact Us",
        url: "/contact"
    }
];
const baseUrl = "https://subesh.onrender.com/api";
// export const baseUrl = 'http://localhost:1337/api'
const carImages = [
    "https://images.pexels.com/photos/3807120/pexels-photo-3807120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4116196/pexels-photo-4116196.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3807811/pexels-photo-3807811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/4116203/pexels-photo-4116203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8478223/pexels-photo-8478223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8478223/pexels-photo-8478223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];
const storeInfo = {
    name: "DriveSync Auto Services",
    phone: "0796 681 150",
    location: "Nairobi, Kenya",
    fullLocation: "Ruaraka, Nairobi "
};


/***/ })

};
;