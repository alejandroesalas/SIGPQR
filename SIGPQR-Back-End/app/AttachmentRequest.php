<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Attachment;

class AttachmentRequest extends Attachment
{
    protected $table = 'attachment_requests';

    public function request()
    {
        return $this->belongsTo(Request::class,'request_id');
    }

}
