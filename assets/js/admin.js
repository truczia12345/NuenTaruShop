document.getElementById('add-row').addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = "flex gap-3 items-center mt-2";
      row.innerHTML = `
        <select class="p-2 border rounded w-1/3">
          <option>Chọn ngành hàng</option>
          <option>Điện tử</option>
          <option>Thời trang</option>
          <option>Mỹ phẩm</option>
          <option>Gia dụng</option>
        </select>
        <input type="number" min="0" max="100" step="0.1" placeholder="Tỉ lệ %" class="p-2 border rounded w-1/4">
        <select class="p-2 border rounded w-1/3">
          <option>Áp dụng cho tất cả</option>
          <option>Chỉ Seller thường</option>
          <option>Chỉ Seller Premium</option>
        </select>
        <button type="button" class="text-red-500 hover:underline remove-row">Xóa</button>
      `;
      document.getElementById('commission-list').appendChild(row);
      row.querySelector('.remove-row').addEventListener('click', () => row.remove());
    });

    document.querySelectorAll('.remove-row').forEach(btn => {
      btn.addEventListener('click', (e) => e.target.closest('.flex').remove());
    });