// export const getCartoonDetail = async (ctx: Context) => {
//   const { cartoonId } = ctx.request.body;

//   if (!cartoonId) {
//     throw new ApiError('PARAM_MISS');
//   }
//   const cartoonDetail = await Cartoon.findOne({ _id: cartoonId }).populate(
//     'sections',
//     {
//       _id: 1,
//       cartoonId: 1,
//       sectionTitle: 1
//     }
//   );

//   if (cartoonDetail) {
//     const {
//       cartoonName,
//       updataTime,
//       coverImage,
//       description,
//       sections
//     } = cartoonDetail;
//     const sectionList = sections as Array<SectionDocument>;

//     ctx.body = {
//       cartoonInfo: {
//         cartoonName,
//         updataTime,
//         coverImage,
//         description
//       },
//       sectionList: sectionList.map((item) => ({
//         sectionId: item._id,
//         cartoonId: item.cartoonId,
//         sectionTitle: item.sectionTitle
//       }))
//     };
//   } else {
//     ctx.body = {
//       isOk: false,
//       message: '获取动漫详情失败'
//     };
//   }
// };
