import api from "./api";

/**
 * Organize Employee DETAIL
 */
export const fetchOrganizeEmployeeDetail = (params = {}) => api.post('/api/organize/employee/detail', params)

/**
 * ADD & UPDATE Organize Employee
 */
export const fetchOrganizeEmployeeUpdate = (params = {}) => api.post('/api/organize/employee/update', params)

/**
 * Organize Employee PAGING DATA
 */
export const fetchOrganizeEmployeePaging = (params = {}) => api.post('/api/organize/employee/paging', params)

/**
 * Organize Employee LIST DATA
 */
export const fetchOrganizeEmployeeList = (params = {}) => api.post('/api/organize/employee/list', params)

/**
 * DELETE Organize Employee
 */
export const fetchOrganizeEmployeeDelete = (params = {}) => api.post('/api/organize/employee/delete', params)
