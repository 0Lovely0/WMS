const Rejectedgrn = () => {
  // Example dummy data
  const rejectedData = [
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },

    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
    {
      grn_id: "1",
      sku_id: "1",
      vendor: "lovely",
      quantity: "10",
      MRP: "20000",
    },
  ];

  return (
    <div
      className="w-full h-full overflow-y-scroll scrollbar-hide rounded-xl"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h2 className=" flex justify-center text-sm font-semibold text-neutral-500 bg-neutral-200">
        Rejected GRN Details
      </h2>

      <div>
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="sticky top-0 z-30 text-neutral-500 bg-neutral-200 rounded-4xl">
              <th className="px-1 py-1 ">grn_id</th>
              <th className="px-1 py-1 ">sku_id</th>
              <th className="px-1 py-1 ">Quantity</th>
              <th className="px-1 py-1 ">Vendor</th>
              <th className="px-1 py-1 ">MRP</th>
            </tr>
          </thead>
          <tbody>
            {rejectedData.map((row, index) => (
              <tr key={index} className=" text-neutral-400">
                <td className="px-1 py-1">{row.grn_id}</td>
                <td className="px-1 py-1">{row.sku_id}</td>
                <td className="px-1 py-1">{row.quantity}</td>
                <td className="px-1 py-1">{row.vendor}</td>
                <td className="px-1 py-1">{row.MRP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Rejectedgrn;
