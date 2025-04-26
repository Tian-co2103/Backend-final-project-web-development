module.exports = function (rolesPermitidos = []) {
    return (req, res, next) => {
      if (!req.user || !req.user.roles) {
        return res.status(403).json({ mensaje: 'Acceso denegado. No autenticado.' });
      }
  
      const tieneRolPermitido = req.user.roles.some(rol => rolesPermitidos.includes(rol));
  
      if (!tieneRolPermitido) {
        return res.status(403).json({ mensaje: 'Acceso denegado. Rol no autorizado.' });
      }
  
      next(); // el usuario tiene permiso
    };
  };
  