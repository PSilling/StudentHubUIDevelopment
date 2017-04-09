var Util = function() { };

/**
 * Searches a given array for the first available ID value.
 * @param  array  the array to be searched
 * @return        first free id value
 */
Util.findFreeID = function(array) {
  var id;

  for (var i = 0; i < array.length; i++) {
    if(typeof array[i].id === "undefined") {
      id = i;
      break;
    }
    else id = array.length;
  }
  return id;
};

/**
 * Checks whether desired data value is correct.
 * @param data            data to be checked
 * @param errorMessage    associated error message
 * @return                errorMessage if incorect, "" otherwise
 */
Util.checkData = function(data, errorMessage) {
  if(data === "" || typeof data === "undefined")
    return errorMessage;
  else return "";
}

/**
 * Holds university state codes
 * @type {Enum}
 */
Util.states = {
  CZ: "CZ",
  SK: "SK"
};

/**
 * Holds user role codes
 * @type {Enum}
 */
Util.userRoles = {
  superviser: "AC_SUPERVISOR",
  admin: "ADMIN",
  companyRep: "COMPANY_REP",
  student: "STUDENT",
  techLeader: "TECH_LEADER"
}

/**
 * Holds Company size codes
 * @type {Enum}
 */
Util.companySizes = {
  startUp: "STARTUP",
  small: "SMALL",
  medium: "MEDIUM",
  corp: "CORPORATE"
}

/**
 * Holds Company plan codes
 * @type {Enum}
 */
Util.companyPlans = {
  t1: "TIER_1",
  t2: "TIER_2",
  t3: "TIER_3"
}

export default Util;
