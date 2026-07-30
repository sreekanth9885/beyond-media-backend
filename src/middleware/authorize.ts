export const authorize = (permission: string) => {
  return (req: any, res: any, next: any) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,

        message: "Permission denied.",
      });
    }

    next();
  };
};
